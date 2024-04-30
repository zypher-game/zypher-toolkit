import './PixelTab.styl'

import { ActivePixelButton, ActivePixelButtonColor } from '@UI/src/'
import React, { memo } from 'react'

const PixelTab = memo(
  ({
    tabList,
    height,
    pixel_height
  }: {
    tabList: {
      label: string
      on: boolean
      onClick: any
    }[]
    height: string
    pixel_height: number
  }) => {
    return (
      <ul className="pixe_active_tvl_tab">
        {tabList.map((v, index) => (
          <PixelTabLiItem onClick={v.onClick} key={v.label} on={v.on} index={index} label={v.label} height={height} pixel_height={pixel_height} />
        ))}
      </ul>
    )
  }
)
const PixelTabLiItem = memo(
  ({
    onClick,
    on,
    index,
    label,
    height,
    pixel_height
  }: {
    onClick: any
    on: boolean
    index: number
    label: string
    height: string
    pixel_height: number
  }) => {
    if (on) {
      return (
        <li>
          <ActivePixelButtonColor height={height} pixel_height={pixel_height} className="active_tvl_tab_on">
            <p>{label}</p>
          </ActivePixelButtonColor>
        </li>
      )
    }
    return (
      <li>
        <ActivePixelButton height={height} pixel_height={pixel_height} backgroundColor="#1D263B" className="active_tvl_tab" onClick={onClick}>
          <p>{label}</p>
        </ActivePixelButton>
      </li>
    )
  }
)
export default PixelTab
