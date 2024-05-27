import {
  ActivePixelButtonColor,
  ChainImage,
  Currency,
  CurrencyLogo,
  LoadingButton,
  PixelCube3,
  preStaticUrl,
  SvgComponent,
  useActiveWeb3React,
  useRecoilValue,
  useSetRecoilState
} from '@ui/src'
import React, { memo, useCallback, useMemo, useState } from 'react'

import PixelTooltip from '@/pages/Active/components/PixelTooltip/PixelTooltip'
import { tvlTokenAddress } from '@/pages/Active/constants/activeConstants'
import TVLPointDialog from '@/pages/Active/dialog/TVLPointDialog/TVLPointDialog'
import { useTeam } from '@/pages/Active/hooks/useTeam'
import { isTvlDataLoadingState, tvlPointDialogState, tvlStakingDialogState } from '@/pages/Active/state/activeState'
import { getNickname } from '@/pages/Active/utils/getNicknameStr'

import Avatar from '../../components/Avatar/Avatar'
import FrPixelBorder from '../../components/FrPixelBorder/FrPixelBorder'
import Tab from '../../components/Tab/Tab'
import TVLWrap from '../TVLWrap'
import css from './ActiveTVLTeam.module.styl'
import AvailableCode from './components/AvailableCode/AvailableCode'
import Banner from './components/Banner/Banner'
import TeamWarn from './components/TeamWarn/TeamWarn'
const ActiveTVLTeam = memo(() => {
  const setIsTvlStakingModalOpen = useSetRecoilState(tvlStakingDialogState)
  const setIsTvlPointModalOpen = useSetRecoilState(tvlPointDialogState)
  const isDataLoading = useRecoilValue(isTvlDataLoadingState)
  const { chainId } = useActiveWeb3React()
  const [showTeamWarn, setShowTeamWarn] = useState(0)
  const { groupGoal, availableCode, teamMembers, activeData, openCard, isLoadingSingle, isLoadingAll } = useTeam()
  const stakingHandle = useCallback(() => {
    setIsTvlStakingModalOpen(true)
  }, [])
  const tvlPointHandle = useCallback(() => {
    if (activeData.airdropPointsCardNumber === '' || activeData.airdropPointsCardNumber === '0') {
      return
    }
    setIsTvlPointModalOpen(true)
  }, [activeData.airdropPointsCardNumber])
  const myTeamWarnHandle = useCallback(() => {
    setShowTeamWarn(1)
  }, [])
  const stakingStr = useMemo(() => {
    console.log('sadfsd', { aaa: Object.keys(tvlTokenAddress[chainId]) })
    return Object.keys(tvlTokenAddress[chainId]).join(', ')
  }, [chainId])
  console.log({ activeData: activeData.airdropPointsCardNumber })
  return (
    <>
      <TVLWrap
        fl_children={
          <div className={css.fl}>
            <Tab />
            <Banner />
            <div className={`${css.title_div} ${css.mt30} ${css.mb10}`}>
              <h2 className={css.title}>My Team</h2>
              <SvgComponent src={preStaticUrl + '/img/icon/pixel_warn.svg'} onClick={myTeamWarnHandle} />
            </div>
            <div className={css.team_goal_text}>
              <p>Team Goal</p>
              <p>
                {groupGoal.totalStr} / {groupGoal.targetStr} {Currency[chainId]} to receive team points bonus
              </p>
            </div>
            <div className={css.team_goal_line}>
              <div
                className={css.team_goal_line_process}
                style={{
                  width: `${groupGoal.percent}%`
                }}
              />
            </div>
            <div className={`${css.show_team} ${css.mt20}`}>
              <TeamWarn showTeamWarn={showTeamWarn} setShowTeamWarn={setShowTeamWarn} teamMembers={teamMembers} />
            </div>
            <h2 className={`${css.title} ${css.mt30} ${css.mb20}`}>Team member</h2>
            <div className={css.team}>
              {teamMembers.map((v, index) => (
                <PixelCube3 key={index} className={css.team_li} pixel_height={3} borderColor="#3A4254" backgroundColor="#1D263B">
                  <div className={css.team_item_fl}>
                    <Avatar src={v.headImg} nickname={v.nickname} width="36px" />
                    <p>{getNickname(v.nickname)}</p>
                  </div>
                  <div className={css.team_item_fr}>
                    <p>{v.stakingStr}</p>
                    <SvgComponent src={ChainImage[chainId]} />
                  </div>
                </PixelCube3>
              ))}
            </div>
          </div>
        }
        fr_children={
          <>
            <div className={css.pt100} />
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
              <ActivePixelButtonColor
                themeType="brightBlue"
                className={css.fr_btn}
                width="144px"
                height="36px"
                pixel_height={3}
                onClick={stakingHandle}
              >
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
                {Number(groupGoal.need) === 0
                  ? `You still need ${groupGoal.needStr} ${Currency[chainId]} to get another free Airdrop Points Card`
                  : null}
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
        }
      />
      <TVLPointDialog openCard={openCard} isLoadingSingle={isLoadingSingle} isLoadingAll={isLoadingAll} />
    </>
  )
})
export default ActiveTVLTeam
