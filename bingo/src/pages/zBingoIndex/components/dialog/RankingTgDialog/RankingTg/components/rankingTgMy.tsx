import { isEqual } from 'lodash'
import React, { FC, memo } from 'react'

import css from '../../../RankingDialog/Ranking/components/rankingMy.module.stylus'
import { IRankingItemProps, RankingItem } from './rankingTgTable'
const RankingTgMy: FC<IRankingItemProps> = memo((props: IRankingItemProps) => {
  return (
    <div className={css.rank_my}>
      <RankingItem {...props} className={css.rank_my_item} otherStr={'(YOU)'} />
    </div>
  )
}, isEqual)

export default RankingTgMy
