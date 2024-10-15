import { isEqual } from 'lodash'
import React, { memo } from 'react'

import { bannerPath } from '../../config/config'
import Nav from '../Nav/Nav'
import css from './banner.module.styl'

const Banner = memo(() => {
  return (
    <div className={css.banner}>
      <Nav />
      <img src={bannerPath + '/bg.jpg'} className={css.bg} />

      <div className={css.text}>
        <img src={bannerPath + '/title.png'} className={css.title} />
        <img src={bannerPath + '/sub.png'} className={css.sub} />
        <img src={bannerPath + '/start.png'} className={css.start} />
        <img src={bannerPath + '/eth.png'} className={css.eth} />
        <img src={bannerPath + '/v.png'} className={css.v} />
        <img src={bannerPath + '/zytron.png'} className={css.zytron} />
      </div>
    </div>
  )
}, isEqual)
export default Banner
