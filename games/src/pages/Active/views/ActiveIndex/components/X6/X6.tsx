import { ActivePixelButton, PixelTableBorder } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo } from 'react'

import { x6Path } from '../../config/config'
import SubText from '../comp/SubText'
import Title from '../comp/Title'
import css from './X6.module.styl'
interface IItem {
  title: string
  subTitle: string
  index: string
  isGameFi: boolean
  isLayer3: boolean
  isTreasureArk: boolean
  isStar: boolean
  treasureArk?: {
    amount: string
    label: string
  }
}
const list = [
  {
    title: 'Base Yeild',
    isStar: false,
    subTitle: '4% fixed yield on ETH',
    index: '1',
    isGameFi: true,
    isLayer3: true,
    isTreasureArk: true
  },
  {
    title: 'Double Happiness',
    isStar: false,
    subTitle: 'LXP Rewards (Linea LRT)',
    index: '2',
    isGameFi: false,
    isLayer3: false,
    isTreasureArk: true
  },
  {
    title: 'Triple Happiness',
    isStar: false,
    subTitle: 'LXP Rewards (Zypher Rewards)',
    index: '3',
    isGameFi: false,
    isLayer3: false,
    isTreasureArk: true
  },
  {
    title: 'Quadra Happiness',
    isStar: false,
    subTitle: 'Risk-Free Rewards ($GP)',
    index: '4',
    isGameFi: false,
    isLayer3: false,
    isTreasureArk: true
  },
  {
    title: 'Penta Happiness',
    isStar: true,
    subTitle: 'Zypher Points',
    index: '5',
    isGameFi: false,
    isLayer3: false,
    isTreasureArk: true,
    treasureArk: {
      amount: '400,000,000',
      label: 'Zypher Tokens for Airdrop!'
    }
  },
  {
    title: 'Hexa Happiness',
    isStar: true,
    subTitle: 'Issue games and earn extra revenue',
    index: '6',
    isGameFi: false,
    isLayer3: false,
    isTreasureArk: true
  }
]
const X6 = memo(() => {
  return (
    <div className={css.x6}>
      <Title label="6x Rewards, 6x Happiness" />
      <SubText label="Our Reward System" />
      <img src={x6Path + '/bg.jpg'} className={css.bg} />
      <div className={css.inner_inner}>
        <img src={x6Path + '/banner_bg.png'} className={css.banner_bg} />
        <div className={css.table_wrap}>
          <PixelTableBorder
            className={css.table}
            headerBackgroundColor="#293457"
            backgroundColor="#1D263B"
            pixel_height={7}
            header_children={
              <div className={css.header}>
                <div className={css.col1} />
                <p className={css.col2}>Game Fi</p>
                <p className={css.col3}>Layer-3</p>
                <div className={css.col4}>
                  <img src={x6Path + '/treasure_ark.png'} className={css.treasure_ark} />
                </div>
              </div>
            }
            body_children={
              <>
                {list.map(v => (
                  <Item key={v.index} item={v} />
                ))}
              </>
            }
          />
          <div className={css.table_bg}>
            <ActivePixelButton backgroundColor="#000" pixel_height={6} className={css.table_bg1} />
            <ActivePixelButton backgroundColor="#000" pixel_height={6} className={css.table_bg2} />
          </div>
        </div>
      </div>
    </div>
  )
}, isEqual)
const Item = memo(({ item, className, onClick }: { item: IItem; className?: string; onClick?: any }) => {
  return (
    <ActivePixelButton backgroundColor="#3B4150" pixel_height={6} className={`${css.cover} ${className ?? ''}`} onClick={onClick}>
      <div className={css.row}>
        <div className={`${css.col1} ${css.col1_1}`}>
          <img src={x6Path + '/' + item.index + '.svg'} />
          <div className={css.text}>
            <h2>
              {item.title}
              {item.isStar ? <img src={x6Path + '/star.png'} /> : null}
            </h2>
            <p>{item.subTitle}</p>
          </div>
        </div>
        <div className={css.col2}>
          <img src={x6Path + '/' + (item.isGameFi ? 'ok' : 'failed') + '.png'} className={css.ok} />
        </div>
        <div className={css.col3}>
          <img src={x6Path + '/' + (item.isLayer3 ? 'ok' : 'failed') + '.png'} className={css.ok} />
        </div>
        <div className={`${css.col4} ${css.col4_41}`}>
          <img src={x6Path + '/ok02.png'} className={css.ok02} />
          {item.treasureArk ? (
            <div className={css.detail}>
              <img src={x6Path + '/400,000,000.png'} />
              <p>{item.treasureArk.label}</p>
            </div>
          ) : null}
        </div>
      </div>
      {item.index === `${list.length}` ? null : <div className={css.line} />}
    </ActivePixelButton>
  )
}, isEqual)
export default X6
