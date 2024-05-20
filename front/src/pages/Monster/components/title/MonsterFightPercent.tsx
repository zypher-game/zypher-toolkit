import { preStaticUrl } from '@ui/src'
import { BigNumberJs } from '@ui/src'
import classnames from 'classnames'
import { isEqual } from 'lodash'
import React, { memo, useMemo } from 'react'
import styled from 'styled-components'

import { IMonsterData } from '@/store/monster/reducer'

import { IFightInfo } from '../../hooks/monster.types'
import css from './MonsterFightPercent.module.stylus'

type IProps = {
  monsterState?: IMonsterData
  fightInfo?: IFightInfo
}
const FlItem = styled.div<{ percentArr: string[] }>`
  .percent_inner,
  .fightIcon {
    div:nth-child(1) {
      margin-left: ${({ percentArr }) => percentArr[0]}%;
    }
    div:nth-child(2) {
      margin-left: ${({ percentArr }) => percentArr[1]}%;
    }
    div:nth-child(3) {
      margin-left: ${({ percentArr }) => percentArr[2]}%;
    }
  }
`
const MonsterFightPercent = memo(({ fightInfo, monsterState }: IProps) => {
  const { totalPoint, nowPoint } = fightInfo ?? {}
  const percent = useMemo((): string => {
    if (fightInfo && totalPoint && nowPoint) {
      const _p = new BigNumberJs(nowPoint).dividedBy(totalPoint).times(100)
      return new BigNumberJs('100').minus(_p).toFixed(2)
    }
    return '100'
  }, [fightInfo])
  const { len, percentArr } = useMemo(() => {
    if (monsterState) {
      const stages = monsterState.stages
      const maxHP = monsterState.maxHP
      const _len = stages.length - 1
      const _percentArr = []
      let _preTotal = 0
      for (let i = 1; i < stages.length; i++) {
        const _percent = (Number(stages[i]['accumulatedDamage']) / Number(maxHP)) * 100
        const _percentNum = _percent - _preTotal
        _percentArr.push(_percentNum.toFixed(0))
        _preTotal = _percent
      }
      return { len: _len, percentArr: _percentArr }
    }
    return { len: 2, percentArr: ['20', '20'] }
  }, [monsterState])
  return (
    <div className={css.percent}>
      <FlItem percentArr={percentArr} className={css.fl}>
        <div className={classnames('fightIcon', css.fightIcon)}>
          {Array.from({ length: len }).map((v, index) => (
            <div key={index}>
              <img src={preStaticUrl + `/img/monster/fight.png`} alt="fight" />
            </div>
          ))}
        </div>
        <div className={css.percentItem}>
          <div className={classnames('percent_inner', css.percent_inner)}>
            {Array.from({ length: len }).map((v, index) => (
              <div key={index} />
            ))}
          </div>
          <div className={css.percentItemInner} style={{ width: `${percent}%` }} />
        </div>
        {nowPoint && (
          <p className={css.pointText}>
            {nowPoint} / {totalPoint}
          </p>
        )}
      </FlItem>
      <img src={preStaticUrl + `/img/monster/box02.png`} alt="box" className={css.box} />
    </div>
  )
}, isEqual)
export default MonsterFightPercent
