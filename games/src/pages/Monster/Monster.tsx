import './Monster.styl'
import '@/assets/stylus/lib/monster_font.styl'

import classnames from 'classnames'
import { isEqual } from 'lodash'
import React, { memo, useCallback, useMemo, useState } from 'react'

import { useAppDispatch } from '@/store/hooks'
import { Time } from '@/store/monster/fetchMonster'
import { changeMonsterStateValue } from '@/store/monster/reducer'

import BuyBattlePassDialog from './components/dialog/BuyBattlePassDialog'
import ReceiveNftDialog from './components/dialog/ReceiveNftDialog'
import Rule1Dialog from './components/dialog/Rule1Dialog'
import Rule2Dialog from './components/dialog/Rule2Dialog'
import MonsterBg from './components/MonsterBg'
import MonsterBottom from './components/MonsterBottom'
import MonsterList from './components/MonsterList'
import MonsterMiddleBox from './components/MonsterMiddleBox'
import MonsterTitle from './components/MonsterTitle'
import { IMonsterStatus, ImonsterUserStatus } from './hooks/monster.types'
import { useMonster } from './hooks/useMonster'
import { useMonsterAction } from './hooks/useMonsterAction'
const Monster = memo(() => {
  const [isPointBalanceEnough, setIsPointBalanceEnough] = useState(false)
  const [isApprove, setIsApprove] = useState(false)
  const [monsterUserStatus, setMonsterUserStatus] = useState<ImonsterUserStatus>(ImonsterUserStatus.READY)

  const [monsterStatus, setMonsterStatus] = useState<IMonsterStatus>(IMonsterStatus.READY)
  const { fightInfo, monsterState, accountMonsterState, defenceAccountRankDataState, defenceRankDataState, monsterLoading } = useMonster({
    monsterStatus,
    setMonsterUserStatus,
    setMonsterStatus
  })
  const { isGetNftLoading, isBuyNftLoading, handleGetNft, handleOpenBuyBattlePass, handleBuyBattlePass, handleMonsterBottomAction } =
    useMonsterAction({
      monsterStatus,
      monsterUserStatus: monsterUserStatus,
      setIsApprove,
      setIsPointBalanceEnough
    })
  const dispatch = useAppDispatch()
  const handleSetMonsterStatus = useCallback(
    (v: IMonsterStatus) => {
      if (monsterState) {
        const _obj = monsterState
        const time = {
          ..._obj,
          ...Time[v]
        }
        dispatch(changeMonsterStateValue({ key: 'monster', value: time }))
      }
    },
    [monsterState]
  )

  return (
    <div className="monster_container">
      <div className={classnames('monster_content', `monster_content_${monsterStatus}`)}>
        <div className={'top_btn'}>
          {Object.values(IMonsterStatus).map(v => (
            <p key={v} onClick={() => handleSetMonsterStatus(v)}>
              {v}
            </p>
          ))}
        </div>
        <MonsterBg monsterStatus={monsterStatus} />
        {monsterStatus === IMonsterStatus.READY ? null : (
          <div className="monsterInner">
            <MonsterTitle monsterStatus={monsterStatus} monsterUserStatus={monsterUserStatus} fightInfo={fightInfo} monsterState={monsterState} />
            <MonsterMiddleBox monsterStatus={monsterStatus} />
            <MonsterBottom
              handleMonsterBottomAction={handleMonsterBottomAction}
              monsterStatus={monsterStatus}
              monsterUserStatus={monsterUserStatus}
              monsterState={monsterState}
              accountMonsterState={accountMonsterState}
              isGetNftLoading={isGetNftLoading}
              handleGetNft={handleGetNft}
              handleOpenBuyBattlePass={handleOpenBuyBattlePass}
            />
          </div>
        )}
      </div>
      <div className="monster_list">
        <div className="monster_list_bg" />
        {monsterStatus === IMonsterStatus.Fight || monsterStatus === IMonsterStatus.End ? (
          <MonsterList
            classNames="monsterList"
            defenceAccountRankDataState={defenceAccountRankDataState}
            defenceRankDataState={defenceRankDataState}
          />
        ) : null}
      </div>
      {/* <CheckInDialog /> */}
      <BuyBattlePassDialog
        monsterState={monsterState}
        handleBuyBattlePass={handleBuyBattlePass}
        isBuyNftLoading={isBuyNftLoading}
        isApprove={isApprove}
        isPointBalanceEnough={isPointBalanceEnough}
      />
      {/* <ReceiveAwardDialog /> */}
      <ReceiveNftDialog />
      <Rule1Dialog />
      <Rule2Dialog />
    </div>
  )
}, isEqual)
export default Monster
