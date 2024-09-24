import { isEqual } from 'lodash'
import React, { FC, memo } from 'react'

import css from './rankingB3My.module.stylus'
import { IRankingItemProps, RankingItem } from './rankingB3Table'
const RankingB3My: FC<IRankingItemProps> = memo((props: IRankingItemProps) => {
  return (
    <div className={`${css.rank_my} ${css.rank_my_b3}`}>
      <RankingItem {...props} className={css.rank_my_item} otherStr={'(YOU)'} />
    </div>
  )
}, isEqual)

export default RankingB3My
