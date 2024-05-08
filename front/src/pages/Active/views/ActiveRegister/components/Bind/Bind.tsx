import { LoadingButton, preStaticUrl, SvgComponent, useRecoilValue, useSetRecoilState } from '@ui/src'
import { ActivePixelButton, ActivePixelCard } from '@ui/src'
import React, { memo, useCallback, useEffect, useState } from 'react'

import PixelTooltip from '@/pages/Active/components/PixelTooltip/PixelTooltip'
import { useGetDataCall } from '@/pages/Active/hooks/useDataCall'
import { activeDataState } from '@/pages/Active/state/activeState'
import classnames from '@/utils/classnames'

import css from './Bind.module.styl'
const Bind = memo(
  ({ CheckPointHandle, CheckDiscordHandle, CheckTwitterHandle }: { CheckPointHandle: any; CheckDiscordHandle: any; CheckTwitterHandle: any }) => {
    const setActiveData = useSetRecoilState(activeDataState)
    const activeData = useRecoilValue(activeDataState)
    const { invitationCode, twitter, discord } = activeData
    const [isClick, setIsClick] = useState(false)
    const { getUserInfo } = useGetDataCall()
    const shareOnTwitter = useCallback(() => {
      CheckTwitterHandle()
      setIsClick(true)
    }, [])

    const handleVisibilityChange = useCallback(async () => {
      if (!document.hidden) {
        if (isClick) {
          setIsClick(false)
          const userInfo = await getUserInfo(false)
          setActiveData(pre => ({
            ...pre,
            ...userInfo
          }))
        }
      }
    }, [isClick])

    useEffect(() => {
      document.addEventListener('visibilitychange', handleVisibilityChange)
      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange)
      }
    }, [handleVisibilityChange])

    return (
      <ul className={css.bind}>
        <LiItem
          fl={
            <div className={css.tooltip}>
              <p>1. Enter the invitation code</p>
              <PixelTooltip title="Create your team through invitation codes and unlock more airdrop point cards!" />
            </div>
          }
          fr={<FrStatus label={invitationCode} isLoading={false} />}
        />
        <LiItem
          fl={'2. Follow @Zypher_Games on Twitter'}
          fr={<FrStatus label={twitter.nickname} isLoading={twitter.isLoading} btnLabel="Link to Twitter" onClick={shareOnTwitter} />}
        />
        {/* <LiItem
          fl={'3. Join Zypher Games Discord'}
          fr={<FrStatus label={discord.nickname} isLoading={discord.isLoading} btnLabel="Link to Discord" onClick={CheckDiscordHandle} />}
        /> */}
        <LiItem
          fl={'3. Check your airdrop points'}
          fr={<FrStatus label="" isLoading={false} btnLabel="Connect Wallet" onClick={CheckPointHandle} />}
        />
      </ul>
    )
  }
)
const FrStatus = memo(({ label, btnLabel, onClick, isLoading }: { label?: string; btnLabel?: string; onClick?: any; isLoading?: boolean }) => {
  if (label) {
    return (
      <div className={css.label}>
        <p>{label}</p>
        <SvgComponent src={preStaticUrl + '/img/icon/pixel_success.svg'} />
      </div>
    )
  }
  return (
    <ActivePixelButton
      isLoading={isLoading}
      className={classnames(css.linkBtn)}
      onClick={onClick}
      width="170px"
      height="36px"
      pixel_height={5}
      backgroundColor="#1649FF"
    >
      <p>{btnLabel}</p>
      <LoadingButton isLoading={isLoading} />
    </ActivePixelButton>
  )
})
const LiItem = memo(({ fl, fr }: { fl: any; fr: any }) => {
  return (
    <li className={css.liItem}>
      <ActivePixelCard className="bind_liBg" pixel_height={2} backgroundColor="#1D263B">
        {typeof fl === 'string' ? <p>{fl}</p> : fl}
        {typeof fr === 'string' ? <p>{fr}</p> : fr}
      </ActivePixelCard>
    </li>
  )
})
export default Bind
