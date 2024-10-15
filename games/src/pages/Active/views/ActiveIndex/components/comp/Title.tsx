import { isEqual } from 'lodash'
import React, { memo } from 'react'

import css from './Title.module.styl'
const Title = memo(({ label }: { label: string }) => {
  return (
    <div className={css.title}>
      <h2 className={css.title_text}>{label}</h2>
      <h2 className={css.shadow}>{label}</h2>
    </div>
  )
}, isEqual)
export default Title
