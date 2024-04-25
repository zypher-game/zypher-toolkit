import { ChainRpcUrls, divisorBigNumber, IContractName, IGameIdInfo, IPlayer, useActiveWeb3React, zkBingo } from '@UI/src/'
import { formatMoney, getProvider } from '@UI/src/'
import BigNumberJs from 'bignumber.js'
import { useCallback, useEffect, useState } from 'react'
import { formatEther } from 'viem'

import bingoLobby from '../contract/bingoLobby'
import { env } from '../utils/config'
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
const useGetGameInfo = (gameId: number | undefined): IRoomInfo => {
  const { chainId } = useActiveWeb3React()
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
      const lobbyContract = bingoLobby(chainId, env)
      const txnReceipt = await lobbyContract.read.getGameInfo([gameId])
      const [startedAt, endedAt, winner, winAmount, players, rounds, settings, status] = txnReceipt as unknown as IGameIdInfo
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
  }, [chainId, gameId])
  useIntervalAsync(get, 2000, true)
  return roomInfo
}

export const useGetGameSelectedNumbers = (gameId: number | undefined) => {
  const { chainId } = useActiveWeb3React()
  const [selectedNumbers, setSelectedNumbers] = useState([])
  useIntervalAsync(async () => {
    if (!chainId) {
      return
    }
    if (!gameId || gameId <= 0) {
      console.error('gameId is null')
    }
    try {
      const lobbyContract = bingoLobby(chainId, env)
      const numbers = await lobbyContract.read.getSelectedNumbers([gameId])
      setSelectedNumbers(numbers)
    } catch (error) {}
  }, 1000)

  return selectedNumbers
}

export default useGetGameInfo
