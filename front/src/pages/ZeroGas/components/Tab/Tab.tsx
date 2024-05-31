import { ChainId, ChainName, PixelTab, TVLStakingSupportedChainId, useIsW768 } from '@ui/src'
import React, { memo } from 'react'
import { SetterOrUpdater } from 'recoil'

const Tab = memo(({ chainIdLocal, onClick }: { chainIdLocal: ChainId; onClick: SetterOrUpdater<number> }) => {
  const isW768 = useIsW768()
  return (
    <PixelTab
      hidePixel={isW768 ? true : false}
      tabList={TVLStakingSupportedChainId.map((chainIDParams, index) => ({
        label: ChainName[chainIDParams],
        on: chainIDParams === chainIdLocal,
        onClick: () => onClick(index)
      }))}
      height="40px"
      pixel_height={4}
      classNames={isW768 ? 'active_tab_m' : 'pixel_active_tab'}
    />
  )
})
export default Tab
