import React, { memo } from 'react'

import ShareLink from '@/pages/Active/components/ShareLink/ShareLink'
import { useToPath } from '@/pages/Active/hooks/useToPath'

import ActiveComp from '../../../components/ActiveComp/ActiveComp'
import GetAirdropWrap from '../components/GetAirdropWrap/GetAirdropWrap'
import css from './MoreActive.module.styl'
const MoreActive = memo(() => {
  const { keepGoingHandle } = useToPath()

  return (
    <ActiveComp>
      <GetAirdropWrap>
        <ShareLink
          css={css}
          pixel_styled={{
            pixel_height: 5,
            height: '52px',
            themeType: 'brightBlue'
          }}
          preWidth={'360px'}
          nextWidth={'206px'}
        />
        <div className={css.linkA} onClick={keepGoingHandle}>
          <p>Keep Going</p>
        </div>
      </GetAirdropWrap>
    </ActiveComp>
  )
})
export default MoreActive
