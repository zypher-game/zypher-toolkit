import React, { memo } from 'react'

import { isTVLEnd } from '@/pages/Active/state/activeState'

import Banner from './Banner'
import BannerV2 from './BannerV2'

const Index = memo(
  () => {
    return isTVLEnd ? <BannerV2 /> : <Banner />
  },
  () => {
    return false
  }
)
export default Index
