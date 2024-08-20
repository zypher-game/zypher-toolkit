import { preStaticUrl, SvgComponent } from '@ui/src'
import React, { memo } from 'react'

import css from './Checking.module.styl'
const Checking = memo(() => {
  return (
    <div className={css.checking}>
      <p>Please stand by while we verify your media account and wallet. This might take a few seconds.</p>
      <SvgComponent className={`animation_rotate ${css.loading}`} src={preStaticUrl + '/img/icon/pixel_loading_color.svg'} />
    </div>
  )
})
export default Checking
