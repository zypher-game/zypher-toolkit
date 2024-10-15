import { isEqual } from 'lodash'
import React, { memo } from 'react'

import css from './TextLabel.module.styl'
const TextLabel = memo(({ className, label }: { className: string; label: string }) => {
  return (
    <div className={`${css.label} ${className ?? ''}`}>
      <p className={css.cover}>{label}</p>
      <p className={css.shadow}>{label}</p>
    </div>
  )
}, isEqual)
export default TextLabel
