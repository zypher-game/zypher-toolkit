import { ActivePixelButton, INavLink, INavLinkType, pointsDialogState, preStaticUrl, useNavItem, useSetRecoilState } from '@UI/src'
import React, { memo, useCallback, useMemo } from 'react'

import css from './GameItem.module.styl'
const GameItem = memo(() => {
  const items = useNavItem()
  const setPointsDialogState = useSetRecoilState(pointsDialogState)
  const showPointsModal = useCallback(() => {
    setPointsDialogState(true)
  }, [setPointsDialogState])
  const { gameList, disableGameList } = useMemo(() => {
    const obj: Record<'gameList' | 'disableGameList', INavLink[]> = {
      gameList: [],
      disableGameList: []
    }
    if (items && items.length) {
      obj.gameList = [
        ...(items.filter(v => v.type === INavLinkType.Games && !v.disabled) ?? []),
        {
          label: 'Gold Points',
          keyValue: 'points',
          icon: 'points.png',
          disabled: false,
          type: INavLinkType.Games,
          btn_label: 'Get More',
          onClick: showPointsModal,
          btn_background_color: '#264EDA'
        }
      ]
      obj.disableGameList = items.filter(v => v.type === INavLinkType.Games && v.disabled)
    }
    return obj
  }, [JSON.stringify(items)])
  return (
    <>
      {gameList.map(v => (
        <GameItemComp key={v.keyValue} item={v} />
      ))}
      <GameItemComingSoom disableGameList={disableGameList} />
    </>
  )
})
const GameItemComingSoom = memo(({ disableGameList }: { disableGameList: INavLink[] }) => {
  return (
    <div className={`${css.gameItemComp} ${css.gameItemCompComing}`}>
      <GameItemBgLeft />
      <GameItemMiddle>
        <div className={css.gameItemCompComingImg}>
          {disableGameList.map(item => (
            <img className={css.icon} key={item.keyValue} src={preStaticUrl + '/img/layout/' + item.icon} alt={item.label} />
          ))}
        </div>
        <p className={css.label}>Coming soon</p>
      </GameItemMiddle>
      <GameItemBgRight />
    </div>
  )
})
const GameItemComp = memo(({ item }: { item: INavLink }) => {
  return (
    <div className={`${css.gameItemComp} ${css[`gameItemComp${item.keyValue}`]}`}>
      <GameItemBgLeft />
      <GameItemMiddle className={css.game}>
        <img className={css.icon} src={preStaticUrl + '/img/layout/' + item.icon} alt={item.label} />
        <div className={css.fr}>
          <h4>{item.label}</h4>
          {item.content ? item.content(css.content) : null}
          <ActivePixelButton className={css.btn} pixel_height={2} backgroundColor={item.btn_background_color}>
            <p className={css.btn_label}>{item.btn_label}</p>
          </ActivePixelButton>
        </div>
      </GameItemMiddle>
      <GameItemBgRight />
    </div>
  )
})

const GameItemBgLeft = memo(() => {
  return (
    <div className={css.gameItemBgLeft}>
      <div className={css.item1} />
      <div className={css.item2} />
      <div className={css.item3} />
      <div className={css.item4}>
        <div className={css.item401} />
        <div className={css.item402} />
      </div>
      <div className={css.item5} />
      <div className={css.item6} />
      <div className={css.item7} />
    </div>
  )
})
const GameItemBgRight = memo(() => {
  return (
    <div className={css.gameItemBgRight}>
      <div className={css.item1} />
      <div className={css.item2} />
      <div className={css.item3} />
      <div className={css.item4}>
        <div className={css.item401} />
        <div className={css.item402} />
      </div>
      <div className={css.item5} />
      <div className={css.item6} />
      <div className={css.item7} />
    </div>
  )
})
const GameItemMiddle = memo(({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={css.gameItemMiddle}>
      <div className={css.bg}>
        <div className={css.Left}>
          <div className={css.Left1} />
          <div className={css.Left2} />
        </div>
        <div className={css.Middle}>
          <div className={css.Top}>
            <div className={css.Top01} />
            <div className={css.Top_tetris01} />
            <div className={css.Top_tetris02} />
          </div>
          <div className={css.Bottom}>
            <div className={css.Bottom01} />
            <div className={css.Bottom_tetris01} />
            <div className={css.Bottom_tetris02} />
            <div className={css.Bottom_tetris03} />
            <div className={css.Bottom_tetris04} />
          </div>
        </div>
        <div className={css.Right} />
      </div>
      <div className={`${css.inner} ${className ?? ''}`}>{children}</div>
    </div>
  )
})
export default GameItem
