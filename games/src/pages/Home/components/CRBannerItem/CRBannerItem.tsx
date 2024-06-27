import { preStaticUrl } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo } from 'react'

import css from './CRBannerItem.module.stylus'
const CRBannerItem = memo(() => {
  return (
    <div
      className={css.crBanner}
      onClick={() => {
        window.open('https://twitter.com/Zypher_network/status/1763459766066774238', '_blank')
      }}
    >
      <img src={preStaticUrl + '/img/home/cr_bg.jpg'} alt="cr_bg" className={css.cr_bg} />
      <div className={css.cr_fr}>
        <img src={preStaticUrl + '/img/home/cr_light.png'} alt="cr_light" className={css.cr_light} />
        <img src={preStaticUrl + '/img/home/cr_monster01.png'} alt="cr_monster01" className={css.cr_monster01} />
        <img src={preStaticUrl + '/img/home/cr_monster02.png'} alt="cr_monster02" className={css.cr_monster02} />
      </div>
      <div className={css.cr_fl}>
        <div className={css.cr_title}>
          <img src={preStaticUrl + '/img/home/cr_title.png'} alt="cr_title" />
          <img src={preStaticUrl + '/img/home/cr_title.png'} alt="cr_title" />
        </div>
        <div className={css.cr_subTitle}>
          <img src={preStaticUrl + '/img/home/cr_subTitle.png'} alt="cr_subTitle" />
          <img src={preStaticUrl + '/img/home/cr_subTitle.png'} alt="cr_subTitle" />
        </div>
      </div>
      <div className={css.fireBg}>
        <div className={css.fireworks01} />
        <div className={css.fireworks02} />
        <div className={css.fireworks03} />
      </div>
    </div>
  )
}, isEqual)
export default CRBannerItem
