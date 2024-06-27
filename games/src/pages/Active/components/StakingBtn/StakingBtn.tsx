import { ActivePixelButtonColor, ChainId, preStaticUrl, useIsW768 } from '@ui/src'
import React, { memo, useCallback } from 'react'

import { useTvlStakingDialogState } from '../../hooks/useTvlStakingDialogState'
import css from './StakingBtn.module.styl'
const StakingBtn = memo(({ chainId }: { chainId: ChainId }) => {
  const setTvlStakingDialog = useTvlStakingDialogState()
  const showStakingHandle = useCallback(() => {
    setTvlStakingDialog(chainId, true)
  }, [chainId, setTvlStakingDialog])
  const isW768 = useIsW768()
  return (
    <ActivePixelButtonColor
      themeType="yellow"
      className={css.staking}
      width={isW768 ? '56px' : '110px'}
      height={isW768 ? '56px' : '32px'}
      pixel_height={2}
      onClick={showStakingHandle}
    >
      {isW768 ? (
        <img decoding="async" loading="lazy" src={preStaticUrl + '/img/tvl/staking_icon.svg'} alt="staking" className={css.stakingImg} />
      ) : null}
      <p>Stake</p>
    </ActivePixelButtonColor>
  )
})
export default StakingBtn
