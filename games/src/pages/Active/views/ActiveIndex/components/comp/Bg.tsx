import { isEqual } from 'lodash'
import React, { memo } from 'react'

import css from './Bg.module.styl'
const Bg = memo(({ src }: { src: string }) => {
  return <img src={src} className={css.bg} />
}, isEqual)
export default Bg
