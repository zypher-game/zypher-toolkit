import { isEqual } from 'lodash'
import React, { memo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { preAirdropPathname } from '@/pages/Active/hooks/activeHooks'

import { bannerPath } from '../../config/config'
import Bg from '../comp/Bg'
import Nav from '../Nav/Nav'
import css from './banner.module.styl'

const Banner = memo(() => {
  const navigate = useNavigate()
  const toPathHandle = useCallback(() => {
    navigate(`/${preAirdropPathname}`)
  }, [])
  return (
    <div className={css.banner}>
      <Nav />
      <div className={css.bg}>
        <Bg src={bannerPath + '/bg.jpg'} />
      </div>
      <div className={css.text}>
        <div className={css.anim}>
          <img src={bannerPath + '/title.png'} className={css.title} />
          <img src={bannerPath + '/sub.png'} className={css.sub} />
          <img src={bannerPath + '/eth.png'} className={css.eth} />
          <img src={bannerPath + '/v.png'} className={css.v} />
          <img src={bannerPath + '/zytron.png'} className={css.zytron} />
        </div>
        <img src={bannerPath + '/start.png'} className={css.start} onClick={toPathHandle} />
      </div>
    </div>
  )
}, isEqual)
export default Banner
