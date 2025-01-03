import React, { memo, useCallback } from 'react'

import { useChainIndex } from '@/pages/Active/hooks/useChainIndex'
import { useReStakingHandle } from '@/pages/Active/hooks/useStakeHandle'

import TVLWrap from '../TVLWrap'
import Banner from './components/Banner/Index'
import Card from './components/Card/Card'
import StakingTab from './components/StakingTab/StakingTab'
import Table from './components/Table/Index'

const ActiveTVLStaking = memo(() => {
  const { chainIndex, setChainIndex, chainIdLocal } = useChainIndex()

  const changeChainIndexHandle = useCallback(
    (index: number) => {
      if (chainIndex !== index) {
        setChainIndex(index)
      }
    },
    [chainIndex]
  )
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

      <StakingTab chainIdLocal={chainIdLocal} chainIndex={chainIndex} changeChainIndexHandle={changeChainIndexHandle} />
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
export default ActiveTVLStaking
