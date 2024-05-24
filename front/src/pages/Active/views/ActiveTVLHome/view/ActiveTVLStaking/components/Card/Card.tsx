import { ActivePixelButtonColor, ChainId, Currency, LoadingButton, PixelBorderCard, useActiveWeb3React, useRecoilValue } from '@ui/src'
import React, { memo, useMemo } from 'react'

import PixelTooltip from '@/pages/Active/components/PixelTooltip/PixelTooltip'
import { canNext } from '@/pages/Active/hooks/activeHooks'
import { useAirdropPointsTooltip } from '@/pages/Active/hooks/useTooltip'
import { activeDataState, IActiveDataState, initActiveData, restakingDataState } from '@/pages/Active/state/activeState'

import css from './Card.module.styl'
// const Growth: Record<TVLChainId, [string, string]> = {
//   [TVLChainId.Sepolia]: ['10', '5'],
//   [TVLChainId.B2]: ['200', '100'],
//   [TVLChainId.B2Testnet]: ['200', '100'],
//   [TVLChainId.LineaMainnet]: ['10', '5'],
//   [TVLChainId.LineaTestnet]: ['10', '5']
// }
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
            // !restakingGrowthCoefficient || restakingGrowthCoefficient === '0'
            // ? Growth[chainIdLocal as unknown as TVLChainId][1]
            // :
            airdropPointsTooltip={airdropPointsTooltip}
            growthCoefficientTooltip={growthCoefficientTooltip}
          />
        </div>
        <div className={css.cardTwo}>
          <PixelCardTwo
            title="SBT"
            content={hasSbt ? 'Play games on L3 with zero gas!' : `Still need more ${Currency[chainIdLocal]} to unlock`}
            warning={SBTTooltip}
            btnLabel={hasSbt ? 'Go' : 'Stake'}
            onClick={onClaimSBTHandle}
            loading={claimSBTLoading}
            disable={false}
          />
          <PixelCardTwo
            title={crHeroBoxAmount}
            content="CR Hero Mystery Box"
            warning={crHeroTooltip}
            btnLabel="Open"
            onClick={onOpenCrHeroHandle}
            loading={claimCrLoading}
            disable={false}
          />
          <PixelCardTwo
            title={`${dollarGpRewords} $GP`}
            content="Rewards"
            warning={gpTooltip}
            btnLabel="Claim"
            onClick={() => onClaimGPHandle(chainIdLocal)}
            loading={claimGpLoading}
            disable={!dollarGpRewords || dollarGpRewords === '' || dollarGpRewords === '0' ? true : false}
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
        <div className={css.space}>
          <div className={css.fl}>
            <p className={css.title_amount}>{!airdropPoints || airdropPoints === '' ? '0' : airdropPoints}</p>
            <div className={css.grey_title}>
              <p>Airdrop Points</p>
              <PixelTooltip title={airdropPointsTooltip} />
            </div>
          </div>
          <div className={css.fr}>
            <p className={css.title_amount}>{growthCoefficient}</p>
            <div className={css.grey_title}>
              <p>Growth coefficient</p>
              <PixelTooltip title={growthCoefficientTooltip} />
            </div>
          </div>
        </div>
        {/* <div className={css.title_content}>

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
        </div> */}
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
    hideBtn,
    disable
  }: {
    title: string
    content: string
    warning: string[]
    btnLabel: string
    onClick: any
    loading: boolean
    hideBtn?: boolean
    disable: boolean
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
            themeType="brightBlue"
            pixel_height={3}
            width="144px"
            height="36px"
            className={css.fr_btn}
            onClick={onClick}
            disable={disable || loading}
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
