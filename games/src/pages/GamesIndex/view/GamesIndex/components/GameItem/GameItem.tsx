import './GameItem.styl'

import {
  ActivePixelButton,
  AnimatePresence,
  DPSupportChainId,
  Games,
  IGames,
  IGamesItem,
  INavLink,
  INavLinkType,
  ListWithMotion,
  motion,
  pointsDialogState,
  preStaticUrl,
  useActiveChainId,
  useActiveWeb3React,
  useIsW768,
  useSetRecoilState
} from '@ui/src'
import React, { memo, useCallback, useMemo } from 'react'

import { usePreHandleGlobal } from '@/hooks/usePreHandleGlobal'
import { PixelCube2Tooltip } from '@/pages/Active/components/PixelTooltip/PixelTooltip'
import { env } from '@/utils/config'

import css from './GameItem.module.styl'

const itemVariant = {
  hidden: { width: 0, opacity: 0, x: -10 },
  visible: {
    width: 'auto',
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      type: 'spring',
      bounce: 0.4,
      once: true
    }
  },
  hover: {
    scale: 1.02,
    transition: { duration: 0.3 }
  },
  tap: {
    scale: 0.9
  }
}

const GameItem = memo(() => {
  const { chainId } = useActiveWeb3React()
  const setPointsDialogState = useSetRecoilState(pointsDialogState)
  const showPointsModal = useCallback(() => {
    setPointsDialogState(true)
  }, [setPointsDialogState, chainId])
  const { gameList, GpItem } = useMemo(() => {
    const obj: {
      gameList: IGames[]
      GpItem: INavLink
    } = {
      gameList: Games(chainId),
      GpItem: {
        label: 'Gold Points',
        keyValue: 'points',
        icon: 'points.png',
        disabled: false,
        type: INavLinkType.Games,
        btn_label: 'Get More',
        onClick: showPointsModal,
        btn_background_color: '#264EDA'
      }
    }
    return obj
  }, [chainId])
  return (
    <AnimatePresence>
      <div className={css.gameItem}>
        <>
          {/* <ListWithMotion<IGames> parentClassName={css.fl_list} data={gameList} renderItem={item => <GamesItemComp item={item} />} /> */}
          {gameList.map(v => (
            <GamesItemComp key={v.keyValue} item={v} />
          ))}
          <GpItemComp item={GpItem} />
          {/* <GameItemComingSoon disableGameList={disableGameList} /> */}
        </>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="gameItem_bg">
          <div className="pixel_island1_div">
            <img
              decoding="async"
              loading="lazy"
              src={preStaticUrl + '/img/games/island/pixel_litter_island1.png'}
              alt="pixel_litter_island1"
              className="pixel_litter_island1"
            />
            <img
              decoding="async"
              loading="lazy"
              src={preStaticUrl + '/img/games/island/pixel_litter_island2.png'}
              alt="pixel_litter_island2"
              className="pixel_litter_island2"
            />
            <img
              decoding="async"
              loading="lazy"
              src={preStaticUrl + '/img/games/island/pixel_island1.png'}
              alt="pixel_island1"
              className="pixel_island1"
            />
            {['pixel_cloud1', 'pixel_cloud2', 'pixel_cloud5', 'pixel_cloud8'].map(v => (
              <img decoding="async" loading="lazy" key={v} src={preStaticUrl + '/img/games/island/' + v + '.png'} alt={v} className={v} />
            ))}
          </div>
          <div className="pixel_island2_div">
            <img
              decoding="async"
              loading="lazy"
              src={preStaticUrl + '/img/games/island/pixel_litter_island4.png'}
              alt="pixel_litter_island4"
              className="pixel_litter_island4"
            />
            <img
              decoding="async"
              loading="lazy"
              src={preStaticUrl + '/img/games/island/pixel_litter_island5.png'}
              alt="pixel_litter_island5"
              className="pixel_litter_island5"
            />
            <img
              decoding="async"
              loading="lazy"
              src={preStaticUrl + '/img/games/island/pixel_island2.png'}
              alt="pixel_island2"
              className="pixel_island2"
            />
            {['pixel_cloud13', 'pixel_cloud6'].map(v => (
              <img decoding="async" loading="lazy" key={v} src={preStaticUrl + '/img/games/island/' + v + '.png'} alt={v} className={v} />
            ))}
          </div>
          <div className="pixel_island3_div">
            <img
              decoding="async"
              loading="lazy"
              src={preStaticUrl + '/img/games/island/pixel_island3.png'}
              alt="pixel_island3"
              className="pixel_island3"
            />
            {['pixel_cloud3', 'pixel_cloud4', 'pixel_cloud11', 'pixel_cloud12'].map(v => (
              <img decoding="async" loading="lazy" key={v} src={preStaticUrl + '/img/games/island/' + v + '.png'} alt={v} className={v} />
            ))}
          </div>
          <div className="pixel_island4_div">
            <img
              decoding="async"
              loading="lazy"
              src={preStaticUrl + '/img/games/island/pixel_island4.png'}
              alt="pixel_island4"
              className="pixel_island4"
            />
            <img
              decoding="async"
              loading="lazy"
              src={preStaticUrl + '/img/games/island/pixel_litter_island3.png'}
              alt="pixel_litter_island3"
              className="pixel_litter_island3"
            />
            <img
              decoding="async"
              loading="lazy"
              src={preStaticUrl + '/img/games/island/pixel_cloud9.png'}
              alt="pixel_cloud9"
              className="pixel_cloud9"
            />
          </div>
          <div className="pixel_island5_div">
            <img
              decoding="async"
              loading="lazy"
              src={preStaticUrl + '/img/games/island/pixel_island5.png'}
              alt="pixel_island5"
              className="pixel_island5"
            />
            <img
              decoding="async"
              loading="lazy"
              src={preStaticUrl + '/img/games/island/pixel_litter_island7.png'}
              alt="pixel_litter_island7"
              className="pixel_litter_island7"
            />
            <img
              decoding="async"
              loading="lazy"
              src={preStaticUrl + '/img/games/island/pixel_litter_island6.png'}
              alt="pixel_litter_island6"
              className="pixel_litter_island6"
            />
            <img
              decoding="async"
              loading="lazy"
              src={preStaticUrl + '/img/games/island/pixel_cloud7.png'}
              alt="pixel_cloud7"
              className="pixel_cloud7"
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
})
// const GameItemComingSoon = memo(({ disableGameList }: { disableGameList: INavLink[] }) => {
//   return (
//     <div className={`${css.gameItemComp ?? ''} ${css.gameItemCompComing} gameItemCompComing`}>
//       <GameItemBgLeft />
//       <GameItemMiddle className={css.gamComing}>
//         <div className={css.gameItemCompComingImg}>
//           {disableGameList.map(item => (
//              <img decoding="async" loading="lazy" className={css.icon} key={item.keyValue} src={preStaticUrl + '/img/layout/' + item.icon} alt={item.label} />
//           ))}
//         </div>
//         <p className={css.label}>Coming soon</p>
//       </GameItemMiddle>
//       <GameItemBgRight />
//     </div>
//   )
// })
const GpItemComp = memo(({ item }: { item: INavLink }) => {
  const preHandleAction = usePreHandleGlobal()
  const { chainId } = useActiveWeb3React()
  const isW768 = useIsW768()
  const setPointsDialogState = useSetRecoilState(pointsDialogState)
  const showPointsModal = useCallback(() => {
    setPointsDialogState(true)
  }, [setPointsDialogState, chainId])
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
  }, [JSON.stringify(item.keyValue), preHandleAction])
  return (
    <motion.div
      className={`${css.gameItemComp} ${`gameItemComp${item.keyValue}`}`}
      onClick={toPathHandle}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
      variants={itemVariant}
    >
      <GameItemBgLeft />
      <GameItemMiddle className={css.game}>
        <img decoding="async" loading="lazy" className={css.icon} src={preStaticUrl + '/img/layout/' + item.icon} alt={item.label} />
        <div className={css.fr}>
          <h4>{item.label}</h4>
          {item.content && !isW768 ? item.content(css.content) : null}
          <ActivePixelButton className={css.btn} pixel_height={isW768 ? 1 : 2} backgroundColor={item.btn_background_color}>
            <p className={css.btn_label}>{item.btn_label}</p>
          </ActivePixelButton>
        </div>
      </GameItemMiddle>
      <GameItemBgRight />
    </motion.div>
  )
})
const GamesItemComp = memo(({ item }: { item: IGames }) => {
  const toPathHandle = useCallback(async (v: IGamesItem) => {
    if (v.link || v.twitter) {
      window.open(v.link ?? v.twitter)
    }
  }, [])
  return (
    <motion.div
      className={`${css.gameItemComp} ${`gameItemComp${item.keyValue}`}`}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
      variants={itemVariant}
    >
      <GameItemBgLeft />
      <GameItemMiddle className={css.game}>
        {item.dapps.map(v => (
          <PixelCube2Tooltip key={v.label} title={[v.label]}>
            <img
              fetchPriority="high"
              decoding="async"
              loading="lazy"
              className={css.icon}
              src={preStaticUrl + '/img/games/games/' + v.icon}
              alt={v.label}
              onClick={() => toPathHandle(v)}
            />
          </PixelCube2Tooltip>
        ))}
      </GameItemMiddle>
      <GameItemBgRight />
    </motion.div>
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
      {/* <div className={css.item3} /> */}
      <div className={css.item6} />
      <div className={css.item4}>
        <div className={css.item401} />
        <div className={css.item402} />
      </div>
      <div className={css.item5} />
      <div className={css.item7} />
    </div>
  )
})
const GameItemMiddle = memo(({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={css.gameItemMiddle}>
      <div className={css.bg}>
        <div className={css.Left}>
          <div className={css.Left3} />
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
        <div className={css.Right}>
          <div className={css.Right3} />
          <div className={css.Right1} />
          <div className={css.Right2} />
        </div>
      </div>
      <div className={`${className ?? ''}`}>{children}</div>
    </div>
  )
})
export default GameItem
