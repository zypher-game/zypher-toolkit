import BigNumber from 'bignumber.js'
import { isEqual } from 'lodash'
import React, { FC, memo } from 'react'

import { AccountInfo } from '../state/invitationState'
import css from './invitationData.module.stylus'

interface IProps extends AccountInfo {
  active: boolean
}
const InvitationData: FC<IProps> = memo(({ active, rank, user_cnt_points, share_cnt_points, total }: IProps) => {
  if (!active || new BigNumber(total).isEqualTo(0)) {
    return null
  }
  return (
    <div className={css.data}>
      <div className={css.item}>
        <span>My Ranking</span>
        <em>{rank}</em>
      </div>
      <div className={css.line} />
      <div className={css.item}>
        <span>My Operation Points</span>
        <em>{user_cnt_points}</em>
      </div>
      <div className={css.line} />
      <div className={css.item}>
        <span>My Invitation Points</span>
        <em>{share_cnt_points}</em>
      </div>
      <div className={css.line} />
      <div className={css.item}>
        <span>My Total Points</span>
        <em>{total}</em>
      </div>
    </div>
  )
}, isEqual)
export default InvitationData
