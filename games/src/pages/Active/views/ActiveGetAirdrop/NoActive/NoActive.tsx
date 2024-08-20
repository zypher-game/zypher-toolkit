import { preStaticUrl } from '@ui/src'
import React, { memo } from 'react'

import ActiveComp from '../../../components/ActiveComp/ActiveComp'
import GetAirdropWrapV2 from '../components/GetAirdropWrapV2/GetAirdropWrapV2'

const NoActive = memo(() => {
  return (
    <ActiveComp>
      <GetAirdropWrapV2 title={<h3>OPS! This wallet has no Airdrop points.</h3>} frImgPath={preStaticUrl + '/img/tvl/airdrop_no_data.png'} />
    </ActiveComp>
  )
})
export default NoActive
