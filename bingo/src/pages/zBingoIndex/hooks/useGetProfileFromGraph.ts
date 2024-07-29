import { formatMoney, request } from '@ui/src'
import { ethers } from 'ethers'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { defaultRankChainId, graphqlApiUrl } from '@/constants/constants'
import bingoLobby from '@/contract/bingoLobby'
import { useActiveWeb3ReactForBingo } from '@/hooks/useActiveWeb3ReactForBingo'
import { IBingoVersion } from '@/pages/state/state'
import { env } from '@/utils/config'

export const useGetProfileFromGraph = () => {
  const { chainId, account, bingoVersion } = useActiveWeb3ReactForBingo()
  const [rankData, setRankData] = useState<{
    joinGameNumber: string
    winGameNumber: string
    inputNum: string
    winNum: string
  }>({ joinGameNumber: '-', winGameNumber: '-', inputNum: '-', winNum: '-' })
  const winningPercent = useMemo(() => {
    const { joinGameNumber, winGameNumber } = rankData
    if (winGameNumber && joinGameNumber && joinGameNumber !== '-' && joinGameNumber !== '0') {
      return ((Number(winGameNumber) / Number(joinGameNumber)) * 100).toFixed(2)
    }
    if (winGameNumber !== '-') {
      return '0'
    }
    return '-'
  }, [rankData])
  const getApi = useCallback(async () => {
    const chainIdLocal = chainId ?? defaultRankChainId
    const api = graphqlApiUrl[chainIdLocal]
    if (!api || !account) {
      return
    }
    setRankData({
      joinGameNumber: '-',
      winGameNumber: '-',
      inputNum: '-',
      winNum: '-'
    })
    // const client = ...
    const result = await request(api, {
      method: 'POST',
      data: JSON.stringify({
        query: `query MyQuery {
          playerDatas(
            first: 1
            where: {player: "${account}"}
          ) {
            joinAmount
            winAmount
            player
            jCount
            wCount
          }
        }`,
        variables: {},
        operationName: 'MyQuery'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (result.data && result.data.data && result.data.data.playerDatas) {
      if (result.data.data.playerDatas.length) {
        setRankData({
          joinGameNumber: `${result.data.data.playerDatas[0]['jCount']}`,
          winGameNumber: `${result.data.data.playerDatas[0]['wCount']}`,
          winNum: formatMoney(Number(ethers.utils.formatEther(result.data.data.playerDatas[0]['winAmount'])), 0),
          inputNum: formatMoney(Number(ethers.utils.formatEther(result.data.data.playerDatas[0]['joinAmount'])), 0)
        })
      }
    }
  }, [chainId, account])
  const getApiBeta = useCallback(async () => {
    if (!chainId || !account) {
      return
    }
    const lobbyContract = bingoLobby({ chainId, env, bingoVersion })
    const [, { joined, wins }] = await lobbyContract.read.userRecords([account])
    setRankData({
      joinGameNumber: `${joined.toString()}`,
      winGameNumber: `${wins.toString()}`,
      winNum: '-',
      inputNum: '-'
    })
  }, [chainId, account])
  useEffect(() => {
    if (chainId && account) {
      if (bingoVersion === IBingoVersion.v1) {
        getApi()
      } else {
        getApiBeta()
      }
    }
  }, [chainId, account])
  return {
    gamesLen: `${formatMoney(Number(rankData.joinGameNumber), 0)}`,
    gamesWon: `${formatMoney(Number(rankData.winGameNumber), 0)}`,
    gamesWonNumber: rankData.winGameNumber,
    winningPercent,
    inputNum: rankData.inputNum,
    winNum: rankData.winNum,
    account,
    chainId,
    bingoVersion
  }
}
