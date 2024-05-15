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
          />
          <PixelCardOne title={'Obtained by restaking tokens'} airdropPoints={restakingAirdropStr} growthCoefficient={restakingGrowthCoefficient} />
        </div>
        <div className={css.cardTwo}>
          <PixelCardTwo
            title="SBT"
            content="Still need more BTC to unlock"
            warning={''}
            btnLabel="Claim"
            onClick={onClaimSBTHandle}
            loading={claimSBTLoading}
          />
          <PixelCardTwo
            title={crHeroBoxAmount}
            content="CR Hero Mystery Box"
            warning={
              'Hero blind box rewards for platformer Crypto Rumble. If you stake ≥0.5ETH, you can get 1 hero mystery box; if you stake >1ETH, you can get 3 hero mystery boxes. There is a limit of 3 hero mystery boxes per address. Total quantity 10,000, first come first served.'
            }
            btnLabel="Open"
            onClick={onOpenCrHeroHandle}
            loading={claimCrLoading}
          />
          <PixelCardTwo
            title={`${dollarGpRewords}`}
            content="Rewards"
            warning={
              '$GP rewards are settled weekly. Based on last week’s pledge status. Note: The profit is $GP and the value is constant $ETH ( 1 $ETH = 2,000,000 $GP). $GP can only be circulated in games within the platform and cannot be transferred. You can later sell DP to earn $ETH through the [$GP to DP] function.'
            }
            btnLabel="Claim"
            onClick={onClaimGPHandle}
            loading={claimGpLoading}
          />
        </div>
      </div>
    )
  }
)
const PixelCardOne = memo(({ airdropPoints, growthCoefficient, title }: { airdropPoints: string; growthCoefficient: string; title: string }) => {
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
          <PixelTooltip title="prompt text" />
        </div>
        <div className={css.fr_title_fr}>
          <p>Growth coefficient</p>
          <PixelTooltip title="prompt text" />
        </div>
      </div>
    </PixelCard>
  )
})
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
    warning: string
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
