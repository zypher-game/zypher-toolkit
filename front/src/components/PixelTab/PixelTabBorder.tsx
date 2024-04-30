import './PixelTabBorder.styl'

import { PixelCube2 } from '@UI/src/'
import React, { memo } from 'react'

const PixelTabBorder = memo(
  ({
    className,
    tabList,
    height,
    pixel_height
  }: {
    className: string
    tabList: {
      label: string
      on: boolean
      onClick: any
    }[]
    height: string
    pixel_height: number
  }) => {
    return (
      <PixelCube2
        className={`ActiveTVLStaking_tab ${className ?? ''}`}
        pixel_height={pixel_height}
        height={height}
        backgroundColor="#1D263B"
        borderColor="#1649FF"
      >
        {tabList.map((v, index) => (
          <div className={`ActiveTVLStaking_tab_li ${v.on ? 'on' : ''}`} key={v.label} onClick={v.onClick}>
            <p>{v.label}</p>
          </div>
        ))}
      </PixelCube2>
    )
  }
)
export default PixelTabBorder
