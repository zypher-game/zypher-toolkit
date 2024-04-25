import { formatMoney, useActiveWeb3React } from '@UI/src/'
import BigNumberjs from 'bignumber.js'
import { useCallback, useEffect, useMemo, useState } from 'react'

import bingoLobby from '@/contract/bingoLobby'
import { env } from '@/utils/config'

export const useGetProfile = () => {
  const { chainId, account } = useActiveWeb3React()
  const [rankData, setRankData] = useState<{
    joinGameNumber: string
    winGameNumber: string
    inputNum: string
    winNum: string
  }>({ joinGameNumber: '-', winGameNumber: '-', inputNum: '-', winNum: '-' })
  const winningPercent = useMemo(() => {
    const { joinGameNumber, winGameNumber } = rankData
    if (winGameNumber && joinGameNumber && joinGameNumber !== '-') {
      return ((Number(winGameNumber) / Number(joinGameNumber)) * 100).toFixed(2)
    }
    if (Number(winGameNumber) === 0) {
      return '0%'
    }
    return '-'
  }, [rankData])
  const getApi = useCallback(async () => {
    if (!chainId || !account) {
      return
    }
    const lobbyContract = bingoLobby(chainId, env)
    const [, overall] = await lobbyContract.read.userRecords([account])
    const { wins, joined } = overall
    setRankData({
      joinGameNumber: `${new BigNumberjs(joined).toString()}`,
      winGameNumber: `${new BigNumberjs(wins).toString()}`,
      winNum: '-',
      inputNum: '-'
    })
  }, [chainId, account])
  useEffect(() => {
    if (chainId && account) {
      getApi()
    }
  }, [chainId, account])
  return {
    gamesLen: `${formatMoney(Number(rankData.joinGameNumber), 0)}`,
    gamesWon: `${formatMoney(Number(rankData.winGameNumber), 0)}`,
    gamesWonNumber: `${Number(rankData.winGameNumber)}`,
    winningPercent: winningPercent === 'NaN' ? '0.00' : winningPercent,
    inputNum: rankData.inputNum,
    winNum: rankData.winNum,
    account,
    chainId
  }
}
