import { ActivePixelButtonColor, PixelBorderCard } from '@ui/src'
import React, { memo } from 'react'

import css from './DappItem.module.styl'

export type IDappItem = {
  logo: string
  title: string
  content: string
  Rewards?: string[]
  btnText: string
}
const DappItem = memo(({ item }: { item: IDappItem }) => {
  return (
    <PixelBorderCard className={css.dappCard} pixel_height={4} backgroundColor="#0d1425" borderColor="#3A4254">
      <img src={item.logo} alt={item.title} />
      <h4>{item.title}</h4>
      <p>{item.content}</p>
      <PixelBorderCard backgroundColor="#343C4F" borderColor="#3A4254" width="100%">
        <p className={css.dappSmall}>Rewards</p>
        <div className={css.dappContent}>
          {item.Rewards ? item.Rewards.map(v => <p key={v} dangerouslySetInnerHTML={{ __html: v }} />) : <p>Coming Soon</p>}
        </div>
      </PixelBorderCard>
      <ActivePixelButtonColor themeType="brightBlue" pixel_height={3} className={css.dappBtn}>
        <p>{item.btnText}</p>
      </ActivePixelButtonColor>
    </PixelBorderCard>
  )
})
export default DappItem
