import { useActiveWeb3React } from '@UI/src/'
import { useCallback, useEffect, useState } from 'react'

import bingoLobby from '../contract/bingoLobby'
import { env } from '../utils/config'

const useGetSelectedNumbers = (gameId: number) => {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([])
  const { chainId } = useActiveWeb3React()
  const fetchSelectedNumbers = useCallback(async () => {
    try {
      if (!chainId) {
        return
      }
      const lobbyContract = await bingoLobby(chainId, env)
      const numbers = await lobbyContract.read.getSelectedNumbers([gameId])
      setSelectedNumbers(numbers)
    } catch (error) {
      console.error('fetchSelectedNumbers', error)
    }
  }, [gameId, chainId])

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
