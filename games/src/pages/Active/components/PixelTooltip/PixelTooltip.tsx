import './PixelTooltip.styl'

import { ActivePixelCard, PixelBorderCard, PixelCube2, preStaticUrl, SvgComponent } from '@ui/src'
import { Tooltip } from 'antd'
import React, { memo } from 'react'

const PixelTooltip = memo(({ title, showLink, children }: { title: string[]; showLink?: string; children?: React.ReactNode }) => {
  return (
    <Tooltip
      // open={false}
      showArrow={false}
      title={
        <ActivePixelCard pixel_height={4} backgroundColor="#1649FF">
          <div className="pixel_tooltip_text">
            {title.map((v, index) => (
              <p key={index}>{v}</p>
            ))}
            {showLink ? (
              <a href={showLink} className="pixel_tooltip_link" target="_blank" rel="noreferrer">
                Learn more
              </a>
            ) : null}
          </div>
          <ActivePixelCard pixel_height={4} backgroundColor="#1649FF" width="16px" height="16px" className="pixel_tooltip_arrow" />
        </ActivePixelCard>
      }
    >
      {children ?? <SvgComponent src={preStaticUrl + '/img/icon/pixel_warn.svg'} className="tooltip_pixel_warn" />}
    </Tooltip>
  )
})

export const PixelCube2Tooltip = memo(({ title, showLink, children }: { title: string[]; showLink?: string; children?: React.ReactNode }) => {
  return (
    <Tooltip
      // open={true}
      showArrow={false}
      title={
        <PixelCube2 pixel_height={3} backgroundColor="#1D263B" borderColor="#fff">
          <div className="pixel_tooltip_text">
            {title.map((v, index) => (
              <p key={index} className={'bold'}>
                {v}
              </p>
            ))}
            {showLink ? (
              <a href={showLink} className="pixel_tooltip_link" target="_blank" rel="noreferrer">
                Learn more
              </a>
            ) : null}
          </div>
          <PixelBorderCard
            pixel_height={3}
            backgroundColor="#1D263B"
            borderColor="#fff"
            width="15px"
            height="15px"
            className="pixel_tooltip_cube_arrow"
          />
        </PixelCube2>
      }
    >
      {children ?? <SvgComponent src={preStaticUrl + '/img/icon/pixel_warn.svg'} className="tooltip_pixel_warn" />}
    </Tooltip>
  )
})
export default PixelTooltip
