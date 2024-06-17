import { ChainId, TVLStakingSupportedChainId } from '@ui/src'
import React, { memo } from 'react'

import PixelTooltip from '@/pages/Active/components/PixelTooltip/PixelTooltip'
import StakingBtn from '@/pages/Active/components/StakingBtn/StakingBtn'

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
    return (
      <>
        <div className={css.tab_col}>
          <ChainTab chainIndex={chainIndex} changeChainIndexHandle={changeChainIndexHandle} />
          <StakingBtn chainId={chainIdLocal} />
        </div>
        {TVLStakingSupportedChainId[chainIndex] === ChainId.LineaTestnet || TVLStakingSupportedChainId[chainIndex] === ChainId.LineaMainnet ? (
          <div className={css.warn_tab_tooltip}>
            <p>
              Earn Linea XP
              <PixelTooltip
                title={['What is Linea Voyage XP? ']}
                showLink="https://docs.linea.build/users/linea-voyage/lxp#what-is-linea-voyage-xp"
              />
              by staking! And Linea’s airdrop expectations!
            </p>
          </div>
        ) : (
          <></>
        )}
      </>
    )
  }
)
export default StakingTab
