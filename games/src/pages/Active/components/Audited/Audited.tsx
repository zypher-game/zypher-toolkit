import { PixelBorderCard, preStaticUrl } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo, useCallback } from 'react'

import css from './Audited.module.styl'
const Audited = memo(() => {
  const open = useCallback(() => {
    window.open('https://drive.google.com/file/d/1G3O1UexA7rliX28lKF614OgSblnNv021/view?usp=sharing')
  }, [])
  return (
    <PixelBorderCard className={css.audited} pixel_height={7} backgroundColor="#0d1425" borderColor="#3A4254" onClick={open}>
      <img src={preStaticUrl + '/img/tvl/Audited.png'} className={css.img} />
    </PixelBorderCard>
  )
}, isEqual)
export default Audited
