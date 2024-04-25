import { useActiveWeb3React, zkBingo } from '@UI/src/'
import { useCallback, useMemo } from 'react'

import bingoLobby from '../contract/bingoLobby'
import { env } from '../utils/config'

export default function useWinning({ account }) {
  const { chainId } = useActiveWeb3React()

  const featchData = useCallback(async () => {
    if (!chainId) {
      return null
    }
    const lobbyContract = bingoLobby(chainId, env)
    const games = await lobbyContract.read.playedGames(account, 0)
    let GamesWon = 0

    games.map((item: any) => {
      if (item.winner === account) {
        GamesWon = GamesWon + 1
      }
    })
    const total = games.length
    const winner = (total / GamesWon).toFixed(2)
    return winner
  }, [chainId, account])
  return featchData
}
