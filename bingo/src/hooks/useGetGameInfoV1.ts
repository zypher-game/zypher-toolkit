import { AllChainInfo, ChainRpcUrls, divisorBigNumber, httpGet, pathnameState, TG_BOT_URL, useAaWallet, useIsTelegram, useRecoilValue } from '@ui/src'
import { BigNumberJs } from '@ui/src'
import { formatEther } from 'ethers/lib/utils'
import { sample } from 'lodash'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { createPublicClient, http } from 'viem'

import { IBingoVersion } from '@/pages/state/state'
import { setIntervalAwait } from '@/utils/setIntervalAwait'

import { getBingoLobbyAbi, getBingoLobbyAddress } from '../contract/bingoLobby'
import { useActiveWeb3ReactForBingo } from './useActiveWeb3ReactForBingo'
import { useChainIdParamsAsChainId } from './useChainIdParams'
import { IGameIdInfoBeta, IGameIdInfoV1, IRoomInfo } from './useGetGameInfoV1.types'

const getGameInfo = (gameInfo: any, bingoVersion: IBingoVersion) => {
  try {
    if (bingoVersion === IBingoVersion.v1) {
      const [startedAt, endedAt, winner, winAmount, players, rounds, settings, status] = gameInfo as IGameIdInfoV1
      return {
        startedAt,
        endedAt,
        winner,
        winAmount: new BigNumberJs(winAmount).dividedBy(divisorBigNumber).toString(),
        players: players.map(v => ({
          user: v.user,
          cardId: new BigNumberJs(v.cardId).toString(),
          isAbandoned: v.isAbandoned
        })),
        rounds,
        settings,
        gameInfoStatus: status,
        betSize: formatEther(settings.betSize)
      }
    }

    const [startedAt, endedAt, winner, players, rounds, status] = gameInfo as IGameIdInfoBeta
    console.log(11111, { gameInfo: players })
    const addressList = players.map((v: any) => v.user)
    console.log(2222, addressList)
    return {
      startedAt,
      endedAt,
      winner,
      players: players.map(v => ({
        user: v.user,
        cardId: new BigNumberJs(v.cardId).toString(),
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
  const shouldContinueRef = useRef(true) // 控制循环是否应该继续
  const pathname = useRecoilValue<string[]>(pathnameState)
  const location = useLocation() // 获取当前路由位置
  const { bingoVersion, chainId } = useActiveWeb3ReactForBingo()
  const _chainId = useChainIdParamsAsChainId()
  const IS_TELEGRAM = useIsTelegram()
  // const [tgNameList, setTgNameList] = useState<any>()
  const [tgNameList, setTgNameList] = useState<Record<string, string>>({})
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
    if (!_chainId || AllChainInfo[_chainId] || roomInfo.status === 'end' || roomInfo.status === 'overtime') {
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
    const abi = getBingoLobbyAbi({ bingoVersion })
    const res = await publicClient.multicall({
      contracts: [
        { address, abi, functionName: 'getCurrentRound', args: [gameId] },
        { address, abi, functionName: 'getGameInfo', args: [gameId] },
        { address, abi, functionName: 'getSelectedNumbers', args: [gameId] }
      ],
      allowFailure: true
    })
    const [currentRound, gameInfo, selectedNums] = res as any
    console.log({ currentRound, gameInfo, selectedNums })
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
  }, [gameId, chainId, roomInfo.status, _chainId])
  const getTgName = useCallback(async () => {
    const list = roomInfo.players.filter(v => !v.tgName).map(v => v.user.toLowerCase())
    if (list && list.length) {
      const { data } = await httpGet<[string, string][]>(TG_BOT_URL + `/user/ger_user_name?list=${JSON.stringify(list)}`)
      console.log({ data })
      if (Array.isArray(data) && data.length && data.every(item => Array.isArray(item) && item.length === 2)) {
        // 将结果转换为一个对象
        const ltgNameList = Object.fromEntries(data)
        setTgNameList(ltgNameList)
      }
    }
  }, [JSON.stringify(roomInfo.players)])
  console.log({ tgNameList })
  useEffect(() => {
    getTgName()
  }, [JSON.stringify(roomInfo.players)])
  useEffect(() => {
    const stopInterval = setIntervalAwait(fetchGameInfo, 1000, () => shouldContinueRef.current)
    console.log({ pathname1: location.pathname })
    console.log({ pathname2: pathname })
    // if (location.pathname.indexOf('room') === -1) {
    //   console.log('Pathname changed, stopping the interval.')
    //   shouldContinueRef.current = false // 设置为 false 来停止循环
    // } else {
    //   shouldContinueRef.current = true // 设置为 false 来停止循环
    // }
    // 清理函数
    return () => {
      stopInterval() // 停止循环
    }
  }, [fetchGameInfo, pathname])

  return useMemo(() => {
    console.log({ tgNameList })
    return {
      roomInfo: {
        ...roomInfo,
        players: roomInfo.players.map((v, index) => {
          console.log({ v, user: v.user })
          return {
            ...v,
            tgName: IS_TELEGRAM
              ? tgNameList[v.user.toLowerCase()]
                ? tgNameList[v.user.toLowerCase()]
                : v.tgName
                ? v.tgName
                : `BingoPlay${index}`
              : undefined
          }
        })
      },
      fetchGameInfo
    }
  }, [roomInfo, tgNameList, fetchGameInfo])
}

export default useGetGameInfoV1
