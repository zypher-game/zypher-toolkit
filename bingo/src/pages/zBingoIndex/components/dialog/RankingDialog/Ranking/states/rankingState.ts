import { atom } from '@zypher-game/toolkit/ui'
import { localStorageEffect } from '@zypher-game/toolkit/ui'

import { IPlayerRankingItem } from '../Ranking'

export const RankingListState = atom<IPlayerRankingItem[]>({
  key: 'RankingListState1',
  default: [],
  effects_UNSTABLE: [localStorageEffect('RankingListState1')]
})
