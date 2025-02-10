import { LngNs, preStaticUrl, useCustomTranslation, useIsTelegram } from '@ui/src'
import { useIsW768 } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo } from 'react'

import { IRoomInfo } from '@/hooks/useGetGameInfoV1.types'

import CountdownTimer from '../../components/CountdownTimer/CountdownTimer'
import RoundNumbers from '../../components/RoundNumbers/RoundNumbers'
import css from './roundTitle.module.stylus'
type IProps = {
  round: number
  roomInfo: IRoomInfo
}
const RoundTitle = memo(({ round, roomInfo }: IProps) => {
  const { t } = useCustomTranslation([LngNs.zBingo])
  const IS_TELEGRAM = useIsTelegram()
  const isMobile = useIsW768()
  return (
    <div className={`${css.roundNumber} ${IS_TELEGRAM ? css.roundTgNumber : ''}`}>
      <img
        decoding="async"
        loading="lazy"
        src={preStaticUrl + `/img/bingo/game-title${isMobile ? '-m' : ''}.png`}
        className={css.game_title_img}
        alt="game"
      />
      <div className={css.roundInfo}>
        {isMobile ? null : <div className={css.roundTitle}>{t('time left')}</div>}
        <div className={css.roundBox}>
          <span className={css.round}>{round}</span>
          <CountdownTimer roomInfo={roomInfo} />
        </div>
        {/* Player {roomInfo.players.indexOf(roundInfo.player) >= 0 ? roomInfo.players.indexOf(roundInfo.player) + 1 : '--'} */}
      </div>
      <RoundNumbers selectNumber={roomInfo.selectNumber} round={roomInfo.round} />
    </div>
  )
}, isEqual)
export default RoundTitle
