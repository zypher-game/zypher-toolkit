import { ChainRpcUrls, useActiveWeb3React, zkBingo } from '@UI/src/'
import { getProvider } from '@UI/src/'
import { useCallback, useEffect, useState } from 'react'

import bingoLobby from '../contract/bingoLobby'
import { env } from '../utils/config'

const useGetGameInfoBeta = (
  gameId: string | number | undefined
): { players: string[]; selectNumber: Map<number, number>; selectedNumbers: number[] } => {
  const { account, chainId } = useActiveWeb3React()
  const [roomInfo, setRoomInfo] = useState({ players: [], selectNumber: new Map(), selectedNumbers: [] })
  const fetchGameInfo = useCallback(async () => {
    try {
      if (!chainId) {
        return
      }
      const provider = await getProvider(ChainRpcUrls[chainId][0])
      const lobbyContract = bingoLobby(chainId, env)
      const txnReceipt = await lobbyContract.read.getGameInfo([gameId])
      const [startedAt, endedAt, winner, players, rounds, status] = txnReceipt
      const [numbers] = await lobbyContract.read.getSelectedNumbers([gameId])
      if (txnReceipt && players && players.length) {
        const map: Map<string, number> = new Map()
        rounds.forEach((player: any) => {
          map.set(player.round, player.number)
        })
        setRoomInfo(prev => ({
          ...prev,
          players: players.map((player: any) => player.user as string),
          selectNumber: map,
          selectedNumbers: numbers
        }))
      }
    } catch (error) {
      console.error(error)
      // setRoomInfo({ players: [], selectNumber: new Map(), selectedNumbers: [] })
    }
  }, [gameId, chainId])

  useEffect(() => {
    fetchGameInfo()
    const interval = setInterval(() => {
      fetchGameInfo()
    }, 2000)
    return () => {
      clearInterval(interval)
    }
  }, [gameId, chainId])
  return roomInfo
}

export default useGetGameInfoBeta
