import React, { memo } from 'react'

import { useToPath } from '@/pages/Active/hooks/useToPath'

import ActiveComp from '../../../components/ActiveComp/ActiveComp'
import GetRewardWrap from '../components/GetRewardWrap/GetRewardWrap'
import css from './MoreActive.module.styl'
const MoreActive = memo(() => {
  const { keepGoingHandle } = useToPath()
  // const isW768 = useIsW768()

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
          <div className={css.linkA} onClick={keepGoingHandle}>
            <p>Keep Going</p>
          </div>
        </div>
      </GetRewardWrap>
    </ActiveComp>
  )
})
export default MoreActive
