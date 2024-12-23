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
  motion,
  preStaticUrl,
  useActiveWeb3React,
  useIsW768,
  usePointsDialogState
} from '@ui/src'
import { partition } from 'lodash'
import React, { memo, useCallback, useMemo } from 'react'

import { usePreHandleGlobal } from '@/hooks/usePreHandleGlobal'
import { PixelCube2Tooltip } from '@/pages/Active/components/PixelTooltip/PixelTooltip'
import { env } from '@/utils/config'

import css from './GameItem.module.styl'
import cssGameItemType2 from './GameItemType2.module.styl'

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
  const showPointsModal = usePointsDialogState()
  const { gameList, more, GpItem } = useMemo(() => {
    const [filteredGames, excludedGames] = partition(Games(chainId), v => v.keyValue === 'more')
    const obj: {
      gameList: IGames[]
      more: IGames
      GpItem: INavLink
    } = {
      gameList: excludedGames,
      more: filteredGames[0],
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
          <img src={preStaticUrl + '/img/games/games/tree.png'} className={cssGameItemType2.tree} />
          {gameList.map(v => (
            <GamesItemComp key={v.keyValue} item={v} />
          ))}
          <GpItemComp item={GpItem} />
          <MoreItemComp item={more} />
        </>
        {/* <GameItemComingSoon disableGameList={disableGameList} /> */}

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
  const isW768 = useIsW768()
  const showPointsModal = usePointsDialogState()
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
      <GameItemBgLeft cssVersion={css} />
      <GameItemMiddle cssVersion={css} className={css.game}>
        <img decoding="async" loading="lazy" className={css.icon} src={preStaticUrl + '/img/layout/' + item.icon} alt={item.label} />
        <div className={css.fr}>
          <h4>{item.label}</h4>
          {item.content && !isW768 ? item.content(css.content) : null}
          <ActivePixelButton className={css.btn} pixel_height={isW768 ? 1 : 2} backgroundColor={item.btn_background_color}>
            <p className={css.btn_label}>{item.btn_label}</p>
          </ActivePixelButton>
        </div>
      </GameItemMiddle>
      <GameItemBgRight cssVersion={css} />
    </motion.div>
  )
})

const MoreItemComp = memo(({ item }: { item: IGames }) => {
  const toPathHandle = useCallback(async (v: IGamesItem) => {
    if (v.link || v.twitter) {
      window.open(v.link ?? v.twitter)
    }
  }, [])
  return (
    <div className={`${css.gameItemComp} ${cssGameItemType2.more}`}>
      <h4 className={cssGameItemType2.moreGameTitle}>More Games</h4>
      <div className={cssGameItemType2.moreGame}>
        {item.dapps.map(v => (
          <PixelCube2Tooltip key={v.label} title={[v.label]}>
            <div className={cssGameItemType2.moreGameItem}>
              <div className={cssGameItemType2.moreGameItemImg}>
                <img
                  fetchPriority="high"
                  decoding="async"
                  loading="lazy"
                  className={css.icon}
                  src={preStaticUrl + '/img/games/games/' + v.icon}
                  alt={v.label}
                  onClick={() => toPathHandle(v)}
                />
              </div>
              <p>{v.label}</p>
            </div>
          </PixelCube2Tooltip>
        ))}
      </div>
    </div>
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
      <GameItemBgLeft cssVersion={css} />
      <GameItemMiddle cssVersion={css} className={css.game}>
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
      <GameItemBgRight cssVersion={css} />
    </motion.div>
  )
})

const GameItemBgLeft = memo(({ cssVersion }: { cssVersion: any }) => {
  return (
    <div className={cssVersion.gameItemBgLeft}>
      <div className={cssVersion.item1} />
      <div className={cssVersion.item2} />
      <div className={cssVersion.item3} />
      <div className={cssVersion.item4}>
        <div className={cssVersion.item401} />
        <div className={cssVersion.item402} />
      </div>
      <div className={cssVersion.item5} />
      <div className={cssVersion.item6} />
      <div className={cssVersion.item7} />
    </div>
  )
})
const GameItemBgRight = memo(({ cssVersion }: { cssVersion: any }) => {
  return (
    <div className={cssVersion.gameItemBgRight}>
      <div className={cssVersion.item1} />
      <div className={cssVersion.item2} />
      {/* <div className={cssVersion.item3} /> */}
      <div className={cssVersion.item6} />
      <div className={cssVersion.item4}>
        <div className={cssVersion.item401} />
        <div className={cssVersion.item402} />
      </div>
      <div className={cssVersion.item5} />
      <div className={cssVersion.item7} />
    </div>
  )
})
const GameItemMiddle = memo(({ cssVersion, children, className }: { cssVersion: any; children: React.ReactNode; className?: string }) => {
  return (
    <div className={cssVersion.gameItemMiddle}>
      <div className={cssVersion.bg}>
        <div className={cssVersion.Left}>
          <div className={cssVersion.Left3} />
          <div className={cssVersion.Left1} />
          <div className={cssVersion.Left2} />
        </div>
        <div className={cssVersion.Middle}>
          <div className={cssVersion.Top}>
            <div className={cssVersion.Top01} />
            <div className={cssVersion.Top_tetris01} />
            <div className={cssVersion.Top_tetris02} />
          </div>
          <div className={cssVersion.Bottom}>
            <div className={cssVersion.Bottom01} />
            <div className={cssVersion.Bottom_tetris01} />
            <div className={cssVersion.Bottom_tetris02} />
            <div className={cssVersion.Bottom_tetris03} />
            <div className={cssVersion.Bottom_tetris04} />
          </div>
        </div>
        <div className={cssVersion.Right}>
          <div className={cssVersion.Right3} />
          <div className={cssVersion.Right1} />
          <div className={cssVersion.Right2} />
        </div>
      </div>
      <div className={`${className ?? ''}`}>{children}</div>
    </div>
  )
})
export default GameItem
