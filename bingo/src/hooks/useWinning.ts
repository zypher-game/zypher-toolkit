import { useCallback } from 'react'
import { Address } from 'wagmi'

import { useActiveWeb3ReactForBingo } from '@/hooks/useActiveWeb3ReactForBingo'

import bingoLobby from '../contract/bingoLobby'
import { env } from '../utils/config'

export default function useWinning({ account }: { account: Address }): () => Promise<string | null> {
  const { chainId, bingoVersion } = useActiveWeb3ReactForBingo()

  const featchData = useCallback(async () => {
    if (!chainId) {
      return null
    }
    const lobbyContract = bingoLobby({ chainId, env, bingoVersion })
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
