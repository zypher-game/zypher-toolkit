import { PixelTabBorder, useIsW768 } from '@ui/src'
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
  const isW768 = useIsW768()
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
  )
}, isEqual)

export default ProfileTab
