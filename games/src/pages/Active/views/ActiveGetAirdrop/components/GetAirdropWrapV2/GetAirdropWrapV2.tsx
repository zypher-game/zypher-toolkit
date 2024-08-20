import { accountInfoDialogState, ActivePixelButtonColor, useDisconnect, useIsW768, useRecoilState } from '@ui/src'
import React, { memo, useCallback } from 'react'

import PixelTooltip from '@/pages/Active/components/PixelTooltip/PixelTooltip'
import { useToPath } from '@/pages/Active/hooks/useToPath'

import css from './GetAirdropWrapV2.module.styl'

const GetAirdropWrapV2 = memo(({ title, frImgPath }: { title: React.ReactNode; frImgPath: string }) => {
  const isW768 = useIsW768()
  const { disconnect } = useDisconnect()
  const [, setAccountInfoDialogOpen] = useRecoilState(accountInfoDialogState)
  const { keepGoingHandle } = useToPath()
  const loginOut = useCallback(() => {
    setAccountInfoDialogOpen(false)
    disconnect()
  }, [disconnect])
  return (
    <div className={css.inner}>
      <div className={css.fl}>
        <div className={css.title}>{title}</div>
        <p className={css.text}>If you have a more active wallet, check that.</p>
        <p className={css.text}>
          Otherwise, you can still use this wallet to <strong>stake assets</strong> and <strong>invite friends</strong> to earn rewards.
        </p>
        <ActivePixelButtonColor
          themeType="brightBlue"
          onClick={keepGoingHandle}
          className={css.link}
          width={isW768 ? '100%' : '200px'}
          height={isW768 ? '48px' : '52px'}
          pixel_height={5}
        >
          <p>Keep Going</p>
        </ActivePixelButtonColor>
        <div className={css.linkA}>
          <p onClick={loginOut}>Try another wallet</p>
          <PixelTooltip title={['Please switch your account address in the wallet']} />
        </div>
      </div>
      <img decoding="async" loading="lazy" src={frImgPath} className={css.img} />
    </div>
  )
})
export default GetAirdropWrapV2
