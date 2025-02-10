import { useAaWallet, useWalletClient } from '@ui/src'
import { useCallback, useEffect, useState } from 'react'

import bingoLobby from '../contract/bingoLobby'
import { env } from '../utils/config'
import { useActiveWeb3ReactForBingo } from './useActiveWeb3ReactForBingo'
import { useChainIdParamsAsChainId } from './useChainIdParams'
export type IRoundInfo = {
  player: string
  round: number
  remain: number
  status: string
}
const useGetCurrentRound = (gameId: number | string | undefined): IRoundInfo => {
  const [roundInfo, setRoundInfo] = useState({
    player: '',
    round: 0,
    remain: 28,
    status: ''
  })
  const { bingoVersion } = useActiveWeb3ReactForBingo()
  const { aaWalletClient: walletClient } = useAaWallet()
  const chainId = useChainIdParamsAsChainId()
  const fetchCurrentRound = useCallback(async () => {
    try {
      if (!chainId) {
        return
      }
      const lobbyContract = bingoLobby({ chainId, env, bingoVersion })
      const txnReceipt = await lobbyContract.read.getCurrentRound([gameId])
      const [round, player, remain, status] = txnReceipt
      setRoundInfo({
        player: player,
        round: round,
        remain: remain,
        status: status
      })
    } catch (error) {}
  }, [gameId, chainId, walletClient])

  useEffect(() => {
    fetchCurrentRound()
    // const interval = setInterval(() => {
    //   fetchCurrentRound()
    // }, 1000)
    // return () => {
    //   clearInterval(interval)
    // }
  }, [gameId, chainId])
  return roundInfo
}

export default useGetCurrentRound
