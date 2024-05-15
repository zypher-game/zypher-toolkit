import { ChainName, PixelCube2 } from '@ui/src'
import React, { memo } from 'react'

import { TVLStakingSupportedChainId } from '@/pages/Active/constants/activeConstants'

import css from './ChainTab.module.styl'
const ChainTab = memo(({ chainIndex, changeChainIndexHandle }: { chainIndex: number; changeChainIndexHandle: (index: number) => void }) => {
  return (
    <PixelCube2 className={css.ActiveTVLStaking_tab} pixel_height={2} height="32px" backgroundColor="#1D263B" borderColor="#1649FF">
      {TVLStakingSupportedChainId.map((v, index) => (
        <div className={`${css.ActiveTVLStaking_tab_li} ${index === chainIndex ? css.on : ''}`} key={v} onClick={() => changeChainIndexHandle(index)}>
          <p>{ChainName[v]}</p>
        </div>
      ))}
    </PixelCube2>
  )
})
export default ChainTab
