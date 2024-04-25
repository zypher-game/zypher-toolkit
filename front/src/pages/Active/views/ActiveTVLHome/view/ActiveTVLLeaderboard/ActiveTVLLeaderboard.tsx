import React, { memo } from 'react'

import { PixelTableBorder } from '@/pages/Active/components/PixelTable/PixelTable'
import { useLeaderboard } from '@/pages/Active/hooks/useLeaderboard'

import Avatar from '../../components/Avatar/Avatar'
import TVLWrap from '../TVLWrap'
import css from './ActiveTVLLeaderboard.module.styl'
import LeaderBoardRow from './components/LeaderBoardRow/LeaderBoardRow'

const ActiveTVLLeaderboard = memo(() => {
  const { recentUser } = useLeaderboard()
  const list = [
    {
      index: 1,
      avatar: '',
      nickname: 'Daniel',
      invitedBy: 'Invited by @Lanetta',
      amount: '2348901'
    },
    {
      index: 2,
      avatar: '',
      nickname: 'Daniel',
      invitedBy: 'Invited by @Lanetta',
      amount: '2348901'
    },
    {
      index: 3,
      avatar: '',
      nickname: 'Daniel',
      invitedBy: 'Invited by @Lanetta',
      amount: '2348901'
    },
    {
      index: 4,
      avatar: '',
      nickname: 'Daniel',
      invitedBy: 'Invited by @Lanetta',
      amount: '2348901'
    }
  ]
  const my = {
    index: 4,
    avatar: '',
    nickname: 'Daniel',
    invitedBy: 'Invited by @Lanetta',
    amount: '2348901'
  }
  return (
    <TVLWrap
      fl_children={
        <>
          <h2 className={css.fl_title}>Leaderboard</h2>
          <p className={css.fl_grey}>Restaking & invite friends to improve your ranking!</p>
          <div className={css.fl_list}>
            {[...list, ...list, ...list, ...list].map((v, index) => (
              <LeaderBoardRow key={index} {...v} />
            ))}
          </div>
          <LeaderBoardRow {...my} isMy={true} />
        </>
      }
      fr_children={
        <>
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
        </>
      }
    />
  )
})
export default ActiveTVLLeaderboard
