import { preStaticUrl, SvgComponent, useSetRecoilState } from '@UI/src/'
import { Tooltip } from 'antd'
import React, { memo, useCallback, useRef, useState } from 'react'

import { ActivePixelButtonColor, PixelCube3 } from '@UI/src/'
import { PixelTableBorder } from '@/pages/Active/components/PixelTable/PixelTable'
import { useTeam } from '@/pages/Active/hooks/useTeam'
import { tvlPointDialogState, tvlStakingDialogState } from '@/pages/Active/state/activeState'
import copy from '@/utils/copy'

import Avatar from '../../components/Avatar/Avatar'
import FrPixelBorder from '../../components/FrPixelBorder/FrPixelBorder'
import TVLWrap from '../TVLWrap'
import css from './ActiveTVLTeam.module.styl'
import Banner from './components/Banner/Banner'
import TeamWarn from './components/TeamWarn/TeamWarn'
const ActiveTVLTeam = memo(() => {
  const toastContainerRef = useRef<HTMLElement | null>(null)
  const setIsTvlStakingModalOpen = useSetRecoilState(tvlStakingDialogState)
  const setIsTvlPointModalOpen = useSetRecoilState(tvlPointDialogState)
  const [showTeamWarn, setShowTeamWarn] = useState(0)
  const { availableCode } = useTeam()
  const stakingHandle = useCallback(() => {
    setIsTvlStakingModalOpen(true)
  }, [])
  const tvlPointHandle = useCallback(() => {
    setIsTvlPointModalOpen(true)
  }, [])
  const myTeamWarnHandle = useCallback(() => {
    setShowTeamWarn(1)
  }, [])

  return (
    <TVLWrap
      fl_children={
        <>
          <Banner />
          <div className={`${css.title_div} ${css.mt30} ${css.mb10}`}>
            <h2 className={css.title}>My Team</h2>
            <SvgComponent src={preStaticUrl + '/img/icon/pixel_warn.svg'} onClick={myTeamWarnHandle} />
          </div>
          <div className={css.team_goal_text}>
            <p>Team Goal</p>
            <p>0.39 / 1 ETH to receive team points bonus</p>
          </div>
          <div className={css.team_goal_line}>
            <div
              className={css.team_goal_line_process}
              style={{
                width: '40%'
              }}
            />
          </div>
          <div className={`${css.show_team} ${css.mt20}`}>
            <TeamWarn showTeamWarn={showTeamWarn} setShowTeamWarn={setShowTeamWarn} />
          </div>
          <h2 className={`${css.title} ${css.mt30} ${css.mb20}`}>Team member</h2>
          <div className={css.team}>
            <PixelCube3 className={css.team_li} pixel_height={3} borderColor="#3A4254" backgroundColor="#1D263B">
              <div className={css.team_item_fl}>
                <Avatar src={preStaticUrl + '/img/tvl/tvl_team_bg.png'} nickname="ccc" width="36px" />
                <p>asdfsdf</p>
              </div>
              <div className={css.team_item_fr}>
                <p>0.18</p>
                <SvgComponent src={preStaticUrl + '/img/icon/pixel_eth.svg'} />
              </div>
            </PixelCube3>
            <PixelCube3 className={css.team_li} pixel_height={3} borderColor="#3A4254" backgroundColor="#1D263B">
              <div className={css.team_item_fl}>
                <Avatar src={preStaticUrl + '/img/tvl/tvl_team_bg.png'} nickname="ccc" width="36px" />
                <p>asdfsdf</p>
              </div>
              <div className={css.team_item_fr}>
                <p>0.18</p>
                <SvgComponent src={preStaticUrl + '/img/icon/pixel_eth.svg'} />
              </div>
            </PixelCube3>
          </div>
        </>
      }
      fr_children={
        <>
          <FrPixelBorder>
            <h3 className={css.fr_title}>Restaked</h3>
            <p className={css.fr_grey}> Earn Airdrop Points + Rewards</p>
            <div className={css.fr_number}>
              <p>0.18</p>
              <SvgComponent src={preStaticUrl + '/img/icon/pixel_eth.svg'} />
            </div>
            <ActivePixelButtonColor className={css.fr_btn} width="144px" height="36px" pixel_height={3} onClick={stakingHandle}>
              <p>Restaking more</p>
            </ActivePixelButtonColor>
          </FrPixelBorder>
          <FrPixelBorder>
            <h3 className={css.fr_title}>Airdrop Points Card</h3>
            <p className={css.fr_grey}>You still need 0.61 ETH to get another free Airdrop Points Card</p>
            <div className={css.fr_number}>
              <p>1</p>
            </div>
            <ActivePixelButtonColor className={css.fr_btn} width="144px" height="36px" pixel_height={3} onClick={tvlPointHandle}>
              <p>Open</p>
            </ActivePixelButtonColor>
          </FrPixelBorder>
          <PixelTableBorder
            pixel_height={6}
            header_children={
              <div className={css.tvl_fr_title}>
                <h2>Available invitations</h2>
                <Tooltip title="prompt text">
                  <SvgComponent src={preStaticUrl + '/img/icon/pixel_warn.svg'} />
                </Tooltip>
              </div>
            }
            body_children={
              <ul className={css.tvl_fr_table_ul}>
                {availableCode.map(v => (
                  <li key={v}>
                    <p>
                      {window.location.origin}/{v}
                    </p>
                    <ActivePixelButtonColor
                      width="88px"
                      height="36px"
                      pixel_height={3}
                      onClick={() => copy(`${window.location.origin}/${v}`, toastContainerRef)}
                    >
                      <p>Copy</p>
                    </ActivePixelButtonColor>
                  </li>
                ))}
              </ul>
            }
          />
          <div className="toast__" ref={ref => (toastContainerRef.current = ref)} />
        </>
      }
    />
  )
})
export default ActiveTVLTeam