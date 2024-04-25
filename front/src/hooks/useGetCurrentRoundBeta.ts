import { ChainRpcUrls, IContractName, useActiveWeb3React, zkBingo } from '@UI/src/'
import { getProvider } from '@UI/src/'
import { useCallback, useEffect, useState } from 'react'

import { bingoLobbyFromRpc } from '../contract/bingoLobby'

const useGetCurrentRoundBeta = (gameId: number | string | undefined): { player: string; round: number; remain: number; status: string } => {
  const [roundInfo, setRoundInfo] = useState({ player: '', round: 0, remain: 28, status: '' })
  const { account, chainId } = useActiveWeb3React()
  const fetchCurrentRound = useCallback(async () => {
    try {
      if (!chainId) {
        return
      }
      const provider = await getProvider(ChainRpcUrls[chainId][0])
      const lobbyContract = await bingoLobbyFromRpc({
        address: zkBingo(chainId, IContractName.Lobby),
        library: provider,
        account
      })
      const txnReceipt = await lobbyContract.read.getCurrentRound([gameId])
      const [round, player, remain, status] = txnReceipt
      setRoundInfo({
        player: player,
        round: round,
        remain: remain,
        status: status
      })
    } catch (error) {
      console.error(error)
    }
  }, [gameId, chainId])

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

export default useGetCurrentRoundBeta
