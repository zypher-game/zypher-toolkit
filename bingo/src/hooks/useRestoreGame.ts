import { IContractName, useRecoilState, zkBingo } from '@zypher-game/toolkit/ui'
import BigNumberjs from 'bignumber.js'
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
      const lobbyContract = bingoLobby({ chainId, env, bingoVersion })
      const cardNums = resetGameRoom.cardNumbers.reduce(
        (prev, curr) => {
          prev[curr.row - 1].push(curr.num)
          return prev
        },
        [[], [], [], [], []] as number[][]
      )
      const txn = await lobbyContract.read.restoreGame([account, cardNums, joinGame.signedLabel])
      // console.log({ txn }) // [bingnumber playingGameId  number autoEndTime  bool isCardContentMatched]
      const [playingGameId, autoEndTime, isCardContentMatched] = txn
      const Playing = new BigNumberjs(playingGameId).toNumber() > 0
      const currentTimestamp = Math.floor(Date.now() / 1000)
      const time = autoEndTime > 0 ? autoEndTime - currentTimestamp : 0
      setGameId(new BigNumberjs(playingGameId).toNumber())
      setGameTime(time)
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
