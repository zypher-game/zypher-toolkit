import { preStaticUrl } from '@ui/src'
import React, { memo } from 'react'

const TgPointImg = memo(({ className }: { className?: string }) => {
  return <img decoding="async" loading="lazy" src={preStaticUrl + '/img/bingo/tg_point.png'} className={className ?? ''} alt="point" />
})
export default TgPointImg
