import { atom } from '@UI/src/'

import { IStatus } from './useCombo'
export const comboBannerDialogState = atom({
  key: 'comboBannerDialog',
  default: false
})
export const comboCheckInStatusState = atom<IStatus>({
  key: 'comboCheckInStatus',
  default: {
    canCheckin: true,
    canClaim: false,
    checked: [],
    claimedAt: '0',
    isClaimed: false
  }
})
