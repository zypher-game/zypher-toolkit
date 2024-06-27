import { ChainRpcUrls, IContractName, useActiveWeb3React, zkBingo } from '@ui/src'
import { getProvider } from '@ui/src'
import { useCallback, useEffect, useState } from 'react'

import { bingoLobbyFromRpc } from '../contract/bingoLobby'

const useGameStart = () => {
  const [gameRoom, setGameRoom] = useState({ cardContract: '', gameId: -1, cardNumbers: [] })
  const { account, chainId } = useActiveWeb3React()
  const getGameRoom = useCallback(async () => {
    if (!chainId) {
      return
    }
    const provider = await getProvider(ChainRpcUrls[chainId][0])
    const curBlock = await provider.getBlockNumber()
    setInterval(async () => {
      try {
        const lobbyContract = await bingoLobbyFromRpc({ address: zkBingo(chainId, IContractName.Lobby), library: provider, account })
        const filter = lobbyContract.filters.GameStarted()
        const [event] = await lobbyContract.queryFilter(filter, curBlock - 10)
        if (event) {
          const [gameId, cardContract] = event.args || []
          setGameRoom(room => ({
            ...room,
            gameId: gameId.toNumber(),
            cardContract
          }))
        }
      } catch (error) {
        console.error('getGameRoom Error: ', error)
      }
    }, 1000)
  }, [chainId])
  useEffect(() => {
    getGameRoom()
  }, [])
  return { gameRoom, getGameRoom }
}

export default useGameStart
