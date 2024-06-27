import { PlayerAvatar } from '@ui/src'
import { preStaticUrl } from '@ui/src'
import BigNumber from 'bignumber.js'
import { isEqual } from 'lodash'
import React, { FC, memo, useMemo } from 'react'

import css from './RankCol.module.stylus'

type IProp = { rank: string; account: string; isMobile: boolean; showLine?: boolean; otherStr?: string }
const RankCol: FC<IProp> = memo(({ rank, account, isMobile, showLine = false, otherStr }: IProp) => {
  const rankId = useMemo(() => {
    if (rank && rank !== 'undefined') {
      if (new BigNumber(rank).isLessThan(4)) {
        return <img decoding="async" loading="lazy" className={css.img} src={preStaticUrl + `/img/invitation/rank${rank}.svg`} title="invitation" />
      }
      return <p className={css.p}>#{rank}</p>
    }
    return undefined
  }, [rank])
  const accountData = useMemo(() => {
    if (isMobile) {
      return {
        preLen: 3,
        endLen: 3,
        size: 24
      }
    }
    return {
      preLen: undefined,
      endLen: undefined,
      size: 24
    }
  }, [isMobile])
  return (
    <div className={css.rank}>
      {rankId && <div className={css.rankIcon}>{rankId}</div>}
      {rankId && (!isMobile || showLine) && <div className={css.line} />}
      {!rankId && <div className={css.nospan} />}
      <PlayerAvatar
        className={css.account}
        account={account}
        size={accountData.size}
        showAccount={true}
        border={false}
        preLen={accountData.preLen}
        endLen={accountData.endLen}
        AvatarBorder={ShowAvatarBorderWidget}
        otherStr={otherStr}
      />
    </div>
  )
}, isEqual)
const ShowAvatarBorderWidget = memo(({ children }: { children: React.ReactNode }) => {
  return <div className={css.avatarBorder}>{children}</div>
})
export default RankCol
