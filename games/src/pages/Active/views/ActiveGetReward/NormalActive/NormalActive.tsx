import { preStaticUrl } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo } from 'react'

import { useActiveData } from '@/pages/Active/hooks/useActiveData'

import ActiveComp from '../../../components/ActiveComp/ActiveComp'
import GetRewardWrapV2 from '../components/GetRewardWrapV2/GetRewardWrapV2'

const NormalActive = memo(() => {
  const { activeData } = useActiveData()
  const { rewardPoints } = activeData
  return (
    <ActiveComp>
      <GetRewardWrapV2
        title={
          <>
            <h3>
              Hey! your media account is active and you are eligible to receive <strong>{rewardPoints}</strong> reward points.
            </h3>
            <h3>However, your wallet is currently inactive.</h3>
          </>
        }
        frImgPath={preStaticUrl + '/img/tvl/reward_data2.png'}
      />
    </ActiveComp>
  )
}, isEqual)
export default NormalActive
