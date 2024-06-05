import { ActivePixelButtonColor, preStaticUrl, SvgComponent, useActiveWeb3React, useIsW768, useRecoilValue, useSetRecoilState } from '@ui/src'
import React, { memo, useCallback } from 'react'

import { usePreHandleGlobal } from '@/hooks/usePreHandleGlobal'
import {
  announcementDialogState,
  announcementTimeState,
  dataDialogState,
  gameListDialogState,
  historyDialogState,
  historyTabIndexState,
  zypherGamesDialogState
} from '@/pages/GamesIndex/state/GamesState'

import css from './Nav.module.styl'
const Nav = memo(() => {
  const preHandleAction = usePreHandleGlobal()
  const announcementTime = useRecoilValue(announcementTimeState)
  const setHistoryTabIndex = useSetRecoilState(historyTabIndexState)
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
  const historyModalOpenHandle = useCallback(
    (tabIndex: number) => {
      const pre = preHandleAction()
      console.log({ pre })
      if (pre) {
        setHistoryTabIndex(tabIndex)
        setTimeout(() => {
          setIsHistoryModalOpen(true)
        }, 200)
      }
    },
    [preHandleAction]
  )

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
  const w768 = useIsW768()
  return (
    <ActivePixelButtonColor themeType="brown" className={css.navItemFl} height={w768 ? '36px' : '40px'} pixel_height={w768 ? 3 : 4} onClick={onClick}>
      <SvgComponent src={`${preStaticUrl}/img/games/${iconPath}.svg`} />
      <p>{label}</p>
    </ActivePixelButtonColor>
  )
})
const NavItemFr = memo(({ className, children, onClick }: { className: string; children: React.ReactNode; onClick?: any }) => {
  const w768 = useIsW768()
  return (
    <ActivePixelButtonColor themeType="brightBlue" className={className} height={w768 ? '32px' : '36px'} pixel_height={3} onClick={onClick}>
      {children}
    </ActivePixelButtonColor>
  )
})
export default Nav
