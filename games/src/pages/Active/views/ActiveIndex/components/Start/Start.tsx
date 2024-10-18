import { ActivePixelButton, PixelBorderCard } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo, useCallback } from 'react'

import { startPath } from '../../config/config'
import Bg from '../comp/Bg'
import SubText from '../comp/SubText'
import Title from '../comp/Title'
import css from './Start.module.styl'
const Start = memo(() => {
  const onClick = useCallback((url: string) => {
    window.open(url)
  }, [])
  return (
    <div className={css.start}>
      <div className={css.bg}>
        <Bg src={startPath + '/bg.jpg'} />
      </div>
      <div className={css.inner}>
        <Title label="Start your Treasure Ark" />
        <SubText label="Maximize Your Staking Return on Linea!" />
        <div className={css.inner_inner}>
          <div className={css.fl}>
            <div className={css.top}>
              <img src={startPath + '/top_bg.png'} alt="" className={css.top_bg} />
              <div className={css.top_inner}>
                <img src={startPath + '/zytron02.png'} className={css.zytron02} />
                <p className={css.text}>-Zypher Tokens for Campaign Rewards-</p>
              </div>
            </div>
            <img src={startPath + '/game.png'} className={css.game} />
            <div className={css.bottom}>
              <div className={css.list}>
                <img src={startPath + '/border1.png'} className={css.border1} />
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
              </div>
              <div className={`${css.list} ${css.list22}`}>
                <img src={startPath + '/border2.png'} className={css.border2} />
                <div className={css.list3}>
                  <ButtonShadow onClick={() => onClick('https://docs.linea.build/users/linea-voyage/lxp')} className={css.position}>
                    <img src={startPath + '/linea.png'} />
                  </ButtonShadow>
                  <ButtonShadow onClick={() => onClick('https://zytron.zypher.network/layer3')} className={css.position}>
                    <img src={startPath + '/zytron.png'} />
                  </ButtonShadow>
                </div>
              </div>
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

const ButtonShadow = memo(({ className, onClick, children }: { className: string; children: React.ReactNode; onClick: any }) => {
  return (
    <div className={`${css.positive} }`}>
      <ActivePixelButton backgroundColor="#3B4150" pixel_height={6} className={`${css.cover} ${className ?? ''}`} onClick={onClick}>
        {children}
      </ActivePixelButton>
      <div className={css.div_shadow}>
        <ActivePixelButton backgroundColor="#000000" pixel_height={6} className={`${className ?? ''}`}>
          <></>
        </ActivePixelButton>
      </div>
    </div>
  )
}, isEqual)
export default Start
