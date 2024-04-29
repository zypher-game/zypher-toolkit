import React, { memo } from 'react'

import { ActivePixelButtonColor } from '@UI/src/'
import { useToPath } from '@/pages/Active/hooks/useToPath'

import css from './GetAirdropWrapV2.module.styl'

const GetAirdropWrapV2 = memo(({ title, frImgPath }: { title: React.ReactNode; frImgPath: string }) => {
  const { keepGoingHandle } = useToPath()
  return (
    <div className={css.inner}>
      <div className={css.fl}>
        <div className={css.title}>{title}</div>
        <p className={css.text}>If you have a more active wallet, check that wallet.</p>
        <p className={css.text}>
          Alternatively, you can still use this wallet to <strong>stake assets</strong> and <strong>invite friends</strong> to earn more points.
        </p>
        <ActivePixelButtonColor className={css.link} width="200px" height="52px" pixel_height={5}>
          <p>Try another wallet</p>
        </ActivePixelButtonColor>
        <div className={css.linkA}>
          <p onClick={keepGoingHandle}>Keep Going</p>
        </div>
      </div>
      <img src={frImgPath} className={css.img} />
    </div>
  )
})
export default GetAirdropWrapV2