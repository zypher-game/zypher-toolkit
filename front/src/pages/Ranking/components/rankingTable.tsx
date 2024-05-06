import { PointsIcon } from '@ui/src'
import classnames from 'classnames'
import { isEqual } from 'lodash'
import React, { FC, memo } from 'react'

import RankCol from '../../invitation/components/RankCol'
import { IPlayerRankingItem } from '../Ranking'
import css from './rankingTable.module.stylus'
type IProps = {
  isMobile: boolean
  players: IPlayerRankingItem[]
  tab: number
}
const RankingTable: FC<IProps> = memo(({ isMobile, players, tab }: IProps) => {
  return (
    <div className={css.ranking_table}>
      {players.map(v => (
        <RankingItem
          key={v.index}
          player={v}
          isMobile={isMobile}
          tab={tab}
          className={(v?.index ?? 0) % 2 !== 0 ? css['even-row'] : css['odd-row']}
        />
      ))}
    </div>
  )
}, isEqual)
export type IRankingItemProps = {
  player: IPlayerRankingItem
  isMobile: boolean
  className?: string
  tab: number
  otherStr?: string
}
export const RankingItem: FC<IRankingItemProps> = memo(({ player, tab, isMobile, className, otherStr }: IRankingItemProps) => {
  return (
    <div className={classnames(css.item, className)}>
      <RankCol rank={`${player.index}`} account={player.address} isMobile={isMobile} showLine={true} otherStr={otherStr} />
      <p>
        {tab === 0 ? player.joinAmount : player.winAmount}
        <PointsIcon isMobile={isMobile} />
      </p>
    </div>
  )
}, isEqual)
export default RankingTable
