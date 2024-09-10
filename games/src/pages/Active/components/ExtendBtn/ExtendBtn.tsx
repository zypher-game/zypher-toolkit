import { ActivePixelButtonColor, ChainId, preStaticUrl, useIsW768 } from '@ui/src'
import React, { memo, useCallback } from 'react'

import { useTvlStakingDialogState } from '../../hooks/useTvlStakingDialogState'
import css from '../StakingBtn/StakingBtn.module.styl'
const ExtendBtn = memo(({ chainId }: { chainId: ChainId }) => {
  const setIsStakingOpenHandle = useTvlStakingDialogState()
  const showStakingHandle = useCallback(() => {
    setIsStakingOpenHandle({ key: 'tvlExtendDialogState', chainId, isOpen: true })
  }, [chainId, setIsStakingOpenHandle])
  const isW768 = useIsW768()
  return (
    <ActivePixelButtonColor
      themeType="yellow"
      className={`${css.btn} ${css.staking} ${css.extend}`}
      width={isW768 ? '70px' : '110px'}
      height={isW768 ? '62px' : '32px'}
      pixel_height={2}
      onClick={showStakingHandle}
    >
      {isW768 ? (
        <img decoding="async" loading="lazy" src={preStaticUrl + '/img/tvl/staking_icon.svg'} alt="staking" className={css.stakingImg} />
      ) : null}
      <p>Extend</p>
    </ActivePixelButtonColor>
  )
})
export default ExtendBtn
