import { ActivePixelButtonColor, preStaticUrl, SvgComponent, useRecoilValue, useSetRecoilState } from '@UI/src'
import React, { memo, useCallback } from 'react'

import {
  announcementDialogState,
  announcementTimeState,
  dataDialogState,
  gameListDialogState,
  historyDialogState,
  zypherGamesDialogState
} from '@/pages/GamesIndex/state/GamesState'

import css from './Nav.module.styl'
const Nav = memo(() => {
  const announcementTime = useRecoilValue(announcementTimeState)
  const setIsHistoryModalOpen = useSetRecoilState(historyDialogState)
  const setIsAnnouncementModalOpen = useSetRecoilState(announcementDialogState)
  const setIsZypherGamesModalOpen = useSetRecoilState(zypherGamesDialogState)
  const setIsGameListModalOpen = useSetRecoilState(gameListDialogState)
  const setIsDataModalOpen = useSetRecoilState(dataDialogState)
  const zypherGamesModalOpenHandle = useCallback(() => {
    setIsZypherGamesModalOpen(true)
  }, [])
  const gameListModalOpenHandle = useCallback(() => {
    setIsGameListModalOpen(true)
  }, [])
  const dataModalOpenHandle = useCallback(() => {
    setIsDataModalOpen(true)
  }, [])
  const announcementModalOpenHandle = useCallback(() => {
    setIsAnnouncementModalOpen(true)
  }, [])
  const historyModalOpenHandle = useCallback((tabIndex: number) => {
    setIsHistoryModalOpen(true)
  }, [])

  return (
    <div className={css.nav}>
      <div className={css.fl}>
        <NavItemFl label="About Zypher" iconPath="pixel_about" onClick={zypherGamesModalOpenHandle} />
        <NavItemFl label="Game list" iconPath="pixel_list" onClick={gameListModalOpenHandle} />
        <NavItemFl label="Data" iconPath="pixel_data" onClick={dataModalOpenHandle} />
      </div>
      <div className={css.fr}>
        <NavItemFr className={css.fr_item} onClick={() => historyModalOpenHandle(0)}>
          <p>History</p>
        </NavItemFr>
        <NavItemFr className={css.fr_item} onClick={() => historyModalOpenHandle(1)}>
          <p>NFTs</p>
        </NavItemFr>
        <NavItemFr className={css.fr_item_icon} onClick={announcementModalOpenHandle}>
          {announcementTime[0] ? <SvgComponent src={`${preStaticUrl}/img/icon/pixel_point.svg`} className={css.pixel_point} /> : null}
          <SvgComponent src={`${preStaticUrl}/img/icon/pixel_news.svg`} className={css.pixel_news} />
        </NavItemFr>
      </div>
    </div>
  )
})
const NavItemFl = memo(({ iconPath, label, onClick }: { iconPath: string; label: string; onClick?: any }) => {
  return (
    <ActivePixelButtonColor
      className={css.navItemFl}
      height="40px"
      pixel_height={4}
      backgroundColor="#61341F"
      borderBottomColor="#30170B"
      borderTopColor="#7F5441"
      onClick={onClick}
    >
      <SvgComponent src={`${preStaticUrl}/img/games/${iconPath}.svg`} />
      <p>{label}</p>
    </ActivePixelButtonColor>
  )
})
const NavItemFr = memo(({ className, children, onClick }: { className: string; children: React.ReactNode; onClick?: any }) => {
  return (
    <ActivePixelButtonColor
      className={className}
      height="36px"
      pixel_height={3}
      backgroundColor="#1649FF"
      borderBottomColor="#0F33B2"
      borderTopColor="#3360FF"
      onClick={onClick}
    >
      {children}
    </ActivePixelButtonColor>
  )
})
export default Nav
