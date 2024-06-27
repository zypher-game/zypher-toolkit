import {
  CurrencyLogo,
  CurrencyLogoComp,
  getShortenAddress,
  PixelBorderCard,
  PlayerAvatar,
  PointsIcon,
  useActiveWeb3React,
  useNativeBalanceStr,
  usePointsBalanceStr
} from '@ui/src'
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
          chainId={chainId}
          account={account}
          size={isMobile ? 64 : 80}
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
    <PixelBorderCard className={css.balanceItem} pixel_height={5} height="40px" backgroundColor="#1D263B" borderColor="#3A4254">
      {logo}
      <p>{balanceStr}</p>
    </PixelBorderCard>
  )
}, isEqual)
const ShowAvatarBorderWidget = memo(({ children }: { children: React.ReactNode }) => {
  return <div className={css.avatarBorder}>{children}</div>
}, isEqual)

export default ProfileBanner
