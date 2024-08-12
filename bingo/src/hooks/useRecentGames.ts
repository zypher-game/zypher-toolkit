import { AddressZero } from '@ethersproject/constants'
import {
  bingoBetaSupportedChainId,
  ChainId,
  chainIdPre,
  IBingoInfo,
  IContractName,
  IGameList,
  IGameStatus,
  IPlayer,
  MulticallContract,
  useInterval,
  useRecoilValue,
  zkBingoV0
} from '@ui/src'
import { BigNumberJs } from '@ui/src'
import ZkBingoLobbyAbiV0 from '@zypher-game/bingo-periphery/abi/ZkBingoLobby.json'
import { useCallback, useEffect, useState } from 'react'

import { bingoVersionState, IBingoVersion } from '@/pages/state/state'
import { env } from '@/utils/config'

import { batchRequestFromGraph } from './useRecentGamesFromGraph'

export const useRecentGames = () => {
  const [list, setList] = useState<Map<ChainId, IGameList[]>>()
  const [listBeta, setListBeta] = useState<Map<ChainId, IGameListBeta[]>>()
  const [hasError, setHasError] = useState(false)
  const bingoVersion = useRecoilValue(bingoVersionState)
  const fetchGameInfos = useCallback(() => {
    if (bingoVersion === IBingoVersion.v1) {
      fetchGameInfosV1()
    } else {
      fetchGameInfosForBeta()
    }
  }, [bingoVersion])
  const fetchGameInfosForBeta = useCallback(async () => {
    try {
      const res = await batchRequestFromGraphBeta()
      setListBeta(res)
    } catch (e) {
      setHasError(true)
    }
  }, [])
  const fetchGameInfosV1 = useCallback(async () => {
    try {
      const value_pre = await batchRequestFromGraph({ env })
      const value = value_pre.filter(v => !!v)
      if (value.length) {
        const gameList: Map<ChainId, IGameList[]> = new Map()
        for (let i = 0; i < value.length; i++) {
          if (value[i] && value[i]?.[0].chainId) {
            const chainId: ChainId = value[i]?.[0].chainId as ChainId
            const mapValue: IGameList[] = value[i] as IGameList[]
            gameList.set(chainId, mapValue)
          }
          if (gameList.size) {
            setList(gameList)
          }
        }
      }
    } catch (e) {
      setHasError(true)
    }
  }, [])
  useEffect(() => {
    if (!window.IS_TELEGRAM) {
      fetchGameInfos()
    }
  }, [bingoVersion])
  useInterval(fetchGameInfos, 50000)
  return {
    list: list,
    listBeta: listBeta,
    hasError: hasError
  }
}
export interface IGameListBeta {
  chainId: ChainId
  winner: string
  gameId: string
  players: IPlayer[]
  status: IGameStatus
  winnerOrPlayers: string
  roomIDStr: string
  //  cardNumbers: number[][];
  // selectedNumbers: number[];
  bingoInfo: IBingoInfo
}

const batchRequestFromGraphBeta = async () => {
  const promises: Promise<any>[] = []
  for (const chainIdConfig of bingoBetaSupportedChainId) {
    const multicall = await MulticallContract(chainIdConfig)
    promises.push(
      multicall.call([
        {
          reference: 'recentGames',
          contractAddress: zkBingoV0(chainIdConfig, IContractName.Lobby),
          abi: ZkBingoLobbyAbiV0,
          calls: [
            {
              methodName: 'recentGames',
              reference: 'recentGames',
              methodParameters: [0]
            }
          ]
        }
      ])
    )
  }
  try {
    const res = await Promise.all(promises)
    const gameListBeta: Map<ChainId, IGameListBeta[]> = new Map()
    for (let i = 0; i < bingoBetaSupportedChainId.length; i++) {
      const chainId = bingoBetaSupportedChainId[i]
      const { results } = res[i]
      const obj = results.recentGames.callsReturnContext[0].returnValues.map(
        (v: any) =>
          ({
            chainId: chainId,
            status: getStatusBeta(v[1]),
            gameId: new BigNumberJs(v[0].hex).toString(),
            winner: v[2],
            players: v[5].map((vv: any) => ({
              user: vv[0],
              cardId: new BigNumberJs(vv[1].hex).toString(),
              isAbandoned: false
            })),
            roomIDStr: chainIdPre[chainId] + 'B#' + new BigNumberJs(v[0].hex).toString(),
            winnerOrPlayers: v[2] === AddressZero ? `${v[5].length} players` : v[2],
            bingoInfo: {
              cardNumbers: v[3],
              selectedNumbers: v[4]
            }
          } as IGameListBeta)
      )
      gameListBeta.set(chainId, obj)
    }
    return gameListBeta
  } catch (error) {}
}
// / "overtime" | "end" | "live"
function getStatusBeta(status: string): IGameStatus {
  if (status === 'overtime') {
    return IGameStatus.Overtime
  } else if (status === 'end') {
    return IGameStatus.End
  } else if (status === 'live') {
    return IGameStatus.Live
  }
  return IGameStatus.Invalid
}
