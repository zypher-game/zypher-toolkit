import { isEqual } from 'lodash'
import React, { memo } from 'react'

import { isTVLEnd } from '@/pages/Active/state/activeState'

import Staking from './Staking/Staking'
import StakingV2 from './StakingV2'

const Index = memo(({ isModal }: { isModal: boolean }) => {
  return isTVLEnd ? <StakingV2 isModal={isModal} /> : <Staking isModal={isModal} />
}, isEqual)
export default Index
