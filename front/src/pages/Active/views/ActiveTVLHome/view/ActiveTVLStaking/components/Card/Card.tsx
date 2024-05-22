import { ActivePixelButtonColor, ChainId, Currency, LoadingButton, PixelBorderCard, useActiveWeb3React, useRecoilValue } from '@ui/src'
import React, { memo, useMemo } from 'react'

import PixelTooltip from '@/pages/Active/components/PixelTooltip/PixelTooltip'
import { canNext } from '@/pages/Active/hooks/activeHooks'
import { useAirdropPointsTooltip } from '@/pages/Active/hooks/useTooltip'
import { activeDataState, IActiveDataState, initActiveData, restakingDataState } from '@/pages/Active/state/activeState'

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
    const { getTooltip } = useAirdropPointsTooltip()

    const { account } = useActiveWeb3React()
    const activeDataSource = useRecoilValue<IActiveDataState>(activeDataState)
    const { crHeroBoxAmount, dollarGpRewords, sbtAmount } = useMemo(() => {
      if (canNext(account, chainIdLocal)) {
        return activeDataSource[chainIdLocal] ?? initActiveData
      }
      return initActiveData
    }, [JSON.stringify(activeDataSource), chainIdLocal])
    const restakingData = useRecoilValue(restakingDataState)
    const { stakingAirdropStr, stakingGrowthCoefficient, restakingAirdropStr, restakingGrowthCoefficient } = restakingData[chainIdLocal].statistics
    const hasSbt = useMemo(() => {
      return sbtAmount === '' || !sbtAmount || sbtAmount === '0' ? false : true
    }, [sbtAmount])
    const { airdropPointsTooltip, growthCoefficientTooltip, SBTTooltip, crHeroTooltip, gpTooltip, availableInvitationsTooltip } = useMemo(() => {
      if (chainIdLocal) {
        return getTooltip(chainIdLocal)
      }
      return {
        airdropPointsTooltip: [''],
        growthCoefficientTooltip: [''],
        SBTTooltip: [''],
        crHeroTooltip: [''],
        gpTooltip: [''],
        availableInvitationsTooltip: ['']
      }
    }, [chainIdLocal])
    return (
      <div className={css.card}>
        <div className={css.cardOne}>
          <PixelCardOne
            title={`Obtained by staking $${Currency[chainIdLocal]}`}
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
            content={hasSbt ? 'Play games on L3 with zero gas!' : 'Still need more BTC to unlock'}
            warning={SBTTooltip}
            hideBtn={!hasSbt}
            btnLabel="Go"
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
        <div className={css.title_content}>
          <p>{!airdropPoints || airdropPoints === '' ? '0' : airdropPoints}</p>
          <p>{growthCoefficient}</p>
        </div>
        <div className={css.sub_title}>
          <div className={css.grey_title}>
            <p>Airdrop Points</p>
            <PixelTooltip title={airdropPointsTooltip} />
          </div>
          <div className={css.grey_title}>
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
    loading,
    hideBtn
  }: {
    title: string
    content: string
    warning: string[]
    btnLabel: string
    onClick: any
    loading: boolean
    hideBtn?: boolean
  }) => {
    return (
      <PixelCard>
        <h4 className={css.title_content}>{!title || title === '' ? '0' : title}</h4>
        <div className={css.grey_title}>
          <p>{content}</p>
          <PixelTooltip title={warning} />
        </div>
        {hideBtn ? null : (
          <ActivePixelButtonColor
            pixel_height={3}
            width="144px"
            height="36px"
            className={css.fr_btn}
            onClick={onClick}
            disable={!title || title === '' || title === '0' || loading ? true : false}
          >
            <p>{btnLabel}</p>
            <LoadingButton isLoading={loading} />
          </ActivePixelButtonColor>
        )}
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
