import { atom } from '@ui/src'
import { localStorageEffect } from '@ui/src'

import { IPlayerRankingItem } from '../Ranking'

export const RankingListState = atom<IPlayerRankingItem[]>({
  key: 'RankingListState1',
  default: [],
  effects_UNSTABLE: [localStorageEffect('RankingListState1')]
})
