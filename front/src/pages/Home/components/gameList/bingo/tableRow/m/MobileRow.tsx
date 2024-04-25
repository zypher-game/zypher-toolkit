import { AddressZero } from '@ethersproject/constants'
import { PlayerAvatar } from '@UI/src/'
import { IGameList, IGameStatus, useCustomTranslation } from '@UI/src/'
import { useIsMobile } from '@UI/src/'
import { LngNs } from '@UI/src/'
import classnames from 'classnames'
import { isEqual } from 'lodash'
import React, { FC, memo, useMemo } from 'react'

import ViewCard from '@/pages/Profile/components/viewCard'

import RanderNormalText from '../pc/RanderNormalText'
import { StatusI } from '../pc/RanderStatus'
import css from './MobileRow.modules.stylus'

interface IProps {
  item: IGameList
}
const MobileRow: FC<IProps> = memo(({ item }: IProps) => {
  const isMobile = useIsMobile()
  const { t } = useCustomTranslation([LngNs.home])
  const Len = useMemo(() => {
    const str = `${item.winnerOrPlayers}`
    if (str.startsWith('0x')) {
      return []
    }
    const matchResult = str.match(/\d+/)
    const len = matchResult ? parseInt(matchResult[0]) : 0
    return new Array(len).fill('')
  }, [item.winnerOrPlayers])
  const showBingoCard = useMemo(() => {
    return Len.length === 0 && item.status === IGameStatus.End && item.bingoInfo && item.bingoInfo.cardNumbers
  }, [])
  return (
    <div className={css.mItem}>
      <div className={css.mTop}>
        <div className={css.mTitle}>
          <p className={css.mTitleGrey}>
            {item.roomIDStr}
            <em>|</em>
            {item.startTimeMobile}
          </p>
          <p className={classnames(css.mStatus, item.status === IGameStatus.Live ? css.mStatusLive : '')}>
            {item.status}
            {item.status === IGameStatus.Live ? <StatusI isMobile={isMobile} /> : null}
          </p>
        </div>
        <div className={css.mTable}>
          <div className={css.mTableHeader}>
            <p>{t('Pledged per player')}</p>
            <p>{t('Multiplier')}</p>
            <p>{t('Winnings')}</p>
          </div>
          <div className={css.mTableBody}>
            <RanderNormalText label={item.inputPerPlayer} showPoint={true} isMobile={isMobile} />
            <RanderNormalText label={item.multiplier} showPoint={false} isMobile={isMobile} />
            <RanderNormalText label={item.win} showPoint={true} isMobile={isMobile} />
          </div>
        </div>
      </div>
      <div className={css.mBottom}>
        {Len.length === 0 ? (
          <RanderNormalText label={item.winnerOrPlayers} showPoint={false} isMobile={isMobile} />
        ) : (
          <div className={css.avatarList}>
            {Len.map((_, index) => (
              <PlayerAvatar key={index} size={22} account={AddressZero} showAccount={false} border={true} />
            ))}
          </div>
        )}
        {showBingoCard ? (
          <ViewCard cardNumbers={item.bingoInfo.cardNumbers} selectedNumbers={item.bingoInfo.selectedNumbers} isMobile={isMobile} />
        ) : (
          <p className={css.grey}>{item.winnerOrPlayers}</p>
        )}
      </div>
    </div>
  )
}, isEqual)
export default MobileRow
