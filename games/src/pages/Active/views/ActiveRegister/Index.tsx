import React, { memo } from 'react'

import { isTVLEnd } from '@/pages/Active/state/activeState'

import ActiveRegister from './ActiveRegister'
import ActiveRegisterV2 from './ActiveRegister_v2'

const Index = memo(
  () => {
    return isTVLEnd ? <ActiveRegisterV2 /> : <ActiveRegister />
  },
  () => {
    return false
  }
)
export default Index
