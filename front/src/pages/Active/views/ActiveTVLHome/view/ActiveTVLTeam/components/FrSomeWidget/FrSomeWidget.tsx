import {
  ActivePixelButtonColor,
  Currency,
  CurrencyLogo,
  LoadingButton,
  tvlTokenAddress,
  useActiveWeb3React,
  useRecoilValue,
  useSetRecoilState
} from '@ui/src'
import React, { memo, useCallback, useMemo } from 'react'

import PixelTooltip from '@/pages/Active/components/PixelTooltip/PixelTooltip'
import { StakingTitle, Title } from '@/pages/Active/components/Title/Title'
import { IAvailableCode, IGroupGoal } from '@/pages/Active/hooks/useTeam'
import { useTvlStakingDialogState } from '@/pages/Active/hooks/useTvlStakingDialogState'
import { IActiveData, isTvlDataLoadingState, tvlPointDialogState, tvlStakingDialogState } from '@/pages/Active/state/activeState'

import FrPixelBorder from '../../../../components/FrPixelBorder/FrPixelBorder'
import AvailableCode from '../AvailableCode/AvailableCode'
import css from './FrSomeWidget.module.styl'
const FrSomeWidget = memo(
  ({
    activeData,
    groupGoal,
    availableCode,
    loading
  }: {
    activeData: IActiveData
    groupGoal: IGroupGoal
    availableCode: IAvailableCode[]
    loading: boolean
  }) => {
    const setTvlStakingDialog = useTvlStakingDialogState()
    const setIsTvlPointModalOpen = useSetRecoilState(tvlPointDialogState)
    const isDataLoading = useRecoilValue(isTvlDataLoadingState)
    const { chainId } = useActiveWeb3React()
    const stakingStr = useMemo(() => {
      return Object.keys(tvlTokenAddress[chainId]).join(', ')
    }, [chainId])
    const stakingHandle = useCallback(() => {
      setTvlStakingDialog(chainId, true)
    }, [chainId])
    const tvlPointHandle = useCallback(() => {
      if (activeData.airdropPointsCardNumber === '' || activeData.airdropPointsCardNumber === '0') {
        return
      }
      setIsTvlPointModalOpen(true)
    }, [activeData.airdropPointsCardNumber])
    return (
      <>
        <FrPixelBorder>
          <StakingTitle />
          <p className={css.fr_grey}>Earn Airdrop Points + Rewards</p>
          <div className={css.fr_number}>
            {isDataLoading ? null : <p>{activeData.userStakedAmountStr}</p>}
            <LoadingButton hideMl={true} isLoading={isDataLoading} />
            <img src={CurrencyLogo[chainId]} />
          </div>
          <ActivePixelButtonColor themeType="brightBlue" className={css.fr_btn} width="144px" height="36px" pixel_height={3} onClick={stakingHandle}>
            <p>Staking more</p>
          </ActivePixelButtonColor>
        </FrPixelBorder>
        <FrPixelBorder>
          <Title
            label="Airdrop Points Card"
            tooltip={['Points cards come from:', 'Your inviter has completed the group goal;', 'Your team accomplished the group goal.']}
          />
          <p className={css.fr_grey}>
            {Number(groupGoal.need) === 0 ? null : `You still need ${groupGoal.needStr} ${Currency[chainId]} to get another free Airdrop Points Card`}
          </p>
          <div className={css.fr_number}>
            <p>{activeData.airdropPointsCardNumber === '' ? '0' : activeData.airdropPointsCardNumber}</p>
          </div>
          <ActivePixelButtonColor
            themeType="brightBlue"
            className={css.fr_btn}
            width="144px"
            height="36px"
            pixel_height={3}
            disable={activeData.airdropPointsCardNumber === '' || activeData.airdropPointsCardNumber === '0'}
            onClick={tvlPointHandle}
          >
            <p>Open</p>
          </ActivePixelButtonColor>
        </FrPixelBorder>
        <AvailableCode availableCode={availableCode} loading={loading} />
      </>
    )
  }
)
export default FrSomeWidget
