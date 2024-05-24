import './PixelTooltip.styl'

import { ActivePixelCard, preStaticUrl, SvgComponent } from '@ui/src'
import { Tooltip } from 'antd'
import React, { memo } from 'react'

const PixelTooltip = memo(({ title, showLink }: { title: string[]; showLink?: string }) => {
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
      <SvgComponent src={preStaticUrl + '/img/icon/pixel_warn.svg'} />
    </Tooltip>
  )
})
export default PixelTooltip
