import { ActivePixelButtonColor, useIsW768 } from '@ui/src'
import React, { memo } from 'react'

import { useToPath } from '@/pages/Active/hooks/useToPath'

import ActiveComp from '../../../components/ActiveComp/ActiveComp'
import GetRewardWrap from '../components/GetRewardWrap/GetRewardWrap'
import css from './MoreActive.module.styl'
const MoreActive = memo(() => {
  const { keepGoingHandle } = useToPath()
  const isW768 = useIsW768()

  return (
    <ActiveComp>
      <GetRewardWrap>
        <div>
          {/* <ShareLink
            css={css}
            pixel_styled={{
              pixel_height: 5,
              height: isW768 ? '54px' : '52px',
              themeType: 'brightBlue'
            }}
            preWidth={isW768 ? '79%' : '360px'}
          /> */}
          <ActivePixelButtonColor
            themeType="brightBlue"
            width={isW768 ? '100%' : '200px'}
            onClick={keepGoingHandle}
            height="52px"
            pixel_height={4}
            className={css.linkA}
          >
            <p>Keep Going</p>
          </ActivePixelButtonColor>
          {/* < className={css.linkA} onClick={keepGoingHandle}> */}
        </div>
      </GetRewardWrap>
    </ActiveComp>
  )
})
export default MoreActive
