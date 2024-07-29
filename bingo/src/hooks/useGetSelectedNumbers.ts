import { useCallback, useEffect, useState } from 'react'

import bingoLobby from '../contract/bingoLobby'
import { env } from '../utils/config'
import { useActiveWeb3ReactForBingo } from './useActiveWeb3ReactForBingo'

const useGetSelectedNumbers = (gameId: number) => {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([])
  const { chainId, bingoVersion } = useActiveWeb3ReactForBingo()
  const fetchSelectedNumbers = useCallback(async () => {
    try {
      if (!chainId) {
        return
      }
      const lobbyContract = bingoLobby({ chainId, env, bingoVersion })
      const numbers = await lobbyContract.read.getSelectedNumbers([gameId])
      setSelectedNumbers(numbers)
    } catch (error) {
      console.error('fetchSelectedNumbers', error)
    }
  }, [gameId, chainId, bingoVersion])

  useEffect(() => {
    fetchSelectedNumbers()
    const interval = setInterval(() => {
      fetchSelectedNumbers()
    }, 2000)
    return () => {
      clearInterval(interval)
    }
  }, [gameId, chainId])
  return selectedNumbers
}

export default useGetSelectedNumbers
