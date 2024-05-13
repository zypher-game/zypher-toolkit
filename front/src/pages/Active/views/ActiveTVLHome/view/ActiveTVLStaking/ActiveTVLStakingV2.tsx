import { Chain, ChainId, PixelTableBorder, preStaticUrl, SvgComponent, useSetRecoilState } from '@ui/src'
import { ActivePixelButtonColor, PixelCube2 } from '@ui/src'
import { Tooltip } from 'antd'
import React, { memo, useCallback, useState } from 'react'
import { zeroAddress } from 'viem'

import TokenWithChain from '@/pages/Active/components/Token/TokenWithChain/TokenWithChain'
import { TVLStakingSupportedChainId } from '@/pages/Active/constants/activeConstants'
import { tvlStakingDialogState } from '@/pages/Active/state/activeState'

import FrPixelBorder from '../../components/FrPixelBorder/FrPixelBorder'
import TVLWrap from '../TVLWrap'
import css from './ActiveTVLStakingV2.module.styl'
import Banner from './components/Banner/Banner'
import Card from './components/Card/Card'
import StakingTab from './components/StakingTab/StakingTab'

const ActiveTVLStakingV2 = memo(() => {
  const [chainIndex, setChainIndex] = useState(0)
  const changeChainIndexHandle = useCallback((index: number) => {
    setChainIndex(index)
  }, [])

  return (
    <TVLWrap type="inner">
      <Banner />
      <StakingTab chainIndex={chainIndex} changeChainIndexHandle={changeChainIndexHandle} />
      <Card />
    </TVLWrap>
  )
})
export default ActiveTVLStakingV2
