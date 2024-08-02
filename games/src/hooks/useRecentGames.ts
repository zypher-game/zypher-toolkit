import {
  ChainId,
  divisorBigNumber,
  formatMoney,
  graphqlApiUrl,
  IContractName,
  IGameList,
  IRecentGame,
  MulticallContract,
  request,
  zkBingo
} from '@ui/src'
import { BigNumberJs } from '@ui/src'
import ZkBingoLobbyAbi from '@zypher-game/bingo-periphery/abi/ZkBingoLobby.json'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'

import bingoLobby from '../contract/bingoLobby'
import { batchRequestContracts } from '../utils/batchRequestContracts'
import { gameFormatGamesWithIRecentGame } from '../utils/gameFormatGames'

export const useRecentGames = (): {
  list: Map<ChainId, IGameList[]> | undefined
  hasError: boolean
} => {
  const [list, setList] = useState<Map<ChainId, IGameList[]>>()
  const [hasError, setHasError] = useState(false)
  useEffect(() => {
    batchRequestContracts({
      contractFun: bingoLobby,
      contracts: {
        contractName: IContractName.Lobby,
        method: 'recentGames',
        params: ['0']
      },
      defaultValue: null
    }).then(async value => {
      try {
        // 获取 batchRequestContracts gameInputPer
        const gameList: Map<ChainId, IGameList[]> = new Map()
        for (let i = 0; i < value.length; i++) {
          if (value[i].response) {
            const {
              chainId,
              response: games // game:IRecentGame[]
            } = value[i]
            const gameIdList: string[] = games.map((v: IRecentGame) => v.gameId.toString())
            const { gameInfo } =
              (await getGameInfo({
                chainId,
                gameIdList
              })) || {}
            if (gameInfo) {
              const gameListChainId: IGameList[] = games.map((game: IRecentGame, index: number) => {
                return gameFormatGamesWithIRecentGame({
                  chainId,
                  game,
                  gameIdInfo: gameInfo[index]
                })
              })
              gameList.set(chainId, gameListChainId)
            }
            if (gameList.size) {
              setList(gameList)
            }
          }
        }
      } catch (error) {
        // console.error('useRecentGames error: ', error)
        setHasError(true)
      }
    })
  }, [])
  return {
    list,
    hasError
  }
}
export type IFee = Map<string, { inputPerPlayer: string; feeRatio: string }> | undefined
export const getGameInfo = async ({
  chainId,
  gameIdList
}: {
  chainId: ChainId
  gameIdList: string[]
}): Promise<
  | {
      gameInfo: IGameIdInfo[]
    }
  | undefined
> => {
  try {
    const lobbyAddress = zkBingo(chainId, IContractName.Lobby)
    // 获取当前gameInfo
    const params = gameIdList.map(index => ({
      reference: IContractName.Lobby + index,
      contractAddress: lobbyAddress,
      abi: ZkBingoLobbyAbi,
      calls: [{ methodName: 'getGameInfo', reference: 'getGameInfo', methodParameters: [index] }]
    }))

    const multicall = await MulticallContract(chainId)
    if (multicall) {
      const { results } = await multicall.call(params)
      if (results) {
        const gameInfo = Object.values(results).map((v: any) => {
          const item = v['callsReturnContext'][0]['returnValues']
          return [
            item[0], // startedAt,
            item[1], // endedAt,
            new BigNumberJs(item[2].hex).dividedBy(divisorBigNumber).toFixed(), // uint256 joinAmount,
            item[3], // winner,
            new BigNumberJs(item[4].hex).dividedBy(divisorBigNumber).toFixed(), // uint256 winAmount,
            item[5], // Participant[] memory players,
            item[6], // GameRound[] memory rounds,
            item[7] // string memory status
          ] as unknown as IGameIdInfo as IGameIdInfo
        })
        return {
          gameInfo: gameInfo
        }
      }
    }
  } catch (err) {
    console.error('getGameInfo err: ', err)
  }
  return undefined
}

async function getFeeFromGraph({ chainId, gameIdList }: { chainId: ChainId; gameIdList: string[] }): Promise<IFee> {
  const api = graphqlApiUrl[chainId]
  if (!api) {
    return undefined
  }
  const gameIdHexList = gameIdList.map(v => Number(v).toString(16))
  // const client = ...
  const result = await request(api, {
    method: 'POST',
    data: JSON.stringify({
      query: `query MyQuery {
        gameInfos(
          orderBy: startedAt
          orderDirection: desc
          where: {id_in: ${gameIdHexList}}
        ) {
          id
          pCount
          totalJoinAmount
          feeRatio
        }
      }`,
      variables: {},
      operationName: 'MyQuery'
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (result.data && result.data.data && result.data.data.gameInfos) {
    if (result.data.data.gameInfos.length) {
      return new Map(
        result.data.data.gameInfos.map((v: any) => {
          const { id, pCount, totalJoinAmount, feeRatio } = v
          const inputPerPlayer = totalJoinAmount
            ? formatMoney(new BigNumberJs(ethers.utils.formatEther(totalJoinAmount)).dividedBy(new BigNumberJs(pCount)).toNumber())
            : '-'
          return [
            `${parseInt(id, 16)}`,
            {
              inputPerPlayer,
              feeRatio
            }
          ]
        })
      ) as Map<string, { inputPerPlayer: string; feeRatio: string }>
    }
  }
  return undefined
}
