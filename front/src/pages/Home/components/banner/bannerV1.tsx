import { useIsW768 } from '@ui/src'
import { preStaticUrl } from '@ui/src'
import { isEqual } from 'lodash'
import React, { FC, memo, useCallback } from 'react'

import { toBingoHref } from '@/utils/toBingoHref'

import { IBingoPointApi } from '../hooks'
import css from './bannerv1.module.stylus'

const BannerV1Widget: FC<IBingoPointApi> = memo(() => {
  const isMobile = useIsW768()
  const flOnclikHandle = useCallback(() => {
    return toBingoHref()
  }, [])
  const frOnclikHandle = useCallback(() => {
    window.open('https://medium.com/@ZypherGames/slide-into-the-future-with-z2048-5ad3328fe4b1', '_blank')
  }, [])
  return (
    <>
      <div className={css.header}>
        <div className={css.headerFl}>
          <div className={css.banner} onClick={flOnclikHandle}>
            <img src={preStaticUrl + `/img/home/banner01bgV1.png`} alt="zbingo" className={css.bannerbg} />
          </div>
        </div>
        <div className={css.headerFr} onClick={frOnclikHandle}>
          <img src={preStaticUrl + `/img/home/banner02bgV1.png`} alt="points" className={css.bannerbg} />
        </div>
      </div>
      {/* <InvitationWidget isMobile={isMobile} /> */}
    </>
  )
}, isEqual)

export default BannerV1Widget
