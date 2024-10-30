import { preStaticUrl } from '@ui/src'
import React, { memo } from 'react'

import ActiveComp from '../../../components/ActiveComp/ActiveComp'
import GetRewardWrapV2 from '../components/GetRewardWrapV2/GetRewardWrapV2'

const NoActive = memo(() => {
  return (
    <ActiveComp>
      <GetRewardWrapV2 title={<h3>OPS! This wallet has no Reward points.</h3>} frImgPath={preStaticUrl + '/img/tvl/airdrop_no_data.png'} />
    </ActiveComp>
  )
})
export default NoActive
