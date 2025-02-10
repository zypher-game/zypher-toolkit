import { PointsIcon, preStaticUrl } from '@ui/src'
import classnames from 'classnames'
import { isEqual } from 'lodash'
import React, { memo, useMemo } from 'react'

import BingoPlayerAvatar from '@/components/BingoPlayerAvatar/BingoPlayerAvatar'

import { IPlayerRankingItem } from '../Ranking'
import css from './rankingBanner.module.stylus'

type IProps = {
  isMobile: boolean
  players: IPlayerRankingItem[]
}
const RankingBanner = memo(({ isMobile, players }: IProps) => {
  const accountData = useMemo(() => {
    if (isMobile) {
      return {
        preLen: 3,
        endLen: 3,
        size: 24
      }
    }
    return {
      preLen: undefined,
      endLen: undefined,
      size: 24
    }
  }, [isMobile])
  return (
    <div className={css.ranking_banner}>
      {[1, 0, 2].map(index => (
        <div key={index} className={classnames(css.ranking_banner_item, css[`ranking_banner_item_${players[index]?.index ?? ''}`])}>
          {!players[index] ? null : (
            <>
              <img
                decoding="async"
                loading="lazy"
                src={preStaticUrl + `/img/ranking/rank0${players[index].index}.png`}
                alt="ranking"
                className={css.ranking_logo}
              />
              <BingoPlayerAvatar
                className={css.account}
                account={players[index].address}
                size={isMobile ? 45 : 70}
                showAccount={true}
                border={false}
                preLen={accountData.preLen}
                endLen={accountData.endLen}
                AvatarBorder={({ children }: any) => {
                  return (
                    <div className={css.avatarBorder}>
                      <div className={css.bgAvatarBorder}>
                        <svg viewBox="0 0 100 100" fill="none">
                          <rect x="0.5" y="0.5" width="99" height="99" rx="49.5" stroke={['#FFF061', '#BCF3FF', '#F27500'][index]} />
                        </svg>
                      </div>
                      {children}
                    </div>
                  )
                }}
              />
              <div className={css.box_top} />
              <div className={css.box}>
                <div className={css.box_inner}>
                  <p className={css.amount}>{players[index].amount}</p>
                  <PointsIcon isMobile={isMobile} />
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  )
}, isEqual)

export default RankingBanner
