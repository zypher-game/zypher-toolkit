import { CommunityLink } from '@ui/src'
import React, { memo } from 'react'

import css from './TVLFooter.module.styl'
const TVLFooter = memo(() => {
  return (
    <div className={css.TVLFooter}>
      <CommunityLink className={css.communityLink} />
      {/* <p className={css.text}>TVL ｜ 2,356,789.2345 ETH</p> */}
    </div>
  )
})
export default TVLFooter
