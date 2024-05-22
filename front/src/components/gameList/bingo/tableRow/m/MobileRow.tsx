import { AddressZero } from '@ethersproject/constants'
import { PixelBorderCard, PixelTable, PlayerAvatar } from '@ui/src'
import { IGameList, IGameStatus, useCustomTranslation } from '@ui/src'
import { useIsW768 } from '@ui/src'
import { LngNs } from '@ui/src'
import classnames from 'classnames'
import { isEqual } from 'lodash'
import React, { FC, memo, useMemo } from 'react'

import ViewCard from '@/pages/Profile/components/viewCard'

import RenderNormalText from '../pc/RenderNormalText'
import { StatusI } from '../pc/RenderStatus'
import css from './MobileRow.modules.stylus'

interface IProps {
  item: IGameList
}
const MobileRow: FC<IProps> = memo(({ item }: IProps) => {
  const isMobile = useIsW768()
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
    <PixelTable
      className={css.mItem}
      pixel_height={4}
      backgroundColor="#161E2E"
      borderColor="#3A4254"
      headerBackgroundColor="#293457"
      classNameHeader={`${css.header} row_header`}
      header_children={
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
              <RenderNormalText label={item.inputPerPlayer} showPoint={true} isMobile={isMobile} />
              <RenderNormalText label={item.multiplier} showPoint={false} isMobile={isMobile} />
              <RenderNormalText label={item.win} showPoint={true} isMobile={isMobile} />
            </div>
          </div>
        </div>
      }
      body_children={
        <div className={css.mBottom}>
          {Len.length === 0 ? (
            <RenderNormalText label={item.winnerOrPlayers} showPoint={false} isMobile={isMobile} />
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
      }
    />
  )
}, isEqual)
export default MobileRow
