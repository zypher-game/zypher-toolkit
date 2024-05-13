import { ActivePixelButtonColor, ChainName, PixelCube2, useSetRecoilState } from '@ui/src'
import React, { memo, useCallback } from 'react'

import { TVLStakingSupportedChainId } from '@/pages/Active/constants/activeConstants'
import { tvlStakingDialogState } from '@/pages/Active/state/activeState'

import css from './StakingTab.module.styl'
const StakingTab = memo(({ chainIndex, changeChainIndexHandle }: { chainIndex: number; changeChainIndexHandle: (index: number) => void }) => {
  const setIsTvlStakingDialogOpen = useSetRecoilState(tvlStakingDialogState)
  const showStakingHandle = useCallback(() => {
    setIsTvlStakingDialogOpen(true)
  }, [])
  return (
    <div className={css.tab_col}>
      <PixelCube2 className={css.ActiveTVLStaking_tab} pixel_height={2} height="32px" backgroundColor="#1D263B" borderColor="#1649FF">
        {TVLStakingSupportedChainId.map((v, index) => (
          <div
            className={`${css.ActiveTVLStaking_tab_li} ${index === chainIndex ? css.on : ''}`}
            key={v}
            onClick={() => changeChainIndexHandle(index)}
          >
            <p>{ChainName[v]}</p>
          </div>
        ))}
      </PixelCube2>
      <ActivePixelButtonColor
        className={css.staking}
        width="110px"
        height="32px"
        pixel_height={2}
        borderBottomColor="#D99716"
        borderTopColor="#FFE99A"
        backgroundColor="#FFD02B"
        onClick={showStakingHandle}
      >
        <p>Stake</p>
      </ActivePixelButtonColor>
    </div>
  )
})
export default StakingTab
