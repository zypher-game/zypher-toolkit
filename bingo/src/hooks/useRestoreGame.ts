import { IContractName, useRecoilState, zkBingo } from '@ui/src'
import { BigNumberJs } from '@ui/src'
import { useCallback, useEffect, useState } from 'react'

import bingoLobby from '@/contract/bingoLobby'

import { gameRoomState, joinGameState } from '../pages/state/state'
import { env } from '../utils/config'
import { useActiveWeb3ReactForBingo } from './useActiveWeb3ReactForBingo'

export default function useRestoreGame<T>() {
  const [resetGameRoom] = useRecoilState(gameRoomState)
  const [joinGame] = useRecoilState(joinGameState)
  const [gameTime, setGameTime] = useState(0)
  const [loading, setLoading] = useState(false)
  const [isPlaying, setisPlaying] = useState(false)
  const [gameId, setGameId] = useState<number>()
  const { account, chainId, bingoVersion } = useActiveWeb3ReactForBingo()

  const handle = useCallback(async () => {
    if (!chainId || !account) {
      return
    }
    try {
      setLoading(true)
      console.log('useRestoreGame ', 1)
      const lobbyContract = bingoLobby({ chainId, env, bingoVersion })
      console.log('useRestoreGame ', 2)
      const cardNums = resetGameRoom.cardNumbers.reduce(
        (prev, curr) => {
          prev[curr.row - 1].push(curr.num)
          return prev
        },
        [[], [], [], [], []] as number[][]
      )
      console.log('useRestoreGame ', 3, account, cardNums, joinGame.signedLabel)
      const txn = await lobbyContract.read.restoreGame([account, cardNums, joinGame.signedLabel])
      // console.log("useRestoreGame ",{ txn }) // [bingnumber playingGameId  number autoEndTime  bool isCardContentMatched]
      const [playingGameId, autoEndTime, isCardContentMatched] = txn
      console.log('useRestoreGame ', 4)
      const Playing = new BigNumberJs(playingGameId).toNumber() > 0
      console.log('useRestoreGame ', 5)
      const currentTimestamp = Math.floor(Date.now() / 1000)
      console.log('useRestoreGame ', 6)
      const time = autoEndTime > 0 ? autoEndTime - currentTimestamp : 0
      console.log('useRestoreGame ', 7)
      setGameId(new BigNumberJs(playingGameId).toNumber())
      console.log('useRestoreGame ', 8)
      setGameTime(time)
      console.log('useRestoreGame ', 9)
      setisPlaying(Playing)
      setLoading(false)
    } catch (error) {
      console.error('handle Error: ', error)
    }
  }, [account, chainId, bingoVersion])
  useEffect(() => {
    handle()
  }, [resetGameRoom, account, chainId, bingoVersion])

  return { gameTime, isPlaying, loading, gameId }
}
