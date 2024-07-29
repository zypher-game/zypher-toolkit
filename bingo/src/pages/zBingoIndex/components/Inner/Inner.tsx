import {
  bingoV1SupportedChainId,
  ChainId,
  IGameList,
  preStaticUrl,
  useActiveWeb3React,
  useChainModal,
  useIsMobile,
  useSetRecoilState,
  walletModalOpenState
} from '@zypher-game/toolkit/ui'
import classnames from 'classnames'
import { isEqual } from 'lodash'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useChainIdParams } from '@/hooks/useChainIdParams'
import { levelRuleDialogState } from '@/pages/state/state'
import sleep from '@/utils/sleep'
import { toBingoPlayHref } from '@/utils/toBingoHref'

import { ILevels, useLevels } from '../../hooks/usePoints'
import CarouselList from '../carouselList/carouselList'
import css from './Inner.module.stylus'
const Inner = memo(({ bingoMapList, bingoHasError }: { bingoMapList: Map<ChainId, IGameList[]> | undefined; bingoHasError: boolean }) => {
  const { activeLevels } = useLevels()
  return (
    <div className={css.inner}>
      <CarouselList bingoMapList={bingoMapList} bingoHasError={bingoHasError} />
      <div className={css.innerItemWrap}>
        {activeLevels.map(v => (
          <InnerItem key={v.amount} v={v} />
        ))}
      </div>
    </div>
  )
}, isEqual)
const InnerItem = memo(({ v }: { v: ILevels }) => {
  const chainIdParams = useChainIdParams()
  const { account, chainId } = useActiveWeb3React()
  const isMobile = useIsMobile()
  const setIsModalOpen = useSetRecoilState(levelRuleDialogState)
  const navigate = useNavigate()
  const [isAnimating, setIsAnimating] = useState(false)
  const setDialogOpen = useSetRecoilState(walletModalOpenState)
  const { openChainModal } = useChainModal()

  useEffect(() => {
    const handleMouseEnter = () => {
      setTimeout(() => {
        setIsAnimating(true)
      }, 400)
    }

    const handleMouseLeave = () => {
      setTimeout(() => {
        setIsAnimating(false)
      }, 400)
    }

    const element = document.getElementById(`innerItem-${v.index}`)
    if (element) {
      element.addEventListener('mouseenter', handleMouseEnter)
      element.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      if (element) {
        element.removeEventListener('mouseenter', handleMouseEnter)
        element.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [v.index])
  const handleOnClick = useCallback(async () => {
    if (!account) {
      setDialogOpen(false)
      await sleep(1)
      setDialogOpen(true)
      return
    }
    if (!bingoV1SupportedChainId.includes(chainId)) {
      if (openChainModal) {
        openChainModal()
      }
      return
    }
    if (v.isActive) {
      toBingoPlayHref({
        chainIdParams,
        navigate
      })
    } else {
      setIsModalOpen(true)
    }
  }, [v.isActive, openChainModal])
  const NumberItem = useMemo(() => {
    return (
      <div className={css.number}>
        {v.isActive ? (
          <>
            <p className={css.bold}>{v.amount}</p>
            <img src={preStaticUrl + `/img/home/data_points.svg`} className={css.pointimg} />
          </>
        ) : (
          <>
            <img src={preStaticUrl + `/img/bingo/lock.svg`} className={css.lockimg} />
            <p className={css.normal}>Not unlocked</p>
          </>
        )}
      </div>
    )
  }, [])
  const TitleBanner = useMemo(() => {
    if (isMobile && v.index === 1) {
      return (
        <>
          <div className={classnames(css.textTitle, css.textTitlePosition)}>
            <h4>BINGO</h4>
            <h4> NEWBIE</h4>
          </div>
          <div className={css.textTitle}>
            <h4>BINGO</h4>
            <h4> NEWBIE</h4>
            {NumberItem}
          </div>
        </>
      )
    }
    return (
      <>
        <img src={preStaticUrl + '/img/bingo/level_banner' + v.index + '.png'} className={css.level_banner} />
        {NumberItem}
      </>
    )
  }, [isMobile])

  return (
    <div
      id={`innerItem-${v.index}`}
      className={classnames(css.innerItem, `innerItem${v.index}`, isAnimating ? css.isAnimating : '', {
        [css.notactive]: !v.isActive
      })}
      onClick={handleOnClick}
    >
      <img src={preStaticUrl + '/img/bingo/point_bg0' + v.index + '.png'} className={css.point_bg} />
      <div className={css.innerItemBg}>
        <div className={css.level}>
          <img src={preStaticUrl + '/img/profile/level' + v.index + '.svg'} className={css.levelImg} />
        </div>
        {TitleBanner}
      </div>
    </div>
  )
}, isEqual)

export default Inner
