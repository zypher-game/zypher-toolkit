import { preStaticUrl } from '@ui/src'
import React, { memo } from 'react'

import { useActiveData } from '@/pages/Active/hooks/useActiveData'

import ActiveComp from '../../../components/ActiveComp/ActiveComp'
import GetAirdropWrapV2 from '../components/GetAirdropWrapV2/GetAirdropWrapV2'

const NormalActive = memo(() => {
  const { activeData } = useActiveData()
  const { airdropPoints } = activeData
  return (
    <ActiveComp>
      <GetAirdropWrapV2
        title={
          <>
            <h3>
              Hey! your media account is active and you are eligible to receive <strong>{airdropPoints}</strong> airdrop points.
            </h3>
            <h3>However, your wallet is currently inactive.</h3>
          </>
        }
        frImgPath={preStaticUrl + '/img/tvl/airdrop_data2.png'}
      />
    </ActiveComp>
  )
})
export default NormalActive
