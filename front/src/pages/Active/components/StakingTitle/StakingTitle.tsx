import { tvlTokenAddress, useActiveWeb3React } from '@ui/src'
import React, { memo, useMemo } from 'react'

import PixelTooltip from '../PixelTooltip/PixelTooltip'
import css from './StakingTitle.module.styl'
const StakingTitle = memo(() => {
  const { chainId } = useActiveWeb3React()
  const stakingStr = useMemo(() => {
    return Object.keys(tvlTokenAddress[chainId]).join(', ')
  }, [chainId])
  return (
    <div className={css.title}>
      <h3>Staked</h3>
      <PixelTooltip title={[`Your total pledge amount, including ${stakingStr} etc.`]} />
    </div>
  )
})
export default StakingTitle
