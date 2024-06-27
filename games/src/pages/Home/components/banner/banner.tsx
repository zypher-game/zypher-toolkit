import { LoadingOutlined } from '@ant-design/icons'
import { useSetRecoilState } from '@ui/src'
// import VideoDialog from '@/components/VideoDialog'
import { useIsW768 } from '@ui/src'
import { preStaticUrl } from '@ui/src'
import classnames from 'classnames'
import { isEqual } from 'lodash'
import React, { FC, memo, useMemo } from 'react'
import { Link } from 'react-router-dom'

import Icon from '@/assets/iconsLocal'

import { IBingoPointApi, IClaimConfKey } from '../hooks'
// import { videoDialogState } from '../state/homeState'
import { dailyRewardsRuleDialogState } from '../state/homeState'
import css from './banner.module.stylus'
import DailyRewardsRuleDialog from './dialog/DailyRewardsRuleDialog'
import InvitationWidget from './invitationWidget'

const BannerWidget: FC<IBingoPointApi> = memo(({ pointsStr, dayClaimed, claimHandle, isClaimLoading, claimConfKey }: IBingoPointApi) => {
  // const setIsModalOpen = useSetRecoilState(videoDialogState)
  const setDailyRewordsIsModalOpen = useSetRecoilState(dailyRewardsRuleDialogState)
  const isMobile = useIsW768()
  const isLive = useMemo(() => {
    // 10/10号超时
    // 获取当前时间
    const currentTime = new Date()

    // 设置目标日期和时间为 10/10 2AM UTC
    // 9/26
    const startTimeDate = new Date(Date.UTC(currentTime.getUTCFullYear(), 8, 26, 2, 0, 0))
    const targetDate = new Date(Date.UTC(currentTime.getUTCFullYear(), 9, 10, 2, 0, 0))

    // 判断当前时间是否超过目标日期和时间
    if (currentTime > targetDate) {
      // 当前时间已经超过 10/10 2AM UTC
      return false
    } else {
      // 当前时间还未超过 10/10 2AM UTC
      if (startTimeDate < currentTime) {
        return true
      }
      return false
    }
  }, [])
  return (
    <>
      <div className={css.header}>
        <div className={css.headerFl}>
          <div className={css.banner}>
            <img src={preStaticUrl + `/img/home/banner01bgV0.png`} alt="zbingo" className={css.bannerbg} />
            <div className={css.bannerInner}>
              <img src={preStaticUrl + `/img/home/banner0101.png`} alt="zbingo" className={css.bannerFlInnerImg} />
              <div className={css.bannerFlBtnWrap}>
                <a href="/bingo" target="_blank" rel="noreferrer">
                  <img src={preStaticUrl + `/img/home/playNow.png`} alt="playNow" width={'100%'} />
                </a>
                {/* <div className={css.bannerFlBtn}>
                  <img onClick={() => setIsModalOpen(true)} src={preStaticUrl + `/img/home/gameRule.png`} alt="gameRule" className={css.gameRuleBtnImg} />
                  <VideoDialog />
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className={css.headerFr}>
          <img src={preStaticUrl + `/img/home/banner02bgV0.png`} alt="points" className={css.bannerbg} />
          <div className={css.headerFrInner}>
            {claimConfKey && claimConfKey === IClaimConfKey.princely ? (
              <h2 className={css.h21}>
                DEAR GENESIS PLAYER
                <br /> DAILY REWARDS
              </h2>
            ) : (
              <>
                <h2 className={css.h23} onClick={() => setDailyRewordsIsModalOpen(true)}>
                  DAILY REWARDS (<i>9/26 - 10/10</i>)
                  <Icon name="question_bg" className={css.question} />
                  <DailyRewardsRuleDialog />
                </h2>
                <h2 className={css.h22}>
                  LOG IN DAILY TO GET <br />
                  <i>{pointsStr}</i> $GP
                </h2>
              </>
            )}
            <DivWrap showDiv={!!(claimConfKey && claimConfKey === IClaimConfKey.princely)}>
              {/* <Wrap claimConfKey={claimConfKey} className={dayClaimed ? css.flex : ''}> */}
              {/* <div className={css.headerFrInnerBg}>
                <h3>{pointsStr}</h3>
                <img src={preStaticUrl + `/img/home/data_points.svg`} alt="points" />
              </div> */}
              {dayClaimed ? (
                <p className={classnames(css.btn, css.btnClaimed)}>CLAIMED</p>
              ) : !isLive ? (
                <p className={classnames(css.btn, css.btnClaimed)}>CLAIM</p>
              ) : (
                <div className={isClaimLoading ? classnames(css.btn, css.btnLoading) : css.btn} onClick={claimHandle}>
                  CLAIM
                  {isClaimLoading && <LoadingOutlined />}
                </div>
              )}
            </DivWrap>
          </div>
        </div>
      </div>
      <InvitationWidget isMobile={isMobile} />
    </>
  )
}, isEqual)

export default BannerWidget
