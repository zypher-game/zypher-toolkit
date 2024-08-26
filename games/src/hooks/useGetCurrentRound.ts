import { useActiveWeb3React, useGlobalVar } from '@ui/src'
import { useCallback, useEffect, useState } from 'react'

import bingoLobby from '../contract/bingoLobby'
import { env } from '../utils/config'
export type IRoundInfo = { player: string; round: number; remain: number; status: string }
const useGetCurrentRound = (gameId: number | string | undefined): IRoundInfo => {
  const [roundInfo, setRoundInfo] = useState({ player: '', round: 0, remain: 28, status: '' })
  const { chainId } = useActiveWeb3React()
  const { walletClient } = useGlobalVar()

  const fetchCurrentRound = useCallback(async () => {
    try {
      if (!chainId) {
        return
      }
      const lobbyContract = bingoLobby(chainId, env)
      const txnReceipt = await lobbyContract.read.getCurrentRound([gameId])
      const [round, player, remain, status] = txnReceipt
      setRoundInfo({
        player: player,
        round: round,
        remain: remain,
        status: status
      })
    } catch (error) {
      // console.error(error)
    }
  }, [gameId, chainId, walletClient])

  useEffect(() => {
    fetchCurrentRound()
    const interval = setInterval(() => {
      fetchCurrentRound()
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [gameId, chainId])
  return roundInfo
}

export default useGetCurrentRound
