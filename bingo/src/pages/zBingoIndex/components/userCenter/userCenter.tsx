import { getShortenAddress, PlayerAvatar, useIsMobile } from '@zypher-game/toolkit/ui'
import { isEqual } from 'lodash'
import React, { memo } from 'react'

import { IBingoVersion } from '@/pages/state/state'

import { useGetProfileFromGraph } from '../../hooks/useGetProfileFromGraph'
import LevelIcon from '../icon/LevelIcon'
import css from './userCenter.module.stylus'

const UserCenter = memo(() => {
  const isMobile = useIsMobile()
  const { gamesLen, gamesWon, gamesWonNumber, winningPercent, account, bingoVersion } = useGetProfileFromGraph()
  // const { hasMonsterNft } = useMonster()
  if (!account) {
    return <></>
  }
  return (
    <div className={css.userCenter}>
      <PlayerAvatar account={account} showAccount={false} size={isMobile ? 40 : 62} />
      <div className={css.userAddress}>
        <p className={css.addressLabel}>{getShortenAddress(account)}</p>
        {bingoVersion === IBingoVersion.v1 ? <LevelIcon gamesWonNumber={gamesWonNumber} /> : null}
        {/* <MonsterIcon hasMonsterNft={hasMonsterNft} /> */}
      </div>
      <ul className={css.userInfo}>
        <Item amount={gamesLen} label="Games" />
        <Item amount={gamesWon} label="Games Won" />
        <Item amount={winningPercent + '%'} label="Winning" />
      </ul>
    </div>
  )
}, isEqual)
const Item = memo(({ amount, label }: { amount: string; label: string }) => {
  return (
    <li>
      <p>
        <strong>{amount}</strong>
        {label}
      </p>
    </li>
  )
}, isEqual)
export default UserCenter
