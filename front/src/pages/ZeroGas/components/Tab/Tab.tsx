import { ChainId, ChainName, PixelCube2, PixelTab, preStaticUrl, SvgComponent, TVLChainId, TVLStakingSupportedChainId, useIsW768 } from '@ui/src'
import React, { memo, useMemo } from 'react'
import { SetterOrUpdater } from 'recoil'

import { Theme } from '../../ZeroGas'
import css from './Tab.module.styl'
const Tab = memo(({ chainIdLocal, onClick }: { chainIdLocal: ChainId; onClick: SetterOrUpdater<number> }) => {
  const isW768 = useIsW768()
  const list = useMemo(() => {
    return TVLStakingSupportedChainId.map((chainIDParams, index) => ({
      label: isW768 ? undefined : ChainName[chainIDParams],
      logo: isW768 ? `${preStaticUrl}/img/zeroGas/${Theme[chainIDParams as unknown as TVLChainId]}_logo.png` : undefined,
      on: chainIDParams === chainIdLocal,
      onClick: () => onClick(index)
    }))
  }, [])
  if (isW768) {
    return (
      <PixelCube2 className={css.ActiveTVLStaking_tab} pixel_height={2} height="32px" backgroundColor="#1D263B" borderColor="#1649FF">
        {list.map((v, index) => (
          <div className={`${css.ActiveTVLStaking_tab_li} ${v.on ? css.on : ''}`} key={v.label} onClick={() => onClick(index)}>
            <SvgComponent src={v.logo} />
          </div>
        ))}
      </PixelCube2>
    )
  }

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
