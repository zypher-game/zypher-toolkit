import { atom, IGameList } from '@UI/src/'

import { I2048GameList } from '@/pages/GamesIndex/hook/useRecentZ2048FromContract'

export const levelRuleDialogState = atom({
  key: 'levelRuleDialog',
  default: false
  // effects_UNSTABLE: [localStorageEffect('levelRuleDialog')]
})

export const monsterNftRuleDialogState = atom({
  key: 'monsterNftRuleDialog',
  default: false
  // effects_UNSTABLE: [localStorageEffect('monsterNftRuleDialog')]
})
export const profileBingoHistoryListState = atom<IGameList[]>({
  key: 'profileBingoHistoryListState',
  default: []
  // effects_UNSTABLE: [localStorageEffect('profileBingoHistoryListState')]
})
export const profileZ2048HistoryListState = atom<I2048GameList[]>({
  key: 'profileZ2048HistoryListState',
  default: []
  // effects_UNSTABLE: [localStorageEffect('profileZ2048HistoryListState')]
})
