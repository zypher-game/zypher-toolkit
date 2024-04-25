import {
  CurrencyLogo,
  CurrencyLogoComp,
  getShortenAddress,
  PlayerAvatar,
  PointsIcon,
  useActiveWeb3React,
  useNativeBalanceStr,
  usePointsBalanceStr
} from '@UI/src/'
import { isEqual } from 'lodash'
import React, { memo } from 'react'

import css from './profileBanner.module.stylus'
type IProps = {
  account?: string
  isMobile: boolean
}
const ProfileBanner = memo(({ account, isMobile }: IProps) => {
  const { chainId } = useActiveWeb3React()
  const nativeBalanceStr = useNativeBalanceStr()
  const pointsBalanceStr = usePointsBalanceStr()

  return (
    <div className={css.header}>
      <div className={css.bannerInner}>
        <PlayerAvatar
          className={css.account}
          account={account}
          size={isMobile ? 64 : 100}
          showAccount={false}
          AvatarBorder={ShowAvatarBorderWidget}
        />
        {account ? (
          <div className={css.box}>
            <div className={css.address}>
              <p>{getShortenAddress(account)}</p>
            </div>
            <div className={css.balance}>
              <BalanceItem logo={<PointsIcon isMobile={isMobile} classname={css.points} />} balanceStr={pointsBalanceStr} />
              <BalanceItem logo={<CurrencyLogoComp src={CurrencyLogo[chainId]} />} balanceStr={nativeBalanceStr} />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}, isEqual)

type IBalanceItemProps = {
  balanceStr?: string
  logo: React.ReactNode
}
const BalanceItem = memo(({ balanceStr, logo }: IBalanceItemProps) => {
  return (
    <div className={css.balanceItem}>
      {logo}
      <p>{balanceStr}</p>
    </div>
  )
}, isEqual)
const ShowAvatarBorderWidget = memo(({ children }: { children: React.ReactNode }) => {
  return <div className={css.avatarBorder}>{children}</div>
}, isEqual)

export default ProfileBanner
