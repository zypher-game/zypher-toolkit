import { preStaticUrl, useRecoilValue } from '@ui/src'
import React, { memo } from 'react'

import { activeDataState } from '@/pages/Active/state/activeState'

import ActiveComp from '../../../components/ActiveComp/ActiveComp'
import GetAirdropWrapV2 from '../components/GetAirdropWrapV2/GetAirdropWrapV2'

const NormalActive = memo(() => {
  const activeData = useRecoilValue(activeDataState)
  const { airdropPoints } = activeData
  return (
    <ActiveComp>
      <GetAirdropWrapV2
        title={
          <>
            <h3>
              Your media account is active, you can get <strong>{airdropPoints}</strong> airdrop points.
            </h3>
            <h3>But the wallet is unactive.</h3>
          </>
        }
        frImgPath={preStaticUrl + '/img/tvl/airdrop_data2.png'}
      />
    </ActiveComp>
  )
})
export default NormalActive
