import { preStaticUrl, SvgComponent } from '@ui/src'
import React, { memo } from 'react'

import css from './Checking.module.styl'
const Checking = memo(() => {
  return (
    <div className={css.checking}>
      <p>Checking the airdrop status of your media account and wallet, please wait...</p>
      <SvgComponent className={`animation_rotate ${css.loading}`} src={preStaticUrl + '/img/icon/pixel_loading_color.svg'} />
    </div>
  )
})
export default Checking
