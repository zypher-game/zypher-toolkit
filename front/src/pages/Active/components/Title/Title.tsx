import { ChainId, defaultActiveChainId, tvlTokenAddress, useActiveWeb3React } from '@ui/src'
import React, { memo, useMemo } from 'react'

import PixelTooltip from '../PixelTooltip/PixelTooltip'
import css from './Title.module.styl'
export const useDefaultChainId = (): ChainId => {
  const { chainId } = useActiveWeb3React()
  return useMemo(() => {
    if (!chainId) {
      return defaultActiveChainId
    }
    return chainId
  }, [chainId])
}
export const Title = memo(({ label, tooltip }: { label: string; tooltip: string[] }) => {
  return (
    <div className={css.title}>
      <h3>{label}</h3>
      <PixelTooltip title={tooltip} />
    </div>
  )
})
export const StakingTitle = memo(() => {
  const chainId = useDefaultChainId()
  const stakingStr = useMemo(() => {
    return Object.keys(tvlTokenAddress[chainId]).join(', ')
  }, [chainId])
  return <Title label="Staked" tooltip={[`Your total pledge amount, including ${stakingStr} etc.`]} />
})