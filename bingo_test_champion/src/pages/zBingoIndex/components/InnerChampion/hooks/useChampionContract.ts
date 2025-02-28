import { BigNumberJs, bingoChampionSupportedChainId, IContractName, MulticallContract, useAaWallet, useRecoilState, zkBingoChampion } from '@ui/src'
import { useCallback, useEffect } from 'react'

import { ChampionContractABI } from '../contract/championContract'
import { CurrentGameState, ICurrentGame } from '../state/currentGameState'
import { IChampionshipInfo, IChampionshipRoundInfo, IChampionshipStatus, StatsLoadingState, StatsState } from '../state/StatsState'

export const useChampionContract = () => {
  const { chainId, account, walletClient } = useAaWallet()
  const [StatsLoading, setStatsLoading] = useRecoilState(StatsLoadingState)
  const [stats, setStats] = useRecoilState(StatsState)
  const [currentGame, setCurrentGame] = useRecoilState(CurrentGameState)
  const getData = useCallback(async () => {
    if (StatsLoading) {
      return
    }
    if (chainId && bingoChampionSupportedChainId.includes(chainId)) {
      try {
        setStatsLoading(true)
        const multicall = await MulticallContract(chainId)
        const paramsGameId = [
          {
            reference: 'ZypherBingoChampionship',
            contractAddress: zkBingoChampion(chainId, IContractName.ZypherBingoChampionship),
            abi: ChampionContractABI,
            calls: [
              {
                methodName: 'stats',
                reference: 'stats'
              },
              {
                methodName: 'currentGame',
                reference: 'currentGame',
                methodParameters: [account]
              }
            ]
          }
        ]
        if (multicall) {
          const { results } = await multicall.call(paramsGameId)
          if (results) {
            const Stats = results['ZypherBingoChampionship']['callsReturnContext'][0]['returnValues']
            const [last, current, next] = Stats
            console.log({
              last: formatStatsInfo(last),
              current: formatStatsInfo(current),
              next: formatStatsInfo(next)
            })
            setStats({
              last: formatStatsInfo(last),
              current: formatStatsInfo(current),
              next: formatStatsInfo(next)
            } as IChampionshipStatus)
            const CurrentGame = results['ZypherBingoChampionship']['callsReturnContext'][1]['returnValues']
            const cur = formatCurrentGameInfo(CurrentGame) as ICurrentGame
            console.log({ CurrentGame: cur })

            setCurrentGame(cur)
          }
        }
        // const championContract = ChampionContract({
        //   chainId,
        //   env,
        //   walletClient
        // })
        // if (championContract) {
        //   const result = await championContract.read.stats()
        //   setStats(formatContractData(result) as IChampionshipStatus)
        // }
      } catch (e) {
      } finally {
        setStatsLoading(false)
      }
    }
  }, [chainId])
  useEffect(() => {
    getData()
  }, [getData])
}
const formatBg = (obj: { hex: string; type: string }): string => {
  return new BigNumberJs(obj.hex).toFixed()
}
const formatStatsInfo = (data: any[]): IChampionshipInfo => {
  const [
    /** 锦标赛ID */
    champId,
    /** 注册开始时间（Unix timestamp） */
    registerAt,
    /** 参赛费用（以 wei 为单位） */
    entryFee,
    /** 奖池总额（以 wei 为单位） */
    prizePool,
    /** 已注册玩家数量 */
    regPlayers,
    /** 最大玩家数量限制 */
    maxPlayers,
    /** 锦标赛轮次信息数组 */
    rounds,
    /** 获胜者地址（如果比赛未结束，则为零地址） */
    winner
  ] = data
  // 格式化 rounds 数组
  const formattedRounds: IChampionshipRoundInfo[] = rounds.map((round: any[]) => ({
    round: Number(round[0]),
    title: round[1],
    tables: Number(round[2]),
    startTime: Number(round[3])
  }))

  return {
    champId: formatBg(champId),
    registerAt: Number(registerAt),
    entryFee: formatBg(entryFee),
    prizePool: formatBg(prizePool),
    regPlayers: Number(regPlayers),
    maxPlayers: Number(maxPlayers),
    rounds: formattedRounds,
    winner: String(winner)
  }
}
const formatCurrentGameInfo = (data: any[]): ICurrentGame => {
  const [gameId, champId, round, table, startAt] = data
  return {
    gameId: formatBg(gameId),
    champId: formatBg(champId),
    round: String(round),
    table: String(table),
    startAt: String(startAt)
  }
}
