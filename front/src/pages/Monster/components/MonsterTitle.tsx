import { LngNs, PointsIcon, useCustomTranslation, useIsMobile, useSetRecoilState } from '@UI/src/'
import BigNumberjs from 'bignumber.js'
import classnames from 'classnames'
import { isEqual } from 'lodash'
import React, { memo, useCallback, useMemo } from 'react'

import Icon from '@/assets/iconsLocal'
import { IMonsterData, MonsterKeyType } from '@/store/monster/reducer'

import { IFightInfo, IMonsterStatus, ImonsterUserStatus } from '../hooks/monster.types'
import { Rule1DialogState, Rule2DialogState } from '../state/monsterState'
import css from './MonsterTitle.module.stylus'
import MonsterCountdown from './title/MonsterCountdown'
import MonsterFightPercent from './title/MonsterFightPercent'
type IMonsterTitle = {
  monsterStatus: IMonsterStatus
  monsterUserStatus: ImonsterUserStatus
  fightInfo?: IFightInfo
  monsterState?: IMonsterData
}
const MonsterTitle = memo(({ monsterStatus, fightInfo, monsterState }: IMonsterTitle) => {
  const { t } = useCustomTranslation([LngNs.defense])
  const isMobile = useIsMobile()
  const setRule1IsModalOpen = useSetRecoilState(Rule1DialogState)
  const setRule2IsModalOpen = useSetRecoilState(Rule2DialogState)
  const handleRule1Dialog = useCallback(() => {
    if (monsterStatus === IMonsterStatus.End) {
      setRule2IsModalOpen(true)
    } else {
      setRule1IsModalOpen(true)
    }
  }, [monsterStatus])
  const endTime = useMemo(() => {
    if (monsterState) {
      let _endTime = ''
      if (monsterStatus === IMonsterStatus.MonsterNftWait) {
        _endTime = monsterState[MonsterKeyType.nftStartedAt]
      }
      if (monsterStatus === IMonsterStatus.MonsterNft) {
        _endTime = monsterState[MonsterKeyType.nftEndedAt]
      }
      if (monsterStatus === IMonsterStatus.WaitFight) {
        _endTime = monsterState[MonsterKeyType.challengeStartedAt]
      }
      return new BigNumberjs(_endTime).times(1000).toString()
    }
    return undefined
  }, [monsterStatus, monsterState])
  const renderText = useMemo((): React.JSX.Element | null => {
    switch (monsterStatus) {
      case IMonsterStatus.MonsterNft:
      case IMonsterStatus.MonsterNftWait:
      case IMonsterStatus.WaitFight:
        return (
          <>
            {monsterStatus === IMonsterStatus.MonsterNft ? (
              <>
                <h2>Join The Battle And Share The Prize Pool</h2>
              </>
            ) : monsterStatus === IMonsterStatus.MonsterNftWait ? (
              <h2>{t('title1', { name: monsterState ? monsterState[MonsterKeyType.name] : '' })}</h2>
            ) : monsterStatus === IMonsterStatus.WaitFight ? (
              <h2>{t('title2')}</h2>
            ) : null}
            {endTime ? <MonsterCountdown endTime={endTime} /> : null}
            <div className={css.rule} onClick={handleRule1Dialog}>
              <p>{t('Rules')}</p>
              <Icon name="question" className={css.question} />
            </div>
          </>
        )
      case IMonsterStatus.Fight:
        return <MonsterFightPercent fightInfo={fightInfo} monsterState={monsterState} />
      case IMonsterStatus.End:
        return (
          <>
            <div className={css.starTitle}>
              <h6>{t('Total Prize Pool')}</h6>
              <Icon name="star" className={classnames('star', 'star1', css.star, css.star1)} />
              <Icon name="star" className={classnames('star', 'star2', css.star, css.star2)} />
              <Icon name="star" className={classnames('star', 'star3', css.star, css.star3)} />
              <Icon name="star" className={classnames('star', 'star4', css.star, css.star4)} />
            </div>
            <div className={css.h2Bg}>
              <div className="liner_long" />
              <h2>
                30,002,123
                <PointsIcon isMobile={isMobile} />
              </h2>
              <div className="liner_sort" />
            </div>
          </>
        )
      default:
        return null
    }
  }, [monsterStatus, endTime])
  return <div className={classnames(css.title_comp, css[monsterStatus])}>{renderText}</div>
}, isEqual)
export default MonsterTitle
