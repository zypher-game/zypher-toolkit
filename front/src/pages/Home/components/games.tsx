import { useCustomTranslation } from '@UI/src/'
import { LngNs } from '@UI/src/'
import React, { FC, memo } from 'react'

import css from './games.module.stylus'
import { HomeTitle } from './widget'
type IProps = {
  isMobile: boolean
}
const GamesWidget: FC<IProps> = memo(({ isMobile }: IProps) => {
  const { t } = useCustomTranslation([LngNs.home])
  return (
    <div className={css.games}>
      {isMobile ? null : <HomeTitle label="Zypher Games" label_icon="zypherGames.svg" />}
      <div className={css.main}>
        <div className={css.tit}>{t('Zypher Games')}</div>
        <div className={css.txt}>{t('zypherGamesDetail')} </div>
      </div>
    </div>
  )
})

export default GamesWidget
