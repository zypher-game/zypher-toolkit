import { IContractName, useActiveWeb3React, useRecoilState, zkBingo } from '@UI/src/'
import { useCallback, useEffect, useState } from 'react'

import bingoLobby from '@/contract/bingoLobby'
import BigNumberJs from '@/utils/BigNumberJs'

import { gameRoomState, joinGameState } from '../pages/Bingo/state'
import { env } from '../utils/config'

export default function useRestoreGame<T>() {
  const [resetGameRoom] = useRecoilState(gameRoomState)
  const [joinGame] = useRecoilState(joinGameState)
  const [gameTime, setGameTime] = useState(0)
  const [loading, setLoading] = useState(false)
  const [isPlaying, setisPlaying] = useState(false)
  const [gameId, setGameId] = useState<number>()
  const { account, chainId } = useActiveWeb3React()

  const handle = useCallback(async () => {
    if (!chainId || !account) {
      return
    }
    try {
      setLoading(true)
      const lobbyContract = bingoLobby(chainId, env)
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
      const Playing = new BigNumberJs(playingGameId).toNumber() > 0
      const currentTimestamp = Math.floor(Date.now() / 1000)
      const time = autoEndTime > 0 ? autoEndTime - currentTimestamp : 0
      setGameId(new BigNumberJs(playingGameId).toNumber())
      setGameTime(time)
      setisPlaying(Playing)
      setLoading(false)
    } catch (error) {
      console.error('handle Error: ', error)
    }
  }, [account, chainId])
  useEffect(() => {
    handle()
  }, [resetGameRoom, account, chainId])

  return { gameTime, isPlaying, loading, gameId }
}
