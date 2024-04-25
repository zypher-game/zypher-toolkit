import { ActivePixelButtonColor } from '@UI/src/'
import React, { memo } from 'react'

import { useToPath } from '@/pages/Active/hooks/useToPath'

import ActiveComp from '../../../components/ActiveComp/ActiveComp'
import GetAirdropWrap from '../components/GetAirdropWrap/GetAirdropWrap'
import css from './MoreActiveNormal.module.styl'
const MoreActiveNormal = memo(() => {
  const { keepGoingHandle } = useToPath()

  return (
    <ActiveComp>
      <GetAirdropWrap>
        <ActivePixelButtonColor width="206px" height="52px" className={css.verify} onClick={keepGoingHandle} pixel_height={5}>
          <p>Keep Going</p>
        </ActivePixelButtonColor>
      </GetAirdropWrap>
    </ActiveComp>
  )
})
export default MoreActiveNormal
