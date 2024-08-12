import { preStaticUrl, TelegramUserInfoDto } from '@ui/src'
import classnames from 'classnames'
import { isEqual } from 'lodash'
import React, { FC, memo } from 'react'

import RankCol from '../../../RankingDialog/Ranking/components/RankCol'
import css from '../../../RankingDialog/Ranking/components/rankingTable.module.stylus'
type IProps = {
  isMobile: boolean
  players: TelegramUserInfoDto[]
  tab: number
  myItem: TelegramUserInfoDto | undefined
}
const RankingTgTable: FC<IProps> = memo(({ isMobile, players, tab, myItem }: IProps) => {
  return (
    <div className={css.ranking_table}>
      {players.map(v => (
        <RankingItem
          key={v.index}
          player={v}
          isMobile={isMobile}
          tab={tab}
          className={Number(v?.index ?? 0) % 2 !== 0 ? css['even-row'] : css['odd-row']}
        />
      ))}
    </div>
  )
}, isEqual)
export type IRankingItemProps = {
  player: TelegramUserInfoDto
  isMobile: boolean
  className?: string
  tab: number
  otherStr?: string
}
export const RankingItem: FC<IRankingItemProps> = memo(({ player, tab, isMobile, className, otherStr }: IRankingItemProps) => {
  return (
    <div className={classnames(css.item, className)}>
      <RankCol rank={`${player.index}`} account={player.name} isMobile={isMobile} showLine={true} otherStr={otherStr} />
      <div className={css.number}>
        <img src={preStaticUrl + '/img/home/data_points 02.svg'} alt="point" />
        <p className="textbg"> {player.star}</p>
      </div>
    </div>
  )
}, isEqual)
export default RankingTgTable
