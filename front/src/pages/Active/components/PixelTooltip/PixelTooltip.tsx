import './PixelTooltip.styl'

import { ActivePixelCard, preStaticUrl, SvgComponent } from '@UI/src/'
import { Tooltip } from 'antd'
import React, { memo } from 'react'

const PixelTooltip = memo(({ title }: { title: string }) => {
  return (
    <Tooltip
      showArrow={false}
      title={
        <ActivePixelCard pixel_height={4} backgroundColor="#1649FF">
          <p className="pixel_tooltip_text">{title}</p>
          <ActivePixelCard pixel_height={4} backgroundColor="#1649FF" width="16px" height="16px" className="pixel_tooltip_arrow">
            <></>
          </ActivePixelCard>
        </ActivePixelCard>
      }
    >
      <SvgComponent src={preStaticUrl + '/img/icon/pixel_question.svg'} />
    </Tooltip>
  )
})
export default PixelTooltip
