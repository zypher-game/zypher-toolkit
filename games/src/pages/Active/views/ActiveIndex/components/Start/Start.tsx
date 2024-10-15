import { PixelBorderCard } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo } from 'react'

import { startPath } from '../../config/config'
import SubText from '../comp/SubText'
import Title from '../comp/Title'
import css from './Start.module.styl'
const Start = memo(() => {
  return (
    <div className={css.start}>
      <img src={startPath + '/bg.jpg'} alt="" className={css.bg} />
      <div className={css.inner}>
        <Title label="Start your Treasure Ark" />
        <SubText label="Maximize Your Staking Return on Linea!" />
        <div className={css.inner_inner}>
          <div className={css.fl}>
            <div className={css.top}>
              <img src={startPath + '/top_bg.png'} alt="" className={css.top_bg} />
              <div className={css.top_inner}>
                <img src={startPath + '/zytron02.png'} className={css.zytron02} />
                <p className={css.text}>-Zypher Tokens Earned through Staking-</p>
              </div>
            </div>
            <div className={css.bottom}>
              <PixelBorderCard className={css.list} pixel_height={8} backgroundColor="#1D263B" borderColor="#3A4254">
                <div className={css.list1}>
                  <div>
                    <img src={startPath + '/list1.png'} />
                  </div>
                  <div>
                    <img src={startPath + '/list2.png'} />
                  </div>
                </div>
                <div className={css.list2}>
                  <div>
                    <img src={startPath + '/list3.png'} />
                  </div>
                  <div>
                    <img src={startPath + '/list4.png'} />
                  </div>
                </div>
              </PixelBorderCard>
              <PixelBorderCard className={`${css.list} ${css.list22}`} pixel_height={8} backgroundColor="#1D263B" borderColor="#3A4254">
                <div className={css.list3}>
                  <div>
                    <img src={startPath + '/linea.png'} />
                  </div>
                  <div>
                    <img src={startPath + '/zytron.png'} />
                  </div>
                </div>
              </PixelBorderCard>
            </div>
          </div>
          <div className={css.fr}>
            <img src={startPath + '/lxp.png'} alt="lxp" className={css.lxp} />
          </div>
        </div>
      </div>
    </div>
  )
}, isEqual)
export default Start
