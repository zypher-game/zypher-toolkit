import { divisorBigNumber, IGameStatus, IPlayer } from '@ui/src'
import { BigNumberJs } from '@ui/src'
import { useCallback, useState } from 'react'
import { formatEther } from 'viem'

import { IBingoVersion } from '@/pages/state/state'

import bingoLobby from '../contract/bingoLobby'
import { env } from '../utils/config'
import { useActiveWeb3ReactForBingo } from './useActiveWeb3ReactForBingo'
import { IGameIdInfoV1, IGameRound, IGameSettings, IRoomInfo } from './useGetGameInfoV1.types'
import useIntervalAsync from './useIntervalAsync'

type IGameIdInfoBeta = [
  number, // startedAt, 0
  number, // endedAt, 1
  string, // address winner,2
  IPlayer[], //  Participant[] memory players,3
  IGameRound[], // GameRound[] memory rounds,
  IGameStatus // string memory status
]

const useGetGameInfo = (gameId: number | undefined): IRoomInfo | undefined => {
  const { chainId, bingoVersion } = useActiveWeb3ReactForBingo()
  const [roomInfo, setRoomInfo] = useState<IRoomInfo>()
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
      let startedAt: number,
        endedAt: number,
        winner: string,
        winAmount: number,
        players: IPlayer[],
        rounds: IGameRound[],
        settings: IGameSettings,
        status: IGameStatus
      if (bingoVersion === IBingoVersion.v1) {
        ;[startedAt, endedAt, winner, winAmount, players, rounds, settings, status] = txnReceipt as unknown as IGameIdInfoV1
        // ;[, , , winAmount, players, rounds, settings] = txnReceipt as unknown as IGameIdInfoV1
      } else {
        ;[startedAt, endedAt, winner, players, rounds, status] = txnReceipt as unknown as IGameIdInfoBeta
        // ;[, , , players, rounds] = txnReceipt as unknown as IGameIdInfoBeta
        winAmount = 0 // Set a default value for winAmount
        settings = {
          betSize: 0n,
          expectedLines: 0,
          minNumber: 0, // number smaller than this will not be selected
          maxNumber: 0 // number larger than this will not be selected
        }
      }
      const map: Map<number, number> = new Map()
      rounds.forEach((player: any) => {
        map.set(player.round, player.number)
      })
      const selectedNumbers = rounds.map(item => item.number)
      const win = new BigNumberJs(winAmount).dividedBy(divisorBigNumber).toString()
      setRoomInfo(prev => ({
        ...prev,
        gameInfoStatus: prev?.gameInfoStatus ?? '',
        startedAt: startedAt,
        endedAt: endedAt,
        player: prev?.player ?? '',
        round: prev?.round ?? 0,
        remain: prev?.remain ?? 0,
        status: prev?.status ?? '',
        winner,
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
