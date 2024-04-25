import { ChainId, localStorageEffect } from '@UI/src/'
import { atom } from '@UI/src/'

// ruleDialog
export const invitationRuleDialogState = atom({
  key: 'invitationRuleDialog',
  default: false,
  effects_UNSTABLE: [localStorageEffect('invitationRuleDialog')]
})
// 单个用户信息
export type AccountInfo = {
  user_addr: string // 用户地址
  user_cnt: string // 用户参与次数
  user_cnt_points: string // 用户参与分数 *1
  share_cnt: string // 用户邀请次数
  share_cnt_points: string // 用户邀请分数 *5
  rank: string // 用户排名
  total: string
}
export const accountInfoInit: AccountInfo = {
  user_addr: ' ',
  user_cnt: '0',
  user_cnt_points: '0',
  share_cnt: '0',
  share_cnt_points: '0',
  rank: '0',
  total: '0'
}
export const accountInfoState = atom<AccountInfo>({
  key: 'accountInfoState',
  default: accountInfoInit
  // effects_UNSTABLE: [localStorageEffect('accountInfoState')]
})

// 排名列表
export const accountListInfoStateLoading = atom<boolean>({
  key: 'accountListInfoState',
  default: false
})

export const accountListInfoState = atom<AccountInfo[]>({
  key: 'accountListInfoState',
  default: []
  // effects_UNSTABLE: [localStorageEffect('accountListInfoState')]
})

// 分享者的address
export type IInvitationAddress = {
  address: string
  chainId: ChainId
}
export const invitationAddressState = atom<IInvitationAddress | undefined>({
  key: 'invitationAddressState',
  default: undefined,
  effects_UNSTABLE: [localStorageEffect('invitationAddressState')]
})
