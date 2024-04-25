import { AddressZero } from '@ethersproject/constants'
import { atom, ChainId, Currency, CurrencyLogo, localStorageEffect } from '@UI/src/'
import { Address } from 'wagmi'

import { defaultActiveChainId, IToken, TVLChainId, TVLStakingSupportedChainId, tvlTokens } from '../constants/activeConstants'
export enum ITvlHero {
  Agil = 'Agil',
  Yueling = 'Yueling',
  Celus = 'Celus',
  Ivan = 'Ivan',
  Liana = 'Liana'
}
export interface IActiveData {
  id: string
  isInitLoading: boolean // useInit 初始化fetch
  isRegistered: boolean // 账号是否已注册
  invitationCode: string // 邀请码
  signedStr: string //签名
  twitter: {
    avatar: string // 昵称
    nickname: string // 头像
    followerCount: string // 粉丝数量
    isLoading: boolean
  }
  discord: {
    avatar: string // 昵称
    nickname: string // 头像
    followerCount: string // 粉丝数量
    isLoading: boolean
  }
  airdropPointsCardNumber: string
  airdropPoints: string
  airdropPointsDetail: {
    init: string
    byTwitter: string
    byTwitterMore: string
    byGas: string
    gas: string
    gasStr: string
    byBalance: string
    balance: string
    balanceStr: string
  }
  isCheckedAirdropPoints: boolean // airdrop 是否已经检测过
  checkAirdropPointsLoading: boolean // 检测airdrop量
  userStakedAmount: string // 用户stake量
  totalStakedAmount: string // 总量
  stakedRatio: string // 用户stake量 / 总量
  tvlHero?: ITvlHero
  crHeroBoxAmount: string // CR Hero Mystery Box
  dollarGpRewords: string // 可claim的 $GP 量
  avatar: string // 头像
  nickname: string // 昵称
}
export const initActiveData: IActiveData = {
  id: '',
  isInitLoading: false,
  isRegistered: false,
  signedStr: '',
  avatar: '',
  nickname: '',
  invitationCode: '',
  twitter: {
    avatar: '',
    nickname: '',
    followerCount: '',
    isLoading: false
  },
  discord: {
    avatar: '',
    nickname: '',
    followerCount: '',
    isLoading: false
  },
  checkAirdropPointsLoading: false,
  airdropPoints: '',
  airdropPointsCardNumber: '',
  airdropPointsDetail: {
    init: '',
    byTwitter: '',
    byTwitterMore: '',
    byGas: '',
    byBalance: '',
    gas: '',
    gasStr: '',
    balance: '',
    balanceStr: ''
  },
  userStakedAmount: '',
  totalStakedAmount: '',
  stakedRatio: '',
  crHeroBoxAmount: '',
  dollarGpRewords: '',
  isCheckedAirdropPoints: false
}
export const activeDataState = atom({
  key: 'activeData',
  default: initActiveData
})

export interface ITVLStakingData extends IToken {
  allowance: string
  balance: string
  balanceStr: string
  points: string // 获取多少积分
  earnGP: string // 获取多少GP
  apr: string // 写死
  userStakedAmount: string // 用户stake量
  totalStakedAmount: string // stake总量
  address: Address
  symbol: string
  decimal: number
  name: string
  chainId?: ChainId
  END_TIME?: string
}
export const initData: ITVLStakingData = {
  allowance: '',
  balance: '',
  balanceStr: '',
  points: '', // 获取多少积分
  earnGP: '', // 获取多少GP
  apr: '20', // 写死
  userStakedAmount: '', // 用户stake量
  totalStakedAmount: '', // stake总量
  address: AddressZero,
  symbol: '',
  decimal: 18,
  name: '',
  logoPath: '',
  index: 0
}
export const tvlStakingDataState = atom<Record<TVLChainId, Record<string, ITVLStakingData>>>({
  key: 'tvlStakingData',
  default: Object.fromEntries(
    TVLStakingSupportedChainId.map(chainId => [
      chainId,
      {
        [Currency[chainId]]: {
          ...initData,
          symbol: Currency[chainId],
          name: Currency[chainId],
          logoPath: CurrencyLogo[chainId],
          allowance: '9999999999999999999999999999',
          chainId: chainId,
          index: 0
        },
        [tvlTokens[chainId].USDT.symbol]: {
          ...initData,
          ...tvlTokens[chainId].USDT,
          chainId: chainId
        },
        [tvlTokens[chainId].WETH.symbol]: {
          ...initData,
          ...tvlTokens[chainId].WETH,
          chainId: chainId
        }
      }
    ])
  ) as unknown as Record<TVLChainId, Record<string, ITVLStakingData>>
})
export const selectChainDialogState = atom({
  key: 'selectChainDialogState',
  default: false
})
export const selectTokenDialogState = atom({
  key: 'selectTokenDialogState',
  default: false
})

export const tvlStakingDialogState = atom({
  key: 'tvlStakingDialogState',
  default: false
})

export const changeNameDialogState = atom({
  key: 'changeNameDialogState',
  default: false
})

export const tvlPointDialogState = atom({
  key: 'tvlPointDialogState',
  default: false
})

export const pointSuccessDialogState = atom({
  key: 'pointSuccessDialogState',
  default: false
})
export const depositCurrencyState = atom({
  key: 'depositCurrencyState',
  default: 'ETH'
})
export const chooseChainState = atom<ChainId | undefined>({
  key: 'chooseChainState',
  default: undefined
})
export const tvlPathState = atom<number>({
  key: 'tvlPathState',
  default: 0,
  effects_UNSTABLE: [localStorageEffect('tvlPathState')]
})
