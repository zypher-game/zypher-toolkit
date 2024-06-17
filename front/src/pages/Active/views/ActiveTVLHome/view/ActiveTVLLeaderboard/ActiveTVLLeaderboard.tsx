import { useIsW768 } from '@ui/src'
import React, { memo, useCallback, useState } from 'react'

import { useLeaderBoard } from '@/pages/Active/hooks/useLeaderboard'

import ChainTab from '../../components/ChainTab/ChainTab'
import Tab from '../../components/Tab/Tab'
import TVLWrap from '../TVLWrap'
import css from './ActiveTVLLeaderboard.module.styl'
import ActiveTab from './components/ActiveTab/ActiveTab'
import LeaderBoardRow from './components/LeaderBoardRow/LeaderBoardRow'
import RecentlyJoined from './components/RecentlyJoined/RecentlyJoined'

const ActiveTVLLeaderboard = memo(() => {
  const isW768 = useIsW768()
  const [activeTab, setActiveTab] = useState(0)
  const { chainIndex, setChainIndex, recentUser, rankBoard, my } = useLeaderBoard()

  const changeChainIndexHandle = useCallback((index: number) => {
    setChainIndex(index)
  }, [])
  return (
    <TVLWrap
      fl_children={
        <>
          <h2 className={`${css.fl_title} ${css.pt30}`}>Leaderboard</h2>
          <p className={`${css.fl_grey} ${isW768 ? css.mb20 : css.mb40}`}>Staking & invite friends to improve your ranking!</p>
          {isW768 ? <ActiveTab index={activeTab} setIndex={setActiveTab} /> : null}
          <ChainTab chainIndex={chainIndex} changeChainIndexHandle={changeChainIndexHandle} />
          {(activeTab === 0 && isW768) || !isW768 ? (
            <>
              <div className={css.fl_list}>
                {rankBoard.map((v, index) => (
                  <LeaderBoardRow key={index} {...v} />
                ))}
              </div>
              {my ? <LeaderBoardRow {...my} isMy={true} /> : null}
            </>
          ) : null}
          {activeTab === 1 && isW768 ? <RecentlyJoined recentUser={recentUser} /> : null}
        </>
      }
      fr_children={
        <div className={css.fr}>
          <Tab />
          {isW768 ? null : <RecentlyJoined recentUser={recentUser} />}
        </div>
      }
    />
  )
})
export default ActiveTVLLeaderboard
