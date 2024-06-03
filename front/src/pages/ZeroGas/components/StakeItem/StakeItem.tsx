import { preStaticUrl, SvgComponent } from '@ui/src'
import React, { memo } from 'react'

import css from './StakeItem.module.styl'

export type IStakeItem = {
  stake: string
  mintMinimum: string
  currency: string
  isOk: boolean
}

const StakeItem = memo(({ item }: { item: IStakeItem }) => {
  return (
    <div className={css.stakeItem}>
      <div className={css.stakingText}>
        <p>
          {item.stake ?? '-'}/{item.mintMinimum ?? '-'}
        </p>
        {item.isOk ? <SvgComponent src={preStaticUrl + '/img/icon/pixel_success.svg'} /> : null}
      </div>
      <p className={css.grey}>{item.currency}</p>
    </div>
  )
})
export default StakeItem
