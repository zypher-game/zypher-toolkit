import {
  ActivePixelButtonColor,
  ActivePixelCard,
  ChainId,
  Currency,
  LoadingButton,
  PixelBorderCard,
  useActiveWeb3React,
  useRecoilValue
} from '@ui/src'
import React, { memo } from 'react'

import PixelTooltip from '@/pages/Active/components/PixelTooltip/PixelTooltip'
import { useActiveData } from '@/pages/Active/hooks/useActiveData'
import { useAirdropPointsTooltip } from '@/pages/Active/hooks/useTooltip'
import { restakingDataState } from '@/pages/Active/state/activeState'

import css from './Card.module.styl'
const Card = memo(
  ({
    claimGpLoading,
    onClaimGPHandle,
    claimSBTLoading,
    onClaimSBTHandle,
    claimCrLoading,
    onOpenCrHeroHandle,
    chainIdLocal
  }: {
    claimGpLoading: boolean
    onClaimGPHandle: any
    claimSBTLoading: boolean
    onClaimSBTHandle: any
    claimCrLoading: boolean
    onOpenCrHeroHandle: any
    chainIdLocal: ChainId
  }) => {
    const { airdropPointsTooltip, growthCoefficientTooltip, SBTTooltip, crHeroTooltip, gpTooltip } = useAirdropPointsTooltip()
    const { chainId } = useActiveWeb3React()
    const { activeData } = useActiveData()
    const { crHeroBoxAmount, dollarGpRewords } = activeData
    const restakingData = useRecoilValue(restakingDataState)
    const { stakingAirdropStr, stakingGrowthCoefficient, restakingAirdropStr, restakingGrowthCoefficient } = restakingData[chainIdLocal].statistics
    return (
      <div className={css.card}>
        <div className={css.cardOne}>
          <PixelCardOne
            title={`Obtained by staking $${Currency[chainId]}`}
            airdropPoints={stakingAirdropStr}
            growthCoefficient={stakingGrowthCoefficient}
            airdropPointsTooltip={airdropPointsTooltip}
            growthCoefficientTooltip={growthCoefficientTooltip}
          />
          <PixelCardOne
            title={'Obtained by restaking tokens'}
            airdropPoints={restakingAirdropStr}
            growthCoefficient={restakingGrowthCoefficient}
            airdropPointsTooltip={airdropPointsTooltip}
            growthCoefficientTooltip={growthCoefficientTooltip}
          />
        </div>
        <div className={css.cardTwo}>
          <PixelCardTwo
            title="SBT"
            content="Still need more BTC to unlock"
            warning={SBTTooltip}
            btnLabel="Claim"
            onClick={onClaimSBTHandle}
            loading={claimSBTLoading}
          />
          <PixelCardTwo
            title={crHeroBoxAmount}
            content="CR Hero Mystery Box"
            warning={crHeroTooltip}
            btnLabel="Open"
            onClick={onOpenCrHeroHandle}
            loading={claimCrLoading}
          />
          <PixelCardTwo
            title={`${dollarGpRewords}`}
            content="Rewards"
            warning={gpTooltip}
            btnLabel="Claim"
            onClick={onClaimGPHandle}
            loading={claimGpLoading}
          />
        </div>
      </div>
    )
  }
)
const PixelCardOne = memo(
  ({
    airdropPoints,
    growthCoefficient,
    title,
    airdropPointsTooltip,
    growthCoefficientTooltip
  }: {
    airdropPoints: string
    growthCoefficient: string
    title: string
    airdropPointsTooltip: string[]
    growthCoefficientTooltip: string[]
  }) => {
    return (
      <PixelCard>
        <h4 className={css.cardOneTitle}>{title}</h4>
        <div className={css.fr_title_content}>
          <p>{!airdropPoints || airdropPoints === '' ? '0' : airdropPoints}</p>
          <p>{growthCoefficient}</p>
        </div>
        <div className={css.fr_title}>
          <div className={css.fr_title_fl}>
            <p>Airdrop Points</p>
            <PixelTooltip title={airdropPointsTooltip} />
          </div>
          <div className={css.fr_title_fr}>
            <p>Growth coefficient</p>
            <PixelTooltip title={growthCoefficientTooltip} />
          </div>
        </div>
      </PixelCard>
    )
  }
)
const PixelCardTwo = memo(
  ({
    title,
    content,
    warning,
    btnLabel,
    onClick,
    loading
  }: {
    title: string
    content: string
    warning: string[]
    btnLabel: string
    onClick: any
    loading: boolean
  }) => {
    return (
      <PixelCard>
        <h4 className={css.fr_title}>{!title || title === '' ? '0' : title}</h4>
        <div className={`${css.fr_title_content} ${css.fr_title_content_sub}`}>
          <p>{content}</p>
          <PixelTooltip title={warning} />
        </div>
        <ActivePixelButtonColor pixel_height={3} width="144px" height="36px" className={css.fr_btn} onClick={onClick}>
          <p>{btnLabel}</p>
          <LoadingButton isLoading={loading} />
        </ActivePixelButtonColor>
      </PixelCard>
    )
  }
)
const PixelCard = memo(({ children }: { children: React.ReactNode }) => {
  return (
    <PixelBorderCard className="tvl_card_one" pixel_height={7} backgroundColor="#0d1425" borderColor="#3A4254">
      {children}
    </PixelBorderCard>
  )
})
export default Card
