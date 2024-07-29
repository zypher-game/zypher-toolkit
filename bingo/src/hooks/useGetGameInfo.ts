import { divisorBigNumber, IGameStatus, IPlayer } from '@ui/src'
import { BigNumberJs } from '@ui/src'
import { useCallback, useState } from 'react'
import { formatEther } from 'viem'

import { IBingoVersion } from '@/pages/state/state'

import bingoLobby from '../contract/bingoLobby'
import { env } from '../utils/config'
import { useActiveWeb3ReactForBingo } from './useActiveWeb3ReactForBingo'
import useIntervalAsync from './useIntervalAsync'

export type IPlayersProps = {
  user: string
  isAbandoned: boolean
}

export type IRoomInfo = {
  players: IPlayersProps[]
  selectNumber: Map<number, number>
  selectedNumbers: number[]
  winAmount: number | string
  betSize: string | number
}
type IGameRound = {
  round: number // uint32 round;
  number: number // uint8 number;
  timestamp: number // uint32 timestamp;
  player: string // address player;
}
type IGameSettings = {
  betSize: bigint
  expectedLines: number
  minNumber: number // number smaller than this will not be selected
  maxNumber: number // number larger than this will not be selected
}
type IGameIdInfoV1 = [
  number, // startedAt,
  number, // endedAt,
  string, // address winner,
  number, // winAmount,
  IPlayer[], //  Participant[] memory players,
  IGameRound[], // GameRound[] memory rounds,
  IGameSettings, // GameSettings memory settings,
  IGameStatus // string memory status
]
type IGameIdInfoBeta = [
  number, // startedAt, 0
  number, // endedAt, 1
  string, // address winner,2
  IPlayer[], //  Participant[] memory players,3
  IGameRound[], // GameRound[] memory rounds,
  IGameStatus // string memory status
]

const useGetGameInfo = (gameId: number | undefined): IRoomInfo => {
  const { chainId, bingoVersion } = useActiveWeb3ReactForBingo()
  const [roomInfo, setRoomInfo] = useState<{
    players: IPlayer[]
    selectNumber: Map<number, number>
    selectedNumbers: number[]
    winAmount: number | string
    betSize: string | number
  }>({
    players: [],
    selectNumber: new Map(),
    selectedNumbers: [],
    winAmount: 0,
    betSize: 0
  })
  const get = useCallback(async () => {
    if (!chainId) {
      return
    }
    if (!gameId || gameId <= 0) {
      console.error('gameId is null')
    }
    try {
      const lobbyContract = bingoLobby({ chainId, env, bingoVersion })
      const txnReceipt = await lobbyContract.read.getGameInfo([gameId])
      let winAmount = 0
      let players: IPlayer[] = []
      let rounds: IGameRound[] = []
      let settings = {
        betSize: 0n
      }
      if (bingoVersion === IBingoVersion.v1) {
        ;[, , , winAmount, players, rounds, settings] = txnReceipt as unknown as IGameIdInfoV1
      } else {
        ;[, , , players, rounds] = txnReceipt as unknown as IGameIdInfoBeta
      }
      const map: Map<number, number> = new Map()
      rounds.forEach((player: any) => {
        map.set(player.round, player.number)
      })
      const selectedNumbers = rounds.map(item => item.number)
      const win = new BigNumberJs(winAmount).dividedBy(divisorBigNumber).toString()
      setRoomInfo(prev => ({
        ...prev,
        players: players,
        selectNumber: map,
        winAmount: win,
        selectedNumbers: selectedNumbers,
        betSize: formatEther(settings.betSize)
      }))
    } catch (error) {
      console.error('useGetGameInfo: ', error)
    }
  }, [chainId, gameId, bingoVersion])
  useIntervalAsync(get, 2000, true)
  return roomInfo
}

export const useGetGameSelectedNumbers = (gameId: number | undefined) => {
  const { chainId, bingoVersion } = useActiveWeb3ReactForBingo()
  const [selectedNumbers, setSelectedNumbers] = useState([])
  useIntervalAsync(async () => {
    if (!chainId) {
      return
    }
    if (!gameId || gameId <= 0) {
      console.error('gameId is null')
    }
    try {
      const lobbyContract = bingoLobby({ chainId, env, bingoVersion })
      const numbers = await lobbyContract.read.getSelectedNumbers([gameId])
      setSelectedNumbers(numbers)
    } catch (error) {}
  }, 1000)

  return selectedNumbers
}

export default useGetGameInfo
