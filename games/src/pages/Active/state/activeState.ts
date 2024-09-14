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
  isTwitterPost: boolean
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
  hasSBT: string // CR Hero Mystery Box
  mintMinimum: string // // 最少质押多少给 SBT
  mintMinimumStr: string
  burnMaximum: string
  burnMaximumStr: string
  dollarGpRewords: string // 可claim的 $GP 量
  avatar: string // 头像
  nickname: string // 昵称
  ranking: string // 当前用户的排名
  rankingStr: string // 当前用户的排名
  END_TIMEStr?: string
  startTimeStr?: string
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
  mintMinimumStr: '',
  burnMaximum: '',
  burnMaximumStr: '',
  sbtAmount: '',
  airdropPointsStr: '',
  rankingStr: '',
  hasSBT: '',
  isTwitterPost: false
}
export type IActiveDataState = Partial<Record<ChainId, IActiveData>>
export const activeDataState = atom<IActiveDataState>({
  key: 'activeDataV1',
  default: Object.fromEntries(TVLStakingSupportedChainId.map(chainId => [chainId, { ...initActiveData, chainId: chainId }]))
  // effects_UNSTABLE: [localStorageEffect('activeDataV1')]
})

export interface ITVLStakingData extends IToken {
  crHeroAmount: string
  allowance: string
  allowanceNFT: boolean
  balance: string
  balanceStr: string
  points: string // 获取多少积分
  earnGP: string // 获取多少GP
  earnGPStr: string
  apr: string // 写死
  userStakedAmount: string // 用户stake量
  userStakedAmountStr: string // 用户stake量
  withdrawAmount: string
  withdrawAmountStr: string
  extendAmount: string
  extendAmountStr: string
  unlockTime: string
  unlockTimeStr: string
  totalStakedAmount: string // stake总量
  totalStakedAmountStr: string // stake总量
  ratio: string
  address: Address
  symbol: string
  decimal: number
  name: string
  chainId?: ChainId
  END_TIME?: string
  startTime?: string
  sbtId?: string
  hasSBT?: boolean
  getMinStake?: string
  getWeek?: string
}
export const initData: ITVLStakingData = {
  allowance: '',
  balance: '',
  balanceStr: '',
  points: '', // 获取多少积分
  earnGP: '', // 获取多少GP
  earnGPStr: '',
  apr: '≥ 4', // 写死
  userStakedAmount: '', // 用户stake量
  userStakedAmountStr: '', // 用户stake量
  withdrawAmount: '',
  withdrawAmountStr: '',
  extendAmount: '',
  extendAmountStr: '',
  unlockTime: '0',
  unlockTimeStr: '',
  totalStakedAmount: '', // stake总量
  totalStakedAmountStr: '', // stake总量
  address: AddressZero,
  symbol: '',
  decimal: 18,
  name: '',
  logoPath: '',
  index: 0,
  crHeroAmount: '',
  ratio: '',
  allowanceNFT: false
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
export const initStakingDataState: IStakingDataState = {
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
export const restakingDataState = atom<Record<ChainId, IStakingDataState>>({
  key: 'restakingDataState',
  default: Object.fromEntries(TVLStakingSupportedChainId.map(chainId => [chainId, initStakingDataState])) as unknown as Record<
    ChainId,
    IStakingDataState
  >,
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
  key: 'tvlStakingDataV3',
  default: tvlStakingDataV2Init,
  effects_UNSTABLE: [localStorageEffect('tvlStakingDataV3')]
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

export const tvlWithdrawDialogState = atom({
  key: 'tvlWithdrawDialogState',
  default: false
})

export const tvlExtendDialogState = atom({
  key: 'tvlExtendDialogState',
  default: false
})

export const tvlRedepositDialogState = atom({
  key: 'tvlRedepositDialogState',
  default: false
})
export const tvlStakingForbidDialogState = atom({
  key: 'tvlStakingForbidDialogState',
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
type Owner = string | undefined
type Parent = string | undefined
export const getPointCardDialogState = atom<[Owner, Parent]>({
  key: 'getPointCardDialogState',
  default: [undefined, undefined]
  // default: [false, false]
})
export type IGetPointCardData = {
  ownerTeam: {
    num: number
    scoreIds: number[]
    captainNickname: string
  }
  parentTeam: {
    num: number
    scoreIds: number[]
    captainNickname: string
  }
}
export const getPointCardData = atom<IGetPointCardData | undefined>({
  key: 'getPointCardData',
  default: undefined
})

export const depositCurrencyState = atom<string | undefined>({
  key: 'depositCurrencyState',
  default: undefined,
  effects_UNSTABLE: [localStorageEffect('depositCurrencyState')]
})
export const redepositCurrencyState = atom<string | undefined>({
  key: 'redepositCurrencyState',
  default: undefined,
  effects_UNSTABLE: [localStorageEffect('redepositCurrencyState')]
})
export const extendCurrencyState = atom<string | undefined>({
  key: 'extendCurrencyState',
  default: undefined,
  effects_UNSTABLE: [localStorageEffect('extendCurrencyState')]
})

export const withdrawCurrencyState = atom<string | undefined>({
  key: 'withdrawCurrencyState',
  default: undefined,
  effects_UNSTABLE: [localStorageEffect('withdrawCurrencyState')]
})
export const chooseChainState = atom<ChainId | undefined>({
  key: 'chooseChainState',
  default: undefined,
  effects_UNSTABLE: [localStorageEffect('chooseChainState')]
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
