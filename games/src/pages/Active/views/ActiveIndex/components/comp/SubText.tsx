import { isEqual } from 'lodash'
import React, { memo } from 'react'

import css from './SubText.module.styl'
const SubText = memo(({ label }: { label: string }) => {
  return <p className={css.subText}>{label}</p>
}, isEqual)
export default SubText
