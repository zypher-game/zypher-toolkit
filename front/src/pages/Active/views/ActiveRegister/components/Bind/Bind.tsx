import { LoadingButton, preStaticUrl, SvgComponent, useActiveWeb3React, useRecoilValue, useSetRecoilState } from '@ui/src'
import { ActivePixelButton, ActivePixelCard } from '@ui/src'
import React, { memo, useCallback, useEffect, useState } from 'react'

import PixelTooltip from '@/pages/Active/components/PixelTooltip/PixelTooltip'
import { canNext } from '@/pages/Active/hooks/activeHooks'
import { useActiveData } from '@/pages/Active/hooks/useActiveData'
import { useGetDataCall } from '@/pages/Active/hooks/useDataCall'
import classnames from '@/utils/classnames'

import css from './Bind.module.styl'
const Bind = memo(({ CheckPointHandle, CheckTwitterHandle }: { CheckPointHandle: any; CheckDiscordHandle: any; CheckTwitterHandle: any }) => {
  const { activeData, setActiveData } = useActiveData()
  const { account, chainId } = useActiveWeb3React()
  const { invitationCode, twitter } = activeData
  const [isClick, setIsClick] = useState(false)
  const { getUserInfo } = useGetDataCall()
  const shareOnTwitter = useCallback(() => {
    CheckTwitterHandle()
    setIsClick(true)
  }, [])

  const handleVisibilityChange = useCallback(async () => {
    if (!document.hidden && account && chainId) {
      if (isClick && canNext(account, chainId)) {
        setIsClick(false)
        try {
          const userInfo = await getUserInfo({ isInit: false, chainId })
          setActiveData(pre => ({
            ...pre,
            ...userInfo
          }))
        } catch {
          setActiveData(pre => ({ ...pre, twitter: { ...pre.twitter, isLoading: false } }))
        }
      }
    }
  }, [isClick, chainId, chainId])

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
        fl={'2. Follow @Zypher_network on Twitter'}
        fr={<FrStatus label={twitter.nickname} isLoading={twitter.isLoading} btnLabel="Link to Twitter" onClick={shareOnTwitter} />}
      />
      {/* <LiItem
          fl={'3. Join Zypher Games Discord'}
          fr={<FrStatus label={discord.nickname} isLoading={discord.isLoading} btnLabel="Link to Discord" onClick={CheckDiscordHandle} />}
        /> */}
      <LiItem fl={'3. Check your airdrop points'} fr={<FrStatus label="" isLoading={false} btnLabel="Connect Wallet" onClick={CheckPointHandle} />} />
    </ul>
  )
})
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
