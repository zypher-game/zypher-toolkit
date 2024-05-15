import './PixelTooltip.styl'

import { ActivePixelCard, preStaticUrl, SvgComponent } from '@ui/src'
import { Tooltip } from 'antd'
import React, { memo } from 'react'

const PixelTooltip = memo(({ title }: { title: string[] }) => {
  return (
    <Tooltip
      // open={true}
      showArrow={false}
      title={
        <ActivePixelCard pixel_height={4} backgroundColor="#1649FF">
          <div className="pixel_tooltip_text">
            {title.map((v, index) => (
              <p key={index}>{v}</p>
            ))}
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
