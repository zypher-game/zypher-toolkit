import { ActivePixelButtonColor, useIsW768 } from '@ui/src'
import React, { memo } from 'react'

import { useToPath } from '@/pages/Active/hooks/useToPath'

import ActiveComp from '../../../components/ActiveComp/ActiveComp'
import GetRewardWrap from '../components/GetRewardWrap/GetRewardWrap'
import css from './MoreActiveNormal.module.styl'
const MoreActiveNormal = memo(() => {
  const { keepGoingHandle } = useToPath()
  const isW768 = useIsW768()
  return (
    <ActiveComp>
      <GetRewardWrap>
        <ActivePixelButtonColor
          themeType="brightBlue"
          width={isW768 ? '100%' : '206px'}
          height={isW768 ? '48px' : '52px'}
          className={css.verify}
          onClick={keepGoingHandle}
          pixel_height={5}
        >
          <p>Keep Going</p>
        </ActivePixelButtonColor>
      </GetRewardWrap>
    </ActiveComp>
  )
})
export default MoreActiveNormal
