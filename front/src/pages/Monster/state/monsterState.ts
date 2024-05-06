import { atom, localStorageEffect } from '@ui/src'

// checkInDialog
export const checkInDialogState = atom({
  key: 'checkInDialog',
  default: false,
  effects_UNSTABLE: [localStorageEffect('checkInDialog')]
})

export const buyBattlePassDialogState = atom({
  key: 'buyBattlePassDialogState',
  default: false,
  effects_UNSTABLE: [localStorageEffect('buyBattlePassDialogState')]
})

// Receive award
export const receiveAwardDialogState = atom({
  key: 'receiveAwardDialog',
  default: false,
  effects_UNSTABLE: [localStorageEffect('receiveAwardDialog')]
})
export const receiveNftDialogState = atom({
  key: 'receiveNftDialog',
  default: false
})

// nft token id
export const tokenIdState = atom<string | undefined>({
  key: 'tokenIdState',
  default: undefined
})
export const Rule1DialogState = atom({
  key: 'Rule1Dialog',
  default: false
})
export const Rule2DialogState = atom({
  key: 'Rule2Dialog',
  default: false
})

export const refreshMonsterState = atom({
  key: 'refreshMonsterState',
  default: '0'
})
