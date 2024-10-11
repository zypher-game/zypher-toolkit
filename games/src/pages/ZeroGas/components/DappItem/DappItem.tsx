import { ActivePixelButtonColor, PixelBorderCard, useIsW768 } from '@ui/src'
import React, { memo, useCallback } from 'react'

import css from './DappItem.module.styl'

export type IDappItem = {
  logo: string
  title: string
  content: string
  Rewards?: string[]
  btnText: string
  link?: string
}
const DappItem = memo(({ item }: { item: IDappItem }) => {
  const isW768 = useIsW768()
  const toPath = useCallback(() => {
    if (item.link) {
      window.open(item.link)
    }
  }, [item.link])
  return (
    <PixelBorderCard className={css.dappCard} pixel_height={4} backgroundColor="#0c1220" borderColor="#3A4254">
      <div className={css.top}>
        <img decoding="async" loading="lazy" className={css.logo} src={item.logo} alt={item.title} />
        <h4 className={css.title}>{item.title}</h4>
        <p className={css.content}>{item.content}</p>
      </div>
      <div className={css.bottom}>
        {item.Rewards && item.Rewards.length ? (
          <PixelBorderCard className={css.rewards} backgroundColor="#343C4F" borderColor="#484F60" width="100%" pixel_height={4}>
            <p className={css.dappSmall}>Rewards</p>
            <div className={css.dappContent}>
              {item.Rewards.map(v => (
                <p key={v} className={css.text} dangerouslySetInnerHTML={{ __html: v }} />
              ))}
            </div>
          </PixelBorderCard>
        ) : (
          <div className={css.rewards} />
        )}
        <ActivePixelButtonColor
          themeType={'brightBlue'}
          pixel_height={3}
          height={isW768 ? '28px' : '36px'}
          disable={item.btnText.toLowerCase() === 'coming soon'}
          className={css.dappBtn}
          onClick={toPath}
        >
          <p>{item.btnText}</p>
        </ActivePixelButtonColor>
      </div>
    </PixelBorderCard>
  )
})
export default DappItem
