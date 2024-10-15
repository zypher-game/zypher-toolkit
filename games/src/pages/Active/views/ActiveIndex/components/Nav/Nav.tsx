import { ActivePixelButton } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo, useCallback } from 'react'

import { useGetActiveRouterFn } from '@/pages/Active/hooks/useActiveRouter'

import { navPath } from '../../config/config'
import TextLabel from '../comp/TextLabel'
import css from './nav.module.styl'

const Nav = memo(() => {
  const { getActiveRouterFn } = useGetActiveRouterFn()
  const toPathHandle = useCallback(() => {
    getActiveRouterFn()
  }, [getActiveRouterFn])
  return (
    <div className={css.nav}>
      <div className={css.fl}>
        <img src={navPath + '/avatar.png'} className={css.avatar} />
        <div className={css.text}>
          <TextLabel className={css.h2} label="Treasure Ark" />
          <TextLabel className={css.p} label="[ A Fun & Rewarding Tournament ]" />
        </div>
      </div>
      <ButtonShadow className={css.fr} onClick={toPathHandle}>
        <TextLabel className={css.p} label="Built on Linea by Zypher" />
        <img src={navPath + '/go.png'} className={css.go} />
      </ButtonShadow>
      <img src={navPath + '/bg.png'} className={css.bg} />
    </div>
  )
}, isEqual)

const ButtonShadow = memo(({ className, onClick, children }: { className: string; children: React.ReactNode; onClick: any }) => {
  return (
    <div className={`${css.positive} }`}>
      <ActivePixelButton backgroundColor="#3B4150" pixel_height={6} className={`${css.cover} ${className ?? ''}`} onClick={onClick}>
        {children}
      </ActivePixelButton>
      <div className={css.div_shadow}>
        <ActivePixelButton backgroundColor="#000000" pixel_height={6} className={`${className ?? ''}`}>
          <></>
        </ActivePixelButton>
      </div>
    </div>
  )
}, isEqual)

export default Nav
