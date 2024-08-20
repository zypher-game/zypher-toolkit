import { getShortenAddress, GlobalVar, TelegramUserInfoState, useIsW768, useRecoilValue } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo } from 'react'

import BingoPlayerAvatar from '@/components/BingoPlayerAvatar/BingoPlayerAvatar'
import { IBingoVersion } from '@/pages/state/state'

import { useGetProfileFromGraph } from '../../hooks/useGetProfileFromGraph'
import LevelIcon from '../icon/LevelIcon'
import css from './userCenter.module.stylus'

const UserCenter = memo(() => {
  const isMobile = useIsW768()
  const { gamesLen, gamesWon, gamesWonNumber, winningPercent, account, bingoVersion } = useGetProfileFromGraph()
  const userInfo = useRecoilValue(TelegramUserInfoState)
  // const { hasMonsterNft } = useMonster()
  if (!account) {
    return <></>
  }
  return (
    <div className={`${css.userCenter} ${window.IS_TELEGRAM ? css.userTgCenter : ''}`}>
      <BingoPlayerAvatar account={account} showAccount={false} size={isMobile ? (window.IS_TELEGRAM ? 50 : 40) : 62} />
      <div className={css.userAddress}>
        <p className={css.addressLabel}>{GlobalVar.IS_TELEGRAM ? userInfo?.name ?? 'BingoPlayer' : getShortenAddress(account)}</p>
        {bingoVersion === IBingoVersion.v1 ? <LevelIcon gamesWonNumber={gamesWonNumber} /> : null}
        {/* <MonsterIcon hasMonsterNft={hasMonsterNft} /> */}
      </div>
      <ul className={css.userInfo}>
        <Item amount={gamesLen} label="Games" />
        <Item amount={gamesWon} label="Games Win" />
        <Item amount={winningPercent + '%'} label="Winning" />
        {GlobalVar.IS_TELEGRAM ? <Item amount={userInfo?.star ?? '0'} label="Points" /> : null}
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
