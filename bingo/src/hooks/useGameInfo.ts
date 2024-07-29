import { ChainRpcUrls, IContractName, zkBingo } from '@zypher-game/toolkit/ui'
import { getProvider } from '@zypher-game/toolkit/ui'
import { sample, some } from 'lodash'
import { useCallback, useEffect, useState } from 'react'

import { IBingoVersion } from '@/pages/state/state'

import { bingoLobbyFromRpc } from '../contract/bingoLobby'
import { useActiveWeb3ReactForBingo } from './useActiveWeb3ReactForBingo'

const useGameStart = () => {
  const [gameRoom, setGameRoom] = useState({ cardContract: '', gameId: -1, cardNumbers: [] })
  const { account, chainId, bingoVersion } = useActiveWeb3ReactForBingo()
  const getGameRoom = useCallback(async () => {
    if (!chainId) {
      return
    }
    const provider = await getProvider(sample(ChainRpcUrls[chainId]))
    const curBlock = await provider.getBlockNumber()
    setInterval(async () => {
      try {
        const lobbyContract = await bingoLobbyFromRpc({ chainId: chainId, bingoVersion, library: provider, account })
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
  }, [chainId, bingoVersion])
  useEffect(() => {
    if (bingoVersion === IBingoVersion.v1) {
      getGameRoom()
    }
  }, [bingoVersion])
  return { gameRoom, getGameRoom }
}

export default useGameStart
