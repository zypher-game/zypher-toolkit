import { atom, BigNumberJs, localStorageEffect } from '@ui/src'
export const ChampionshipAmount = new BigNumberJs('1000').times(new BigNumberJs('10').exponentiatedBy(18)).toFixed()
export enum ICurrentChampionState {
  // 报名阶段
  RegistrationOpen = 'RegistrationOpen', // 报名开放  1
  Registered = 'Registered', // 已报名  2
  RegistrationClosed = 'RegistrationClosed', // 报名结束  3

  // 卡牌提交阶段
  CardSubmissionOpen = 'CardSubmissionOpen', // 提交卡牌开放  4
  CardSubmitted = 'CardSubmitted', // 卡牌已提交  5

  // 比赛阶段
  PreliminaryRound = 'PreliminaryRound', // 初赛阶段  6

  // 复赛相关
  QuarterFinalsCountdown = 'QuarterFinalsCountdown', // 复赛倒计时  7
  QuarterFinals = 'QuarterFinals', // 复赛阶段  8

  // 决赛相关
  FinalsCountdown = 'FinalsCountdown', // 决赛倒计时  9
  Finals = 'Finals', // 决赛阶段  10

  // 锦标赛结束
  TournamentEnded = 'TournamentEnded' // 淘汰赛结束  11
}

// 以一场淘汰赛为例
// 10:00am：上午10点开始报名，报名限时20分钟，满50人（淘汰赛未开始）
// 10:20am：报名结束，开始提交卡牌，限时5分钟（合约限制10分钟）（淘汰赛开始）
// 10:30am：开始初赛，一局时长30分钟（淘汰赛开始，初赛阶段）
// 11:00am：开始复赛进入倒计时，限时5分钟提交卡牌（合约限制10分钟）（淘汰赛开始，复赛未开始）
// 11:10am：开始复赛，一局时长30分钟（淘汰赛开始，复赛阶段）
// 11:40am：开始决赛进入倒计时，限时5分钟内提交卡牌（合约限制10分钟）（淘汰赛开始，决赛未开始）
// 11:50am：开始决赛，一局时长30分钟（淘汰赛开始，决赛阶段）
// 12:20am：一场淘汰赛结束（淘汰赛结
// 下一场：
// 14:00am：开始报名，（淘汰赛未开始）
// 14:20am：报名结束，开始提交卡牌，限时5分钟（合约限制10分钟）（淘汰赛开始）
// 14:30am：开始初赛，一局时长30分钟（淘汰赛开始，初赛阶段）
// 15:00am：开始复赛进入倒计时，限时5分钟提交卡牌（合约限制10分钟）（淘汰赛开始，复赛未开始）
// 15:10am：开始复赛，一局时长30分钟（淘汰赛开始，复赛阶段）
// 15:40am：开始决赛进入倒计时，限时5分钟内提交卡牌（合约限制10分钟）（淘汰赛开始，决赛未开始）
// 15:50am：开始决赛，一局时长30分钟（淘汰赛开始，决赛阶段）
// 16:20am：一场淘汰赛结束（淘汰赛结束）    按照这个   给我设置一个变量

// 比赛时间配置
export const TOURNAMENT_CONFIG = {
  FIRST_MATCH: {
    START_TIME: '10:00',
    END_TIME: '12:20'
  },
  SECOND_MATCH: {
    START_TIME: '14:00',
    END_TIME: '16:20'
  },
  DURATIONS: {
    REGISTRATION: 20, // 报名时长
    CARD_SUBMIT: 10, // 提交卡牌时长（合约限制）
    MATCH: 30 // 比赛时长
  }
}
export const TabTextList = [
  {
    key: 0,
    text: 'CHAMPIONSHIP'
  },
  {
    key: 1,
    text: 'CLASSIC'
  }
] as const

export type ITabText = typeof TabTextList[number]

export const TabState = atom<ITabText>({
  key: 'TabState',
  default: TabTextList[0]
})
export const CurrentChampionState = atom({
  key: 'CurrentChampionState',
  default: ICurrentChampionState.RegistrationOpen,
  effects_UNSTABLE: [localStorageEffect('CurrentChampionState')]
})

export const ChampionRulesState = atom({
  key: 'ChampionRulesState',
  default: false
})

export const ChampionRewardsHistoryState = atom({
  key: 'ChampionRewardsHistoryState',
  default: false
})
