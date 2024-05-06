import { Address } from 'wagmi'

export enum IMonsterStatus {
  READY = 'READY',
  MonsterNftWait = 'MonsterNftWait', // 等待开启
  MonsterNft = 'MonsterNft', // nft 再售
  WaitFight = 'WaitFight', // 准备打
  Fight = 'Fight', // 在打
  End = 'End' // 结束
}

export enum ImonsterUserStatus {
  READY = 'READY',
  CannotGetCard = 'CannotGetCard', // bingo次数不够
  // SingedIn = 'SingedIn', // 已签到
  // MissingMonsterNft = 'MissingMonsterNft', // 漏签
  CanGetACard = 'CanGetACard', // bingo次数够了，可以点击获得卡片
  AlreadyHaveACard = 'AlreadyHaveACard', // 有卡片
  NoCard = 'NoCard', // 没有卡片
  Fight = 'Fight', // 在打
  // Fighted = 'Fighted', // 打过了
  ReceiveAward = 'ReceiveAward', //可以领取奖励了
  CannotReceiveAward = 'CannotReceiveAward' //不可以领取奖励了
  // ReceiveAwarded = 'ReceiveAwarded' // 已经领取奖励
}

export type IDefenceRankDataItem = {
  rank?: string
  address: Address
  point: string
  pointStr: string
}
export type IFightInfo = {
  totalPoint: string
  nowPoint: string
}
