import { ActivePixelButtonColor, ChainId, preStaticUrl, TVLStakingSupportedChainId, useIsW768, useSetRecoilState } from '@ui/src'
import React, { memo, useCallback } from 'react'

import PixelTooltip from '@/pages/Active/components/PixelTooltip/PixelTooltip'
import { useTvlStakingDialogState } from '@/pages/Active/hooks/useTvlStakingDialogState'

import ChainTab from '../../../../components/ChainTab/ChainTab'
import css from './StakingTab.module.styl'
const StakingTab = memo(
  ({
    chainIdLocal,
    chainIndex,
    changeChainIndexHandle
  }: {
    chainIdLocal: ChainId
    chainIndex: number
    changeChainIndexHandle: (index: number) => void
  }) => {
    const setTvlStakingDialog = useTvlStakingDialogState()

    const showStakingHandle = useCallback(() => {
      setTvlStakingDialog(chainIdLocal, true)
    }, [chainIdLocal])
    const isW768 = useIsW768()
    return (
      <>
        <div className={css.tab_col}>
          <ChainTab chainIndex={chainIndex} changeChainIndexHandle={changeChainIndexHandle} />
          <ActivePixelButtonColor
            themeType="yellow"
            className={css.staking}
            width={isW768 ? '56px' : '110px'}
            height={isW768 ? '56px' : '32px'}
            pixel_height={2}
            onClick={showStakingHandle}
          >
            {isW768 ? <img src={preStaticUrl + '/img/tvl/staking_icon.svg'} alt="staking" className={css.stakingImg} /> : null}
            <p>Stake</p>
          </ActivePixelButtonColor>
        </div>
        {TVLStakingSupportedChainId[chainIndex] === ChainId.LineaTestnet || TVLStakingSupportedChainId[chainIndex] === ChainId.LineaMainnet ? (
          <div className={css.warn_tab_tooltip}>
            <p>Earn Linea XP</p>
            <PixelTooltip title={['What is Linea Voyage XP? ']} showLink="https://docs.linea.build/users/linea-voyage/lxp#what-is-linea-voyage-xp" />
            <p>by staking! And Linea’s airdrop expectations!</p>
          </div>
        ) : (
          <></>
        )}
      </>
    )
  }
)
export default StakingTab
