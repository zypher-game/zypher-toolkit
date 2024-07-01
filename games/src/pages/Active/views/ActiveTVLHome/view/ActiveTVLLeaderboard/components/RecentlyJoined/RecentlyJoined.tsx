import { ListWithMotion, PixelTableBorder, useIsW768 } from '@ui/src'
import React, { memo } from 'react'

import { IRecentUser } from '@/pages/Active/hooks/useLeaderboard'
import { getNicknameStr } from '@/pages/Active/utils/getNicknameStr'

import Avatar from '../../../../components/Avatar/Avatar'
import css from './RecentlyJoined.module.styl'
const RecentlyJoined = memo(({ recentUser }: { recentUser: IRecentUser[] }) => {
  const isW768 = useIsW768()
  return (
    <PixelTableBorder
      className={css.border}
      classNameHeader="RecentlyJoined_header"
      pixel_height={6}
      header_children={<p className={css.fr_title}>Recently Joined</p>}
      body_children={
        recentUser.length ? (
          <ListWithMotion<IRecentUser>
            parentClassName={css.fr_ul}
            data={recentUser}
            renderItem={item => (
              <>
                <div className={css.fr_list_fl}>
                  <Avatar src={item.headImg} nickname={item.nickname} width={isW768 ? '36px' : '40px'} />
                  <div className={css.fr_list_fl_text}>
                    <h6>{getNicknameStr(item.nickname)}</h6>
                    <p>Invited by {getNicknameStr(item.fromNickname)}</p>
                  </div>
                </div>
                <p className={css.fr_list_fr_text}>{item.joinTimeStr}</p>
              </>
            )}
          />
        ) : (
          <ul className={css.fr_ul} />
        )
      }
    />
  )
})
export default RecentlyJoined
