import { preStaticUrl } from '@ui/src'
import BigNumber from 'bignumber.js'
import { isEqual } from 'lodash'
import React, { FC, memo, useMemo } from 'react'

import BingoPlayerAvatar from '@/components/BingoPlayerAvatar/BingoPlayerAvatar'

import css from './RankB3Col.module.stylus'

type IProp = {
  rank: string
  account: string
  name?: string
  isMobile: boolean
  showLine?: boolean
  otherStr?: string
}
const RankB3Col: FC<IProp> = memo(({ rank, account, name, isMobile, otherStr }: IProp) => {
  const rankId = useMemo(() => {
    if (rank && rank !== 'undefined') {
      if (`${rank}` !== '0' && new BigNumber(rank).isLessThan(4)) {
        return <img decoding="async" loading="lazy" className={css.img} src={preStaticUrl + `/img/bingo/ranking${rank}.png`} title="ranking" />
      }
      return <p className={css.p}>{`${rank}` !== '0' ? rank : '+99'}</p>
    }
    return undefined
  }, [rank])
  const accountData = useMemo(() => {
    if (isMobile) {
      return {
        preLen: 3,
        endLen: 3,
        size: 20
      }
    }
    return {
      preLen: undefined,
      endLen: undefined,
      size: 40
    }
  }, [isMobile])
  return (
    <div className={css.rank}>
      {rankId && <div className={css.rankIcon}>{rankId}</div>}
      <BingoPlayerAvatar
        name={name}
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
export default RankB3Col
