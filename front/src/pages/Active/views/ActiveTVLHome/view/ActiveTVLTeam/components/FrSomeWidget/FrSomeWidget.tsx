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
import { IAvailableCode, IGroupGoal } from '@/pages/Active/hooks/useTeam'
import { IActiveData, isTvlDataLoadingState, tvlPointDialogState, tvlStakingDialogState } from '@/pages/Active/state/activeState'

import FrPixelBorder from '../../../../components/FrPixelBorder/FrPixelBorder'
import AvailableCode from '../AvailableCode/AvailableCode'
import css from './FrSomeWidget.module.styl'
const FrSomeWidget = memo(
  ({ activeData, groupGoal, availableCode }: { activeData: IActiveData; groupGoal: IGroupGoal; availableCode: IAvailableCode[] }) => {
    const setIsTvlStakingModalOpen = useSetRecoilState(tvlStakingDialogState)
    const setIsTvlPointModalOpen = useSetRecoilState(tvlPointDialogState)
    const isDataLoading = useRecoilValue(isTvlDataLoadingState)
    const { chainId } = useActiveWeb3React()
    const stakingStr = useMemo(() => {
      return Object.keys(tvlTokenAddress[chainId]).join(', ')
    }, [chainId])
    const stakingHandle = useCallback(() => {
      setIsTvlStakingModalOpen(true)
    }, [])
    const tvlPointHandle = useCallback(() => {
      if (activeData.airdropPointsCardNumber === '' || activeData.airdropPointsCardNumber === '0') {
        return
      }
      setIsTvlPointModalOpen(true)
    }, [activeData.airdropPointsCardNumber])
    return (
      <>
        <FrPixelBorder>
          <div className={css.fr_title}>
            <h3>Staked</h3>
            <PixelTooltip title={[`Your total pledge amount, including ${stakingStr} etc.`]} />
          </div>
          <p className={css.fr_grey}>Earn Airdrop Points + Rewards</p>
          <div className={css.fr_number}>
            <p>{activeData.userStakedAmountStr}</p>
            <LoadingButton isLoading={isDataLoading} />
            <img src={CurrencyLogo[chainId]} />
          </div>
          <ActivePixelButtonColor themeType="brightBlue" className={css.fr_btn} width="144px" height="36px" pixel_height={3} onClick={stakingHandle}>
            <p>Staking more</p>
          </ActivePixelButtonColor>
        </FrPixelBorder>
        <FrPixelBorder>
          <div className={css.fr_title}>
            <h3>Airdrop Points Card</h3>
            <PixelTooltip
              title={['Points cards come from:', 'Your inviter has completed the group goal;', 'Your team accomplished the group goal.']}
            />
          </div>
          <p className={css.fr_grey}>
            {Number(groupGoal.need) === 0 ? `You still need ${groupGoal.needStr} ${Currency[chainId]} to get another free Airdrop Points Card` : null}
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
        <AvailableCode availableCode={availableCode} />
      </>
    )
  }
)
export default FrSomeWidget
