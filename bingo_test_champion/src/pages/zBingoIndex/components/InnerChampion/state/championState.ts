import { atom } from '@ui/src'

export enum ICurrentChampionState {
  // 报名阶段
  RegistrationOpen, // 报名开放
  Registered, // 已报名
  RegistrationClosed, // 报名结束

  // 卡牌提交阶段
  CardSubmissionOpen, // 提交卡牌开放
  CardSubmitted, // 卡牌已提交

  // 比赛阶段
  PreliminaryRound, // 初赛阶段

  // 复赛相关
  QuarterFinalsCountdown, // 复赛倒计时
  QuarterFinals, // 复赛阶段

  // 决赛相关
  FinalsCountdown, // 决赛倒计时
  Finals, // 决赛阶段

  // 锦标赛结束
  TournamentEnded // 淘汰赛结束
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
  default: ICurrentChampionState.RegistrationOpen
})
// 参赛人数
export const CurrentPlayerNumber = atom({
  key: 'CurrentPlayerNumber',
  default: '0'
})

export const ChampionRulesState = atom({
  key: 'ChampionRulesState',
  default: false
})
