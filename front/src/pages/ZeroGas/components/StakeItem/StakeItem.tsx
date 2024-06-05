import { preStaticUrl, SvgComponent } from '@ui/src'
import React, { memo } from 'react'

import css from './StakeItem.module.styl'

export type IStakeItem = {
  stake: string
  mintMinimumStr: string
  currency: string
  isOk: boolean
}

const StakeItem = memo(({ item }: { item: IStakeItem }) => {
  return (
    <div className={css.stakeItem}>
      <div className={css.stakingText}>
        <p>
          {item.stake ?? '-'}/{item.mintMinimumStr ?? '-'}
        </p>
        {item.isOk ? <SvgComponent src={preStaticUrl + '/img/icon/pixel_success.svg'} /> : null}
      </div>
      <p className={css.grey}>{item.currency}</p>
    </div>
  )
})
export default StakeItem
