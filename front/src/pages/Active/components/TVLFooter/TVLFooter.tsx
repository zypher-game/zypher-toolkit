import { CommunityLink, useIsW768 } from '@ui/src'
import React, { memo } from 'react'

import css from './TVLFooter.module.styl'
const TVLFooter = memo(() => {
  const isW768 = useIsW768()
  return isW768 ? null : (
    <div className={css.TVLFooter}>
      <CommunityLink className={css.communityLink} />
      {/* <p className={css.text}>TVL ｜ 2,356,789.2345 ETH</p> */}
    </div>
  )
})
export default TVLFooter
