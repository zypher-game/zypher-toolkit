import { atom, ChainId, IGameList, IGameName, localStorageEffect } from '@UI/src/'

import { I2048GameList } from '../hooks/useRecentZ2048FromContract'

export interface IData {
  totalVaultDecimal: number
  totalTransactionVolDecimal: number
  totalPlatformRevenueDecimal: number
  totalPointDecimal: number
  totalGameDecimal: number
  totalPlayersDecimal: number
  totalDebtObligationDecimal: number
  totalGpBurnedDecimal: number
  [IDataKey.totalTransactionVol]: number
  [IDataKey.totalPlatformRevenue]: number
  [IDataKey.totalVault]: number
  [IDataKey.totalPoint]: number
  [IDataKey.totalGame]: number
  [IDataKey.totalPlayers]: number
  [IDataKey.totalDebtObligation]: number
  [IDataKey.totalGpBurned]: number
  total: IDataTotal
}
export enum IDataKey {
  totalVault = 'totalVault',
  totalPoint = 'totalPoint',
  totalGame = 'totalGame',
  totalPlayers = 'totalPlayers',
  totalDebtObligation = 'totalDebtObligation',
  totalGpBurned = 'totalGpBurned',
  totalPlatformRevenue = 'totalPlatformRevenue',
  totalTransactionVol = 'totalTransactionVol'
}
export type IDataTotalItem = {
  total: string
  item?: Record<IGameName, string>
}
export type IDataTotalValue = Partial<Record<ChainId, IDataTotalItem>>
export type IDataTotal = Record<IDataKey, IDataTotalValue>
export const videoDialogState = atom({
  key: 'videoDialog',
  default: false
  // effects_UNSTABLE: [localStorageEffect('videoDialog')]
})

export const homeDateState = atom<IData>({
  key: 'homeDateState',
  default: {
    totalPlatformRevenue: 0,
    totalPlatformRevenueDecimal: 2,
    totalTransactionVol: 0,
    totalTransactionVolDecimal: 0,
    totalVault: 0,
    totalVaultDecimal: 0,
    totalPoint: 0,
    totalPointDecimal: 0,
    totalGame: 0,
    totalGameDecimal: 0,
    totalPlayers: 0,
    totalPlayersDecimal: 0,
    totalDebtObligation: 0,
    totalDebtObligationDecimal: 0,
    totalGpBurned: 0,
    totalGpBurnedDecimal: 0,
    total: {} as IDataTotal
  },
  effects_UNSTABLE: [localStorageEffect('homeDateState')]
})

export const gameListChainListState = atom<IGameList[]>({
  key: 'gameListChainListState2',
  default: [],
  effects_UNSTABLE: [localStorageEffect('gameListChainListState2')]
})

export const z2048ListChainListState = atom<I2048GameList[]>({
  key: 'z2048ListChainListState',
  default: [],
  effects_UNSTABLE: [localStorageEffect('z2048ListChainListState')]
})
// ruleDialog
export const dailyRewardsRuleDialogState = atom({
  key: 'dailyRewardsRuleDialog',
  default: false,
  effects_UNSTABLE: [localStorageEffect('dailyRewardsRuleDialog')]
})
