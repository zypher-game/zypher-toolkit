import { atom } from '@UI/src/'
import { localStorageEffect } from '@UI/src/'

import { IPlayerRankingItem } from '../Ranking'

export const RankingListState = atom<IPlayerRankingItem[]>({
  key: 'RankingListState1',
  default: [],
  effects_UNSTABLE: [localStorageEffect('RankingListState1')]
})
