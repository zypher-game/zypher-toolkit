import { atom, IGameList, localStorageEffect } from '@ui/src'

import { I2048GameList } from '@/pages/GamesIndex/hook/useRecentZ2048FromContract'

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
