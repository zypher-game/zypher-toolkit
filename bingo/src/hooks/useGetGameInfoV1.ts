import { bingoBetaSupportedChainId, ChainId, ChainRpcUrls, divisorBigNumber, IGameStatus, IPlayer } from '@zypher-game/toolkit/ui'
import BigNumberjs from 'bignumber.js'
import { formatEther } from 'ethers/lib/utils'
import { sample } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import { createPublicClient, http } from 'viem'

import { AllChainInfo } from '@/constants/constants'
import { IBingoVersion } from '@/pages/state/state'
import { setIntervalAwait } from '@/utils/setIntervalAwait'

import { getBingoLobbyAbi, getBingoLobbyAddress } from '../contract/bingoLobby'
import { useActiveWeb3ReactForBingo } from './useActiveWeb3ReactForBingo'
import { useChainIdParamsAsChainId } from './useChainIdParams'
import { IGameIdInfoBeta, IGameIdInfoV1, IRoomInfo } from './useGetGameInfoV1.types'

const getGameInfo = (gameInfo: any[], bingoVersion: IBingoVersion) => {
  try {
    if (bingoVersion === IBingoVersion.v1) {
      const [startedAt, endedAt, winner, winAmount, players, rounds, settings, status] = gameInfo as IGameIdInfoV1
      return {
        startedAt,
        endedAt,
        winner,
        winAmount: new BigNumberjs(winAmount).dividedBy(divisorBigNumber).toString(),
        players: players.map(v => ({
          user: v.user,
          cardId: new BigNumberjs(v.cardId).toString(),
          isAbandoned: v.isAbandoned
        })),
        rounds,
        settings,
        gameInfoStatus: status,
        betSize: formatEther(settings.betSize)
      }
    }
    const [startedAt, endedAt, winner, players, rounds, status] = gameInfo as IGameIdInfoBeta
    return {
      startedAt,
      endedAt,
      winner,
      players: players.map(v => ({
        user: v.user,
        cardId: new BigNumberjs(v.cardId).toString(),
        isAbandoned: false
      })),
      winAmount: '0',
      rounds,
      settings: {
        betSize: 0
      },
      gameInfoStatus: status,
      betSize: '0'
    }
  } catch (e) {
    return {
      startedAt: 0,
      endedAt: 0,
      winner: '',
      players: [],
      winAmount: '0',
      rounds: [],
      settings: {
        betSize: 0
      },
      gameInfoStatus: '',
      betSize: '0'
    }
  }
}
const useGetGameInfoV1 = (gameId: string | number | undefined) => {
  const { bingoVersion, chainId } = useActiveWeb3ReactForBingo()
  const _chainId = useChainIdParamsAsChainId()

  const [roomInfo, setRoomInfo] = useState<IRoomInfo>(() => ({
    player: '',
    round: 0,
    remain: 28,
    status: '',
    players: [],
    selectNumber: new Map(),
    selectedNumbers: [],
    winner: '',
    endedAt: 0,
    startedAt: 0,
    gameInfoStatus: '',
    winAmount: '0',
    betSize: '0'
  }))

  const fetchGameInfo = useCallback(async () => {
    if (!_chainId || roomInfo.status === 'end' || roomInfo.status === 'overtime') {
      return
    }
    const publicClient = createPublicClient({
      chain: AllChainInfo[_chainId],
      transport: http(sample(ChainRpcUrls[_chainId]), { timeout: 4000 })
    })
    const address = getBingoLobbyAddress({
      bingoVersion,
      chainId: _chainId
    })
    const abi = getBingoLobbyAbi({ chainId: _chainId, bingoVersion })
    const res = await publicClient.multicall({
      contracts: [
        { address, abi, functionName: 'getCurrentRound', args: [gameId] },
        { address, abi, functionName: 'getGameInfo', args: [gameId] },
        { address, abi, functionName: 'getSelectedNumbers', args: [gameId] }
      ],
      allowFailure: true
    })
    const [currentRound, gameInfo, selectedNums] = res as any
    const [round, player, remain, status] = currentRound.result || ['', [], 28, '']
    if (!gameInfo.result) {
      return
    }
    const { startedAt, endedAt, winner, players, rounds, gameInfoStatus, winAmount, betSize } = getGameInfo(gameInfo.result || {}, bingoVersion)

    const map: Map<number, number> = new Map()
    rounds.forEach((user: any) => {
      map.set(user.round, user.number)
    })
    const newRoomInfo: typeof roomInfo = {
      players,
      selectNumber: map,
      selectedNumbers: selectedNums.result || [],
      player,
      round,
      remain,
      status,
      winner,
      startedAt,
      endedAt,
      gameInfoStatus,
      winAmount,
      betSize
    }
    setRoomInfo(newRoomInfo)
    return newRoomInfo
  }, [gameId, chainId, _chainId])

  useEffect(() => {
    return setIntervalAwait(fetchGameInfo, 1000)
  }, [fetchGameInfo])

  return { roomInfo, fetchGameInfo }
}

export default useGetGameInfoV1
