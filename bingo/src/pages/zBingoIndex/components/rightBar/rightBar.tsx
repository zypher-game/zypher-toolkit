import { useIsTelegram } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo } from 'react'

import SoundEffectSwitch from '@/components/Sound/SoundEffectSwitch'

import QuestionIcon from '../icon/QuestionIcon'
import css from './rightBar.module.stylus'
const RightBar = memo(() => {
  const IS_TELEGRAM = useIsTelegram()
  return (
    <div className={`${css.rightBar} ${IS_TELEGRAM ? css.tgRightBar : ''}`}>
      <SoundEffectSwitch />
      <QuestionIcon />
    </div>
  )
}, isEqual)
export default RightBar
