import classnames from 'classnames'
import { isEqual } from 'lodash'
import React, { memo } from 'react'

import { IAccountMonsterData, IMonsterData } from '@/store/monster/reducer'

import { IMonsterStatus, ImonsterUserStatus } from '../hooks/monster.types'
import MonsterFightAction from './action/MonsterFightAction'
import MonsterSinginAction from './action/MonsterSinginAction'
import css from './MonsterBottom.module.stylus'
export type IMonsterBottom = {
  handleGetNft: any
  handleOpenBuyBattlePass: any
  isGetNftLoading?: boolean
  isBuyNftLoading?: boolean
  monsterStatus?: IMonsterStatus
  monsterUserStatus?: ImonsterUserStatus
  monsterState?: IMonsterData
  accountMonsterState?: IAccountMonsterData
  handleMonsterBottomAction?: any
}
const MonsterBottom = memo(
  ({
    monsterStatus,
    monsterUserStatus,
    monsterState,
    accountMonsterState,
    isGetNftLoading,
    isBuyNftLoading,
    handleGetNft,
    handleOpenBuyBattlePass,
    handleMonsterBottomAction
  }: IMonsterBottom) => {
    if (!monsterStatus) {
      return null
    }
    return (
      <div className={classnames(css.monsterBottom, css[monsterStatus])}>
        {monsterStatus === IMonsterStatus.MonsterNft ? (
          <MonsterSinginAction
            monsterState={monsterState}
            isGetNftLoading={isGetNftLoading}
            isBuyNftLoading={isBuyNftLoading}
            handleGetNft={handleGetNft}
            handleOpenBuyBattlePass={handleOpenBuyBattlePass}
            accountMonsterState={accountMonsterState}
            monsterUserStatus={monsterUserStatus}
          />
        ) : null}
        {monsterStatus === IMonsterStatus.WaitFight ? null : null}
        {monsterStatus === IMonsterStatus.Fight || monsterStatus === IMonsterStatus.End ? (
          <MonsterFightAction
            monsterUserStatus={monsterUserStatus}
            monsterStatus={monsterStatus}
            monsterState={monsterState}
            handleMonsterBottomAction={handleMonsterBottomAction}
          />
        ) : null}
      </div>
    )
  },
  isEqual
)
export default MonsterBottom
