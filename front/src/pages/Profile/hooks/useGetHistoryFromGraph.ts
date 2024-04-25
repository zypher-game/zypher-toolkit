import {
  ChainId,
  formatMoney,
  getFormattedTime,
  getFormattedTimeMobile,
  getRecentGameById,
  IGameList,
  IGameName,
  IGameStatus,
  isTimeout,
  request,
  useActiveWeb3React
} from '@UI/src/'
import BigNumberJs from 'bignumber.js'
import { ethers } from 'ethers'
import { isEqual } from 'lodash'
import { useCallback, useEffect, useState } from 'react'

import { graphqlApiUrl } from '@/constants/constants'
import { chainIdPre } from '@/utils/gameFormatGames'

export function getStatus(status: number): IGameStatus {
  if (status === 0) {
    return IGameStatus.Invalid
  } else if (status === 1) {
    return IGameStatus.Live
  } else if (status === 2) {
    return IGameStatus.End
  } else if (status === 3) {
    return IGameStatus.Overtime
  }
  return IGameStatus.Invalid
}
export function formatDataFromGraph({ chainId, data, recentGames }: { chainId: ChainId; data: any; recentGames: Map<any, any> }): IGameList[] {
  return data.map((v: any, index: number) => {
    const {
      cardAddr,
      endedAt,
      feeRatio,
      feeAmount,
      joinAmount,
      id: idHex,
      lobbyAddr,
      pCount,
      startedAt,
      source,
      status: statusNumber,
      winAmount,
      winCardId,
      winner
    } = v || {}
    let status = getStatus(statusNumber)
    const id = parseInt(idHex, 16).toString()
    let winnerOrPlayers = `${pCount} players`
    let inputPerPlayer = joinAmount ? new BigNumberJs(ethers.utils.formatEther(joinAmount)).dividedBy(new BigNumberJs(pCount)).toNumber() : '-'
    let win = '-'
    let multiplier = '-'
    let cardNumbers
    let selectedNumbers
    if (status === IGameStatus.End && recentGames.size) {
      winnerOrPlayers = winner
      const poolWin = new BigNumberJs(ethers.utils.formatEther(winAmount))
      win = formatMoney(poolWin.toNumber())
      multiplier = formatMoney(poolWin.dividedBy(new BigNumberJs(inputPerPlayer)).toNumber())
      cardNumbers = recentGames.get('cardNumbers' + cardAddr.toLowerCase() + winCardId)
      selectedNumbers = recentGames.get('selectedNumbers' + lobbyAddr.toLowerCase() + id)
    }
    // graph没办法读超时 前端fixed
    if (status === IGameStatus.Live) {
      const timeout = 30 * 60 // 30分钟的秒数
      if (isTimeout(startedAt, timeout)) {
        status = IGameStatus.Overtime
      }
    }
    inputPerPlayer = inputPerPlayer !== '-' ? formatMoney(Number(inputPerPlayer), 0) : '-'

    return {
      chainId: chainId,
      status: status,
      startTimeNumber: `${startedAt}`,
      startTime: getFormattedTime(startedAt),
      startTimeMobile: getFormattedTimeMobile(startedAt),
      game: IGameName.zBingo,
      winner: winner,
      cardAddr,
      endedAt,
      feeAmount,
      feeRatio,
      lobbyAddr,
      roomID: id,
      roomIDStr: chainIdPre[chainId] + 'B#' + id,
      bingoInfo: {
        cardNumbers,
        selectedNumbers
      },
      // gameIdInfo: gameIdInfo,
      inputPerPlayer: inputPerPlayer,
      multiplier: multiplier,
      win: win,
      winnerOrPlayers: winnerOrPlayers
    } as IGameList
  })
}
export const useBingoAccountFromGraph = ({
  bingoHistoryList,
  setBingoHistoryList
}: {
  bingoHistoryList: IGameList[]
  setBingoHistoryList: React.Dispatch<React.SetStateAction<IGameList[]>>
}): { bingoGamesLoading: boolean } => {
  const [bingoGamesLoading, setBingoGamesLoading] = useState<boolean>(false)
  const { chainId, account } = useActiveWeb3React()
  const getPlayedGames = useCallback(async () => {
    setBingoHistoryList([])
    try {
      if (chainId && account) {
        setBingoGamesLoading(true)
        const api = graphqlApiUrl[chainId]
        if (api) {
          const result = await request(api, {
            method: 'POST',
            data: JSON.stringify({
              query: `query MyQuery {
                participantInfos(orderBy: joinTime, orderDirection: desc, where: {player: "${account}"}) {
                  cardId
                  id
                  joinAmount
                  player
                  joinTime
                  gameInfo {
                    cardAddr
                    endedAt
                    feeRatio
                    feeAmount
                    id
                    joinAmount
                    lobbyAddr
                    pCount
                    source
                    startedAt
                    status
                    winAmount
                    winCardId
                    winner
                  }
                }
              }`,
              variables: {},
              operationName: 'MyQuery'
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          if (result.data && result.data.data && result.data.data.participantInfos && result.data.data.participantInfos.length) {
            const gameIdList = result.data.data.participantInfos.map((v: any) => parseInt(v['gameInfo'].id, 16).toString())
            const lobbyAddrList = result.data.data.participantInfos.map((v: any) => v['gameInfo'].lobbyAddr)
            const endFilter = result.data.data.participantInfos
              .filter((v: any) => getStatus(v['gameInfo'].status) === IGameStatus.End)
              .map((v: any) => ({ winCardId: v['gameInfo'].winCardId, cardAddr: v['gameInfo'].cardAddr }))
            const winCardIdList = endFilter.map((v: any) => v.winCardId)
            const cardAddrList = endFilter.map((v: any) => v.cardAddr)
            const recentGames = (await getRecentGameById({ chainId: chainId, lobbyAddrList, gameIdList, cardAddrList, winCardIdList })) ?? new Map()
            setBingoGamesLoading(false)
            const gameListChainId: IGameList[] = formatDataFromGraph({
              chainId,
              data: result.data.data.participantInfos.map((v: any) => v.gameInfo),
              recentGames
            })
            if (bingoHistoryList.length === 0 || !isEqual(bingoHistoryList, gameListChainId)) {
              setBingoHistoryList(gameListChainId)
            }
          } else {
            setBingoGamesLoading(false)
            setBingoHistoryList([])
          }
        }
      }
    } catch (e) {
      console.error('getPlayedGames: ', e)
    }
  }, [chainId, account])
  useEffect(() => {
    if (chainId && account) {
      getPlayedGames()
    }
  }, [chainId, account])
  return {
    bingoGamesLoading
  }
}
