import { atom } from '@ui/src'

export interface IChampionshipRoundInfo {
  /** 轮次序号 (1: Qualifiers, 2: Semifinals, 3: Finals) */
  round: number
  /** 轮次名称 */
  title: string
  /** 该轮次的桌子数量 */
  tables: number
  /** 轮次开始时间（Unix timestamp） */
  startTime: number
}

/**
 * 锦标赛基本信息
 */
export interface IChampionshipInfo {
  /** 锦标赛ID */
  champId: string // uint64
  /** 注册开始时间（Unix timestamp） */
  registerAt: number // uint32
  /** 参赛费用（以 wei 为单位） */
  entryFee: string // uint256 (BigInt)
  /** 奖池总额（以 wei 为单位） */
  prizePool: string // uint256 (BigInt)
  /** 已注册玩家数量 */
  regPlayers: number // uint32
  /** 最大玩家数量限制 */
  maxPlayers: number // uint32
  /** 锦标赛轮次信息数组 */
  rounds: IChampionshipRoundInfo[]
  /** 获胜者地址（如果比赛未结束，则为零地址） */
  winner: string // address
}

/**
 * 锦标赛状态，包含上一场、当前和下一场锦标赛信息
 */
export interface IChampionshipStatus {
  /** 上一场锦标赛信息 */
  last: IChampionshipInfo
  /** 当前正在进行的锦标赛信息 */
  current: IChampionshipInfo
  /** 下一场锦标赛信息 */
  next: IChampionshipInfo
}

export const StatsState = atom<IChampionshipStatus>({
  key: 'StatsState',
  default: undefined
})
export const StatsLoadingState = atom({
  key: 'StatsLoadingState',
  default: false
})
// 没参加一下
export const IsNotParticipatingState = atom({
  key: 'IsNotParticipatingState',
  default: false
})
