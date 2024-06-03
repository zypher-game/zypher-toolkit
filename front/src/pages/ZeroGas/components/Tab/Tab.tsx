import { ChainId, ChainName, PixelTab, preStaticUrl, TVLChainId, TVLStakingSupportedChainId, useIsW768 } from '@ui/src'
import React, { memo } from 'react'
import { SetterOrUpdater } from 'recoil'

import { Theme } from '../../ZeroGas'
import css from './Tab.module.styl'
const Tab = memo(({ chainIdLocal, onClick }: { chainIdLocal: ChainId; onClick: SetterOrUpdater<number> }) => {
  const isW768 = useIsW768()
  return (
    <PixelTab
      themeType={isW768 ? 'pureBrightBlue' : 'brightBlue'}
      tabList={TVLStakingSupportedChainId.map((chainIDParams, index) => ({
        label: isW768 ? undefined : ChainName[chainIDParams],
        logo: isW768 ? `${preStaticUrl}/img/zeroGas/${Theme[chainIDParams as unknown as TVLChainId]}_logo.png` : undefined,
        on: chainIDParams === chainIdLocal,
        onClick: () => onClick(index)
      }))}
      height="40px"
      pixel_height={4}
      classNames={isW768 ? css.tab_m : 'pixel_active_tab'}
    />
  )
})
export default Tab
