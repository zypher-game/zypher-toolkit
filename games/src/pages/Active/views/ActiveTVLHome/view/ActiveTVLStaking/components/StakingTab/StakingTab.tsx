import { BigNumberJs, ChainId, Currency, TVLStakingSupportedChainId, useRecoilValue } from '@ui/src'
import React, { memo, useMemo } from 'react'

import ExtendBtn from '@/pages/Active/components/ExtendBtn/ExtendBtn'
import PixelTooltip from '@/pages/Active/components/PixelTooltip/PixelTooltip'
import RedepositBtn from '@/pages/Active/components/RedepositBtn/RedepositBtn'
import StakingBtn from '@/pages/Active/components/StakingBtn/StakingBtn'
import WithdrawBtn from '@/pages/Active/components/WithdrawBtn/WithdrawBtn'
import { tvlStakingDataState } from '@/pages/Active/state/activeState'

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
    const tvlStakingData = useRecoilValue(tvlStakingDataState)
    const isEnd = useMemo(() => {
      try {
        const now = parseInt(`${new Date().valueOf() / 1000}`)
        const END_TIME = tvlStakingData[chainIdLocal][Currency[chainIdLocal]].END_TIME
        if (END_TIME && new BigNumberJs(END_TIME).lt(now)) {
          return true
        }
        return false
      } catch (e) {
        return false
      }
    }, [JSON.stringify(tvlStakingData)])
    return (
      <>
        <div className={css.tab_col}>
          <ChainTab chainIndex={chainIndex} changeChainIndexHandle={changeChainIndexHandle} />
          <div className={css.tab_func_col}>
            {isEnd ? null : <StakingBtn chainId={chainIdLocal} />}
            {isEnd ? (
              <>
                <WithdrawBtn chainId={chainIdLocal} />
                <ExtendBtn chainId={chainIdLocal} />
                <RedepositBtn chainId={chainIdLocal} />
              </>
            ) : null}
          </div>
        </div>
        {TVLStakingSupportedChainId[chainIndex] === ChainId.LineaSepolia || TVLStakingSupportedChainId[chainIndex] === ChainId.LineaMainnet ? (
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
