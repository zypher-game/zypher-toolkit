import { isEqual } from 'lodash'
import React, { memo } from 'react'

import { getPath } from '../../config/config'
import Bg from '../comp/Bg'
import Title from '../comp/Title'
import css from './Get.module.styl'
const Get = memo(() => {
  return (
    <div className={css.get}>
      <div className={css.bg}>
        <Bg src={getPath + '/bg.jpg'} />
      </div>
      <div className={css.get_inner}>
        <div className={css.title}>
          <div className={css.title_label}>
            <Title label="Get your CR Hero" />
            <Title label="Mystery Box!" />
          </div>
          <img src={getPath + '/title.png'} className={css.title_bg} />
        </div>
        <div className={css.banner}>
          <img src={getPath + '/banner.png'} className={css.banner_img} />
          <div className={css.banner_inner}>
            <img src={getPath + '/box.png'} className={css.box} />
            <p className={css.text}>- Claim coming Soon -</p>
          </div>
        </div>
        <div className={css.inner}>
          <div className={css.fl}>
            <img src={getPath + '/cr.png'} />
          </div>
          <div className={css.fr}>
            <h4 className={css.inner_title}>Trade on the</h4>
            <img src={getPath + '/sub_title.png'} className={css.sub_title} />
            <p
              className={css.margin}
            >{`CryptoRumble (CR) is a match-3 game where players defeat monsters and upgrade their characters, available on the Zypher platform.`}</p>
            <p>{`Join the Treasure Ark event for free CR Mystery Box giveaways, play the game, and unlock extra rewards and airdrop opportunities!`}</p>
            <div className={css.list}>
              <img src={getPath + '/list1.png'} />
              <img src={getPath + '/list2.png'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}, isEqual)
export default Get
