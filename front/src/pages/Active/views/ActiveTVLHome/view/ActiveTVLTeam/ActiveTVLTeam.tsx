import {
  ChainImage,
  Currency,
  PixelCube3,
  preStaticUrl,
  refreshAvatarState,
  SvgComponent,
  useActiveWeb3React,
  useIsW768,
  useRecoilValue
} from '@ui/src'
import React, { memo, useCallback, useState } from 'react'

import NoDataListLoading from '@/components/NoData/NoDataListLoading/NoDataListLoading'
import TVLPointDialog from '@/pages/Active/dialog/TVLPointDialog/TVLPointDialog'
import { useTeam } from '@/pages/Active/hooks/useTeam'
import { getNickname } from '@/pages/Active/utils/getNicknameStr'

import Avatar, { getAvatar } from '../../components/Avatar/Avatar'
import Tab from '../../components/Tab/Tab'
import TVLWrap from '../TVLWrap'
import css from './ActiveTVLTeam.module.styl'
import Banner from './components/Banner/Banner'
import FrSomeWidget from './components/FrSomeWidget/FrSomeWidget'
import PointText from './components/PointText/PointText'
import TeamWarn from './components/TeamWarn/TeamWarn'
const ActiveTVLTeam = memo(() => {
  const { chainId } = useActiveWeb3React()
  const refreshAvatar = useRecoilValue(refreshAvatarState)
  const isW768 = useIsW768()
  const [showTeamWarn, setShowTeamWarn] = useState(0)
  const { groupGoal, availableCode, teamMembers, activeData, openCard, isLoadingSingle, isLoadingAll, loading } = useTeam()

  const myTeamWarnHandle = useCallback(() => {
    setShowTeamWarn(1)
  }, [])

  return (
    <>
      <TVLWrap
        fl_children={
          <div className={css.fl}>
            {isW768 ? (
              <></>
            ) : (
              <>
                <h4 className={css.fl_title}>My Situation</h4>
                <PointText className={css.fl_text} />
              </>
            )}
            <Banner />
            {isW768 ? <FrSomeWidget activeData={activeData} groupGoal={groupGoal} availableCode={availableCode} loading={loading} /> : null}
            <div className={`${css.title_div} ${isW768 ? '' : css.mt30} ${css.mb10}`}>
              <h2 className={css.title}>My Team</h2>
              <SvgComponent src={preStaticUrl + '/img/icon/pixel_warn.svg'} onClick={myTeamWarnHandle} />
            </div>
            <div>
              <div className={css.team_goal_text}>
                <p>Team Goal</p>
                <p>
                  {groupGoal.totalStr} / {groupGoal.targetStr} {Currency[chainId]}
                  {isW768 ? <br /> : null} to receive team points bonus
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
            </div>
            <div className={`${css.show_team} ${css.mt20}`}>
              <TeamWarn showTeamWarn={showTeamWarn} setShowTeamWarn={setShowTeamWarn} teamMembers={teamMembers.slice(0, 5)} />
            </div>
            <h2 className={`${css.title} ${isW768 ? '' : css.mt30} ${css.mb20}`}>Team member</h2>
            <div className={css.team}>
              {loading ? <NoDataListLoading /> : null}
              {!loading ? (
                <>
                  {teamMembers.map((v, index) => (
                    <PixelCube3
                      key={index}
                      className={css.team_li}
                      pixel_height={3}
                      borderColor={`${v.userId}` === `${activeData.id}` ? '#FFD02B' : '#3A4254'}
                      backgroundColor="#1D263B"
                    >
                      <div className={css.team_item_fl}>
                        <Avatar src={getAvatar(v.headImg, refreshAvatar)} nickname={v.nickname} width="36px" />
                        <p>{getNickname(v.nickname)}</p>
                        {`${v.userId}` === `${activeData.id}` ? <SvgComponent src={preStaticUrl + '/img/icon/owner_icon.svg'} /> : null}
                      </div>
                      <div className={css.team_item_fr}>
                        <p>{v.stakingStr}</p>
                        <SvgComponent src={ChainImage[chainId]} />
                      </div>
                    </PixelCube3>
                  ))}
                </>
              ) : null}
            </div>
          </div>
        }
        fr_children={
          <div className={css.fr}>
            <Tab />
            {isW768 ? null : <FrSomeWidget activeData={activeData} groupGoal={groupGoal} availableCode={availableCode} loading={loading} />}
          </div>
        }
      />
      <TVLPointDialog openCard={openCard} isLoadingSingle={isLoadingSingle} isLoadingAll={isLoadingAll} />
    </>
  )
})
export default ActiveTVLTeam
