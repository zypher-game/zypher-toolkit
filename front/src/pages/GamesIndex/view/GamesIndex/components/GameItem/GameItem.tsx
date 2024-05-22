import './GameItem.styl'

import {
  ActivePixelButton,
  DPSupportChainId,
  INavLink,
  INavLinkType,
  pointsDialogState,
  preStaticUrl,
  useIsW768,
  useNavItem,
  useSetRecoilState
} from '@ui/src'
import React, { memo, useCallback, useMemo } from 'react'

import { usePreHandleGlobal } from '@/hooks/usePreHandleGlobal'
import { env } from '@/utils/config'

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
    <div className={css.gameItem}>
      <>
        {gameList.map(v => (
          <GameItemComp key={v.keyValue} item={v} />
        ))}
        <GameItemComingSoon disableGameList={disableGameList} />
      </>
      <div className="gameItem_bg">
        <div className="pixel_island1_div">
          <img src={preStaticUrl + '/img/games/island/pixel_litter_island1.png'} alt="pixel_litter_island1" className="pixel_litter_island1" />
          <img src={preStaticUrl + '/img/games/island/pixel_litter_island2.png'} alt="pixel_litter_island2" className="pixel_litter_island2" />
          <img src={preStaticUrl + '/img/games/island/pixel_island1.png'} alt="pixel_island1" className="pixel_island1" />
          {['pixel_cloud1', 'pixel_cloud2', 'pixel_cloud5', 'pixel_cloud8'].map(v => (
            <img key={v} src={preStaticUrl + '/img/games/island/' + v + '.png'} alt={v} className={v} />
          ))}
        </div>

        <div className="pixel_island2_div">
          <img src={preStaticUrl + '/img/games/island/pixel_litter_island4.png'} alt="pixel_litter_island4" className="pixel_litter_island4" />
          <img src={preStaticUrl + '/img/games/island/pixel_litter_island5.png'} alt="pixel_litter_island5" className="pixel_litter_island5" />
          <img src={preStaticUrl + '/img/games/island/pixel_island2.png'} alt="pixel_island2" className="pixel_island2" />
          {['pixel_cloud13', 'pixel_cloud6'].map(v => (
            <img key={v} src={preStaticUrl + '/img/games/island/' + v + '.png'} alt={v} className={v} />
          ))}
        </div>
        <div className="pixel_island3_div">
          <img src={preStaticUrl + '/img/games/island/pixel_island3.png'} alt="pixel_island3" className="pixel_island3" />
          {['pixel_cloud3', 'pixel_cloud4', 'pixel_cloud11', 'pixel_cloud12'].map(v => (
            <img key={v} src={preStaticUrl + '/img/games/island/' + v + '.png'} alt={v} className={v} />
          ))}
        </div>
        <div className="pixel_island4_div">
          <img src={preStaticUrl + '/img/games/island/pixel_island4.png'} alt="pixel_island4" className="pixel_island4" />
          <img src={preStaticUrl + '/img/games/island/pixel_litter_island3.png'} alt="pixel_litter_island3" className="pixel_litter_island3" />
          <img src={preStaticUrl + '/img/games/island/pixel_cloud9.png'} alt="pixel_cloud9" className="pixel_cloud9" />
        </div>
        <div className="pixel_island5_div">
          <img src={preStaticUrl + '/img/games/island/pixel_island5.png'} alt="pixel_island5" className="pixel_island5" />
          <img src={preStaticUrl + '/img/games/island/pixel_litter_island7.png'} alt="pixel_litter_island7" className="pixel_litter_island7" />
          <img src={preStaticUrl + '/img/games/island/pixel_litter_island6.png'} alt="pixel_litter_island6" className="pixel_litter_island6" />
          <img src={preStaticUrl + '/img/games/island/pixel_cloud7.png'} alt="pixel_cloud7" className="pixel_cloud7" />
        </div>
      </div>
    </div>
  )
})
const GameItemComingSoon = memo(({ disableGameList }: { disableGameList: INavLink[] }) => {
  return (
    <div className={`${css.gameItemComp ?? ''} ${css.gameItemCompComing} gameItemCompComing`}>
      <GameItemBgLeft />
      <GameItemMiddle className={css.gamComing}>
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
  const preHandleAction = usePreHandleGlobal()
  const isW768 = useIsW768()
  const setPointsDialogState = useSetRecoilState(pointsDialogState)
  const showPointsModal = useCallback(() => {
    setPointsDialogState(true)
  }, [setPointsDialogState])
  const toPathHandle = useCallback(async () => {
    if (isNaN(Number(item.keyValue))) {
      if (item.keyValue === 'points') {
        const pre = preHandleAction(env, DPSupportChainId)
        if (pre) {
          showPointsModal()
        }
      }
    } else {
      window.open(item.link)
    }
  }, [JSON.stringify(item.keyValue)])
  return (
    <div className={`${css.gameItemComp} ${`gameItemComp${item.keyValue}`}`} onClick={toPathHandle}>
      <GameItemBgLeft />
      <GameItemMiddle className={css.game}>
        <img className={css.icon} src={preStaticUrl + '/img/layout/' + item.icon} alt={item.label} />
        <div className={css.fr}>
          <h4>{item.label}</h4>
          {item.content && !isW768 ? item.content(css.content) : null}
          <ActivePixelButton className={css.btn} pixel_height={isW768 ? 1 : 2} backgroundColor={item.btn_background_color}>
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
      <div className={`${className ?? ''}`}>{children}</div>
    </div>
  )
})
export default GameItem
