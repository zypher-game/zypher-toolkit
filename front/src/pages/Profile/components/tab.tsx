import { PixelTabBorder } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo, useCallback } from 'react'

import css from './tab.module.stylus'
type IProps = {
  tab: number
  list: string[]
  setTab: React.Dispatch<React.SetStateAction<number>>
  className?: string
  showImg?: boolean
  source?: string[]
  type?: 'primary' | 'lineBorder'
}
const ProfileTab = memo(({ tab, list, setTab, className, showImg, source, type }: IProps) => {
  const handle = useCallback(index => {
    setTab(index)
  }, [])
  return (
    <PixelTabBorder
      className={`${css.tab} ${className ?? ''}`}
      tabList={list.map((v, index) => ({
        path: v,
        label: v,
        on: tab === index,
        onClick: () => handle(index)
      }))}
      height="32px"
      pixel_height={2}
    />
    // <div
    //   className={classnames(css.tab, css[type ?? ''], className)}
    //   style={{ width: showImg ? 'auto' : (isMobile ? 110 : currentLanguage === 'ko_KR' ? 140 : 120) * list.length }}
    // >
    //   {list.map((v, index) => (
    //     <div key={v} className={classnames(css.tabItem, { [css.cur]: tab === index })} onClick={() => setTab(index)}>
    //       {showImg && source ? <img src={source[index]} alt={v} /> : null}
    //       {v}
    //     </div>
    //   ))}
    // </div>
  )
}, isEqual)

export default ProfileTab
