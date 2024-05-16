import React, { memo, useCallback } from 'react'

import { useChainIndex } from '@/pages/Active/hooks/useChainIndex'
import { useReStakingHandle } from '@/pages/Active/hooks/useStakeHandle'

import TVLWrap from '../TVLWrap'
import Banner from './components/Banner/Banner'
import Card from './components/Card/Card'
import StakingTab from './components/StakingTab/StakingTab'
import Table from './components/Table/Table'

const ActiveTVLStakingV2 = memo(() => {
  const { chainIndex, setChainIndex, chainIdLocal } = useChainIndex()

  const changeChainIndexHandle = useCallback((index: number) => {
    setChainIndex(index)
  }, [])
  const {
    claimGpLoading,
    onClaimGPHandle,

    claimSBTLoading,
    onClaimSBTHandle,

    claimCrLoading,
    onOpenCrHeroHandle
  } = useReStakingHandle()
  return (
    <TVLWrap type="inner">
      <Banner />
      <StakingTab chainIndex={chainIndex} changeChainIndexHandle={changeChainIndexHandle} />
      <Card
        claimGpLoading={claimGpLoading}
        onClaimGPHandle={onClaimGPHandle}
        claimSBTLoading={claimSBTLoading}
        onClaimSBTHandle={onClaimSBTHandle}
        claimCrLoading={claimCrLoading}
        onOpenCrHeroHandle={onOpenCrHeroHandle}
        chainIdLocal={chainIdLocal}
      />
      <Table chainIdLocal={chainIdLocal} />
    </TVLWrap>
  )
})
export default ActiveTVLStakingV2
