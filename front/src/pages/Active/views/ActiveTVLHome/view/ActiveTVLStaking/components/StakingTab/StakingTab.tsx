import { ActivePixelButtonColor, ChainId, ChainName, PixelCube2, supportedChainIds, useSetRecoilState } from '@ui/src'
import React, { memo, useCallback } from 'react'

import PixelTooltip from '@/pages/Active/components/PixelTooltip/PixelTooltip'
import { TVLStakingSupportedChainId } from '@/pages/Active/constants/activeConstants'
import { tvlStakingDialogState } from '@/pages/Active/state/activeState'

import ChainTab from '../../../../components/ChainTab/ChainTab'
import css from './StakingTab.module.styl'
const StakingTab = memo(({ chainIndex, changeChainIndexHandle }: { chainIndex: number; changeChainIndexHandle: (index: number) => void }) => {
  const setIsTvlStakingDialogOpen = useSetRecoilState(tvlStakingDialogState)
  const showStakingHandle = useCallback(() => {
    setIsTvlStakingDialogOpen(true)
  }, [])
  return (
    <>
      <div className={css.tab_col}>
        <ChainTab chainIndex={chainIndex} changeChainIndexHandle={changeChainIndexHandle} />
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
      {TVLStakingSupportedChainId[chainIndex] === ChainId.LineaTestnet || TVLStakingSupportedChainId[chainIndex] === ChainId.LineaMainnet ? (
        <div className={css.warn_tab_tooltip}>
          <p>Earn Linea XP</p>
          <PixelTooltip title={'sdfadf'} />
          <p>by staking! And Linea’s airdrop expectations!</p>
        </div>
      ) : (
        <></>
      )}
    </>
  )
})
export default StakingTab
