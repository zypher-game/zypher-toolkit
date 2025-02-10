import classnames from 'classnames'
import { isEqual } from 'lodash'
import React, { FC, memo } from 'react'

import { IB3Info } from '../hooks/RankingB3Hooks'
import RankB3Col from './RankB3Col'
import css from './rankingB3Table.module.stylus'
type IProps = {
  isMobile: boolean
  players: IB3Info[]
  tab: number
  myItem: IB3Info | undefined
}
const RankingB3Table: FC<IProps> = memo(({ isMobile, players, tab, myItem }: IProps) => {
  return (
    <>
      <div className={css.ranking_header}>
        <div className={css.fl}>
          <p>Rank</p>
          <p>Player</p>
        </div>
        <div className={css.fr}>
          {isMobile ? (
            <p className={css.text2}>Games Win</p>
          ) : (
            <>
              <p className={css.text1}>Games</p>
              <p className={css.text2}>Games Win</p>
            </>
          )}
          {/* <p className={css.text3}>Winning%</p> */}
        </div>
      </div>
      <div className={css.ranking_table}>
        {players.map(v => (
          <RankingItem
            key={v.rank}
            player={v}
            isMobile={isMobile}
            tab={tab}
            className={Number(v?.rank ?? 0) % 2 !== 0 ? css['even-row'] : css['odd-row']}
          />
        ))}
      </div>
    </>
  )
}, isEqual)
export type IRankingItemProps = {
  player: IB3Info
  isMobile: boolean
  className?: string
  tab: number
  otherStr?: string
}
export const RankingItem: FC<IRankingItemProps> = memo(({ player, tab, isMobile, className, otherStr }: IRankingItemProps) => {
  return (
    <div className={classnames(css.item, className)}>
      <RankB3Col rank={`${player.rank}`} account={player.address} name={player.address} isMobile={isMobile} showLine={true} otherStr={otherStr} />
      <div className={`${css.number} ${css.numberList}`}>
        {isMobile ? (
          <p className={`textbg ${css.text2}`}>{player.gameWinNumStr}</p>
        ) : (
          <>
            <p className={`textbg ${css.text1}`}>{player.gameTotalNumStr}</p>
            <p className={`textbg ${css.text2}`}>{player.gameWinNumStr}</p>
          </>
        )}
        {/* <p className={`textbg ${css.text3}`}> {player.winningPercent}</p> */}
      </div>
    </div>
  )
}, isEqual)
export default RankingB3Table
