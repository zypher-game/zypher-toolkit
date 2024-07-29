import { LngNs, useCustomTranslation, useIsMobile } from '@zypher-game/toolkit/ui'
import classnames from 'classnames'
import i18n from 'i18next'
import { isEqual } from 'lodash'
import React, { memo, useEffect, useState } from 'react'

import css from './tab.module.stylus'
type IProps = {
  tab: number
  list: string[]
  setTab: React.Dispatch<React.SetStateAction<number>>
  className?: string
}
const Tab = memo(({ tab, list, setTab, className }: IProps) => {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language)
  const isMobile = useIsMobile()
  const { t } = useCustomTranslation([LngNs.common])
  useEffect(() => {
    setCurrentLanguage(i18n.language)
  }, [t('language')])
  return (
    <div className={classnames(css.tab, className)} style={{ width: (isMobile ? 110 : currentLanguage === 'ko_KR' ? 140 : 120) * list.length }}>
      {list.map((v, index) => (
        <div key={v} className={classnames(css.tabItem, { [css.cur]: tab === index })} onClick={() => setTab(index)}>
          {v}
        </div>
      ))}
    </div>
  )
}, isEqual)
export default Tab
