import { ITvlHero, preStaticUrl } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo } from 'react'

import HeroImageLoader from '@/pages/Active/components/ImageLoader/HeroImageLoader'

import { whyPath } from '../../config/config'
import Title from '../comp/Title'
import css from './Why.module.styl'
interface IItem {
  icon: string
  title: string
  details: string[]
}
const list = [
  {
    icon: 'icon1',
    title: 'Zero Gas, Only Zypher can do.',
    details: [
      'Zypher offers a unique zero-gas experience on Zytron L3, making gaming more seamless and affordable. ',
      'Through the use of Gasless SBTs (Soulbound Tokens), players can enjoy uninterrupted gameplay without worrying about gas fees.'
    ]
  },
  {
    icon: 'icon2',
    title: 'Revolutionary High Yield.',
    details: [
      'Treasure Ark participants unlock high-yield rewards through staking and gameplay. Zypher’s zk-powered infrastructure is fully programmable, composable, and verifiable on-chain, enabling DeFi-like composability and enhanced rewards.'
    ]
  }
]
const Why = memo(() => {
  return (
    <div className={css.why}>
      <img src={whyPath + '/bg.jpg'} className={css.bg} />
      <div className={css.title}>
        <div className={css.title_label}>
          <Title label="Why Treasure ark?" />
        </div>
        <img src={whyPath + '/title.png'} className={css.title_bg} />
      </div>
      <div className={css.dashboard}>
        <div className={css.dashboard_inner}>
          {list.map(v => (
            <Item key={v.title} item={v} />
          ))}
        </div>
        <img src={whyPath + '/book.png'} className={css.book} />
        <img src={whyPath + '/earth.png'} className={css.earth} />
      </div>
      <div className={css.hero}>
        {Object.values(ITvlHero).map(heroKey => (
          <HeroImageLoader key={heroKey} heroKey={heroKey} className={css.hero_big} level={'1'} />
        ))}
      </div>
    </div>
  )
}, isEqual)
const Item = memo(({ item }: { item: IItem }) => {
  return (
    <div className={css.item}>
      <div className={css.fl}>
        <img src={whyPath + '/' + item.icon + '.png'} className={css.icon} />
      </div>
      <div className={css.fr}>
        <h3>{item.title}</h3>
        {item.details.map(v => (
          <p key={v}>{v}</p>
        ))}
      </div>
    </div>
  )
}, isEqual)
export default Why
