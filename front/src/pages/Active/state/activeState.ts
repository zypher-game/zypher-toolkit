import { AddressZero } from '@ethersproject/constants'
import {
  atom,
  ChainId,
  Currency,
  CurrencyLogo,
  IToken,
  ITvlHero,
  localStorageEffect,
  TVLChainId,
  TVLStakingSupportedChainId,
  tvlTokens
} from '@ui/src'
import { Address } from 'wagmi'

export interface IActiveData {
  chainId?: ChainId
  accountAddress: Address
  id: string
  isInitLoading?: boolean // useInit 初始化fetch
  isRegistered: boolean // 账号是否已注册
  invitationCode: string // 邀请码
  signedFalse: boolean // 拒绝签名
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
  airdropPointsStr: string
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
  userStakedAmountStr: string
  totalStakedAmount: string // 总量
  stakedRatio: string // 用户stake量 / 总量
  tvlHero?: ITvlHero
  crHeroBoxAmount: string // CR Hero Mystery Box
  sbtAmount: string // CR Hero Mystery Box
  mintMinimum: string // // 最少质押多少给 SBT
  mintMinimumStr: string
  dollarGpRewords: string // 可claim的 $GP 量
  avatar: string // 头像
  nickname: string // 昵称
  ranking: string // 当前用户的排名
  rankingStr: string // 当前用户的排名
}
export const initActiveData: IActiveData = {
  accountAddress: AddressZero,
  id: '',
  isRegistered: false,
  signedFalse: false,
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
  userStakedAmountStr: '',
  totalStakedAmount: '',
  stakedRatio: '',
  crHeroBoxAmount: '',
  dollarGpRewords: '',
  ranking: '',
  isCheckedAirdropPoints: false,
  mintMinimum: '', // 最少质押多少给 SBT
  sbtAmount: '',
  airdropPointsStr: '',
  rankingStr: '',
  mintMinimumStr: ''
}
export type IActiveDataState = Partial<Record<ChainId, IActiveData>>
export const activeDataState = atom<IActiveDataState>({
  key: 'activeDataV1',
  default: Object.fromEntries(TVLStakingSupportedChainId.map(chainId => [chainId, { ...initActiveData, chainId: chainId }])),
  effects_UNSTABLE: [localStorageEffect('activeDataV1')]
})

export interface ITVLStakingData extends IToken {
  crHeroAmount: string
  allowance: string
  balance: string
  balanceStr: string
  points: string // 获取多少积分
  earnGP: string // 获取多少GP
  earnGPStr: string
  apr: string // 写死
  userStakedAmount: string // 用户stake量
  userStakedAmountStr: string // 用户stake量
  totalStakedAmount: string // stake总量
  totalStakedAmountStr: string // stake总量
  ratio: string
  address: Address
  symbol: string
  decimal: number
  name: string
  chainId?: ChainId
  END_TIME?: string
  getMinStake?: string // CR Hero 最少质押量
}
export const initData: ITVLStakingData = {
  allowance: '',
  balance: '',
  balanceStr: '',
  points: '', // 获取多少积分
  earnGP: '', // 获取多少GP
  earnGPStr: '',
  apr: '20', // 写死
  userStakedAmount: '', // 用户stake量
  userStakedAmountStr: '', // 用户stake量
  totalStakedAmount: '', // stake总量
  totalStakedAmountStr: '', // stake总量
  address: AddressZero,
  symbol: '',
  decimal: 18,
  name: '',
  logoPath: '',
  index: 0,
  crHeroAmount: '',
  ratio: ''
}
export type IStakingItem = {
  tokenAddress: string
  // userStakeTotal: string
  total: string
  // totalStr: string
  // ratio: string
}
export type IStakingDataState = {
  records: Record<string, IStakingItem>
  statistics: {
    stakingAirdrop: string
    stakingAirdropStr: string
    stakingGrowthCoefficient: string
    restakingAirdrop: string
    restakingAirdropStr: string
    restakingGrowthCoefficient: string
  }
}

export const restakingDataState = atom<Record<ChainId, IStakingDataState>>({
  key: 'restakingDataState',
  default: Object.fromEntries(
    TVLStakingSupportedChainId.map(chainId => [
      chainId,
      {
        records: {},
        statistics: {
          stakingAirdrop: '',
          stakingGrowthCoefficient: '',
          restakingAirdrop: '',
          restakingGrowthCoefficient: '',
          stakingAirdropStr: '',
          restakingAirdropStr: ''
        }
      }
    ])
  ) as unknown as Record<ChainId, IStakingDataState>,
  effects_UNSTABLE: [localStorageEffect('restakingDataState')]
})
export const isTvlDataLoadingState = atom<boolean>({
  key: 'isTvlDataLoadingState',
  default: false
})
export const tvlStakingDataV2Init = Object.fromEntries(
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
      ...Object.fromEntries(
        Object.keys(tvlTokens[chainId]).map(currency => [
          currency,
          {
            ...initData,
            ...tvlTokens[chainId][currency],
            chainId: chainId
          }
        ])
      )
    }
  ])
) as unknown as Record<TVLChainId | ChainId, Record<string, ITVLStakingData>>
export const tvlStakingDataState = atom<Record<ChainId, Record<string, ITVLStakingData>>>({
  key: 'tvlStakingDataV2',
  default: tvlStakingDataV2Init,
  effects_UNSTABLE: [localStorageEffect('tvlStakingDataV2')]
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

export const getPointAmount = atom({
  key: 'getPointAmount',
  default: ''
})
export const pointSuccessDialogState = atom({
  key: 'pointSuccessDialogState',
  default: false
})
export const depositCurrencyState = atom<string | undefined>({
  key: 'depositCurrencyState',
  default: undefined
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

export const chainIndexState = atom<number>({
  key: 'chainIndexState',
  default: 0
  // effects_UNSTABLE: [localStorageEffect('activeDataV1')]
})
