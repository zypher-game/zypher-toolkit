import { atom, localStorageEffect } from '@ui/src'

import { IDPData } from './useGPAction'

export const dpTabIndexState = atom<number>({
  key: 'dpTabIndex',
  default: 0,
  effects_UNSTABLE: [localStorageEffect('dpTabIndex')]
})
export const viewDPStakedDpsDialogState = atom({
  key: 'viewDPStakedDpsDialog',
  default: false
})
export const viewDPLockedDpsDialogState = atom({
  key: 'viewDPLockedDpsDialog',
  default: false
})

export const dpBuyDialogState = atom({
  key: 'dpBuyDialog',
  default: false
})

export const dpActionDialogState = atom({
  key: 'dpActionDialog',
  default: false
})

export const dpDataState = atom<IDPData>({
  key: 'dpDataState',
  default: {
    totalInvestmentAmount: '-',
    totalInvestmentAmountStr: '-',
    minted: '-',
    mintedStr: '-',
    staked: '-',
    stakedStr: '-',
    locked: '-',
    lockedStr: '-',
    lockWeight: '-',
    lockWeightStr: '-',
    maxApy: '-',
    maxApyStr: '-'
  },
  effects_UNSTABLE: [localStorageEffect('dpDataState')]
})
