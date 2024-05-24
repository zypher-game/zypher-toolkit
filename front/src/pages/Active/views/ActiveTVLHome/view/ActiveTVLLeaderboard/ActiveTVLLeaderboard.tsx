import { PixelTableBorder } from '@ui/src'
import React, { memo, useCallback, useState } from 'react'

import { useLeaderBoard } from '@/pages/Active/hooks/useLeaderboard'

import Avatar from '../../components/Avatar/Avatar'
import ChainTab from '../../components/ChainTab/ChainTab'
import Tab from '../../components/Tab/Tab'
import TVLWrap from '../TVLWrap'
import css from './ActiveTVLLeaderboard.module.styl'
import LeaderBoardRow from './components/LeaderBoardRow/LeaderBoardRow'

const ActiveTVLLeaderboard = memo(() => {
  const { chainIndex, setChainIndex, recentUser, rankBoard, my } = useLeaderBoard()

  const changeChainIndexHandle = useCallback((index: number) => {
    setChainIndex(index)
  }, [])
  return (
    <TVLWrap
      fl_children={
        <>
          <h2 className={`${css.fl_title} ${css.pt30}`}>Leaderboard</h2>
          <p className={`${css.fl_grey} ${css.mb40}`}>Staking & invite friends to improve your ranking!</p>
          <ChainTab chainIndex={chainIndex} changeChainIndexHandle={changeChainIndexHandle} />
          <div className={css.fl_list}>
            {rankBoard.map((v, index) => (
              <LeaderBoardRow key={index} {...v} />
            ))}
          </div>
          {my ? <LeaderBoardRow {...my} isMy={true} /> : null}
        </>
      }
      fr_children={
        <div className={css.fr}>
          <Tab />
          <PixelTableBorder
            pixel_height={6}
            header_children={<p className={css.fr_title}>Recently Joined</p>}
            body_children={
              <ul className={css.fr_ul}>
                {recentUser.map((v, index) => (
                  <li key={index}>
                    <div className={css.fr_list_fl}>
                      <Avatar src={v.headImg} nickname={v.nickname} width="40px" />
                      <div className={css.fr_list_fl_text}>
                        <h6>@{v.nickname}</h6>
                        <p>nvited by @{v.fromNickname}</p>
                      </div>
                    </div>
                    <p className={css.fr_list_fr_text}>5 minutes ago</p>
                  </li>
                ))}
              </ul>
            }
          />
        </div>
      }
    />
  )
})
export default ActiveTVLLeaderboard
