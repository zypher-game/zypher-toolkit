import { isEqual } from 'lodash'
import React, { memo } from 'react'

import SoundEffectSwitch from '@/components/Sound/SoundEffectSwitch'

import QuestionIcon from '../icon/QuestionIcon'
import css from './rightBar.module.stylus'
const RightBar = memo(() => {
  return (
    <div className={css.rightBar}>
      <SoundEffectSwitch />
      <QuestionIcon />
    </div>
  )
}, isEqual)
export default RightBar
