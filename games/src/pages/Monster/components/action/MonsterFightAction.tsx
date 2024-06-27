import { useSetRecoilState } from '@ui/src'
import { useCustomTranslation } from '@ui/src'
import { LngNs } from '@ui/src'
import { Button } from 'antd'
import classnames from 'classnames'
import { isEqual } from 'lodash'
import React, { FC, memo, useCallback } from 'react'

import { IMonsterData, MonsterKeyType } from '@/store/monster/reducer'

import { IMonsterStatus, ImonsterUserStatus } from '../../hooks/monster.types'
import { Rule1DialogState, Rule2DialogState } from '../../state/monsterState'
import MonsterCountdown from '../title/MonsterCountdown'
import css from './MonsterFightAction.module.stylus'
type IProps = {
  monsterStatus: IMonsterStatus
  handleMonsterBottomAction: any
  monsterState?: IMonsterData
  monsterUserStatus?: ImonsterUserStatus
}
const MonsterFightAction: FC<IProps> = memo(({ monsterStatus, handleMonsterBottomAction, monsterState, monsterUserStatus }: IProps) => {
  const { t } = useCustomTranslation([LngNs.defense])
  const setRule1IsModalOpen = useSetRecoilState(Rule1DialogState)
  const setRule2IsModalOpen = useSetRecoilState(Rule2DialogState)
  // console.log({
  //   monsterStatus,
  //   monsterUserStatus,
  //   a:
  //     monsterStatus === IMonsterStatus.Fight &&
  //     (monsterUserStatus === ImonsterUserStatus.NoCard || monsterUserStatus === ImonsterUserStatus.CannotGetCard),
  //   b:
  //     monsterStatus === IMonsterStatus.End &&
  //     (monsterUserStatus === ImonsterUserStatus.CannotReceiveAward || monsterUserStatus === ImonsterUserStatus.CannotGetCard)
  // })
  const handleRule1Dialog = useCallback(() => {
    if (monsterStatus === IMonsterStatus.End) {
      setRule2IsModalOpen(true)
    } else {
      setRule1IsModalOpen(true)
    }
  }, [monsterStatus])
  if (
    monsterStatus === IMonsterStatus.End &&
    (monsterUserStatus === ImonsterUserStatus.CannotReceiveAward || monsterUserStatus === ImonsterUserStatus.CannotGetCard)
  ) {
    return <></>
  }
  return (
    <div className={classnames(css.monsterFightAction, css[`monsterFightAction_${monsterStatus}`])}>
      {/* <div className={css.fl}>
         <img decoding="async" loading="lazy" src={preStaticUrl + `/img/monster/box03.png`} alt="box03" />
        <p>x 15</p>
      </div> */}
      <div className={css.fr}>
        <div className={css.flfl}>
          <Button className={classnames(css.fight, monsterStatus === IMonsterStatus.Fight)} onClick={handleMonsterBottomAction}>
            {monsterStatus === IMonsterStatus.End
              ? t('Claim Rewards')
              : monsterUserStatus === ImonsterUserStatus.NoCard || monsterUserStatus === ImonsterUserStatus.CannotGetCard
              ? `${t('Buy')} ${monsterState?.name}`
              : t('Battle')}
          </Button>
          {monsterStatus === IMonsterStatus.End || !monsterState?.[MonsterKeyType.challengeEndedAt] ? null : (
            <MonsterCountdown endTime={(Number(monsterState[MonsterKeyType.challengeEndedAt]) * 1000).toFixed()} className="fightAction" />
          )}
        </div>
        <Button className={css.rule} onClick={handleRule1Dialog}>
          {t('Rules')}
        </Button>
      </div>
    </div>
  )
}, isEqual)
export default MonsterFightAction
