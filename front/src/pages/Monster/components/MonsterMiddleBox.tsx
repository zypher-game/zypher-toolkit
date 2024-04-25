import { preStaticUrl } from '@UI/src/'
import classnames from 'classnames'
import { isEqual } from 'lodash'
import React, { memo } from 'react'

import { IMonsterStatus } from '../hooks/monster.types'
import css from './MonsterMiddleBox.module.stylus'
type IMonsterMiddleBox = {
  monsterStatus: IMonsterStatus
}
const MonsterMiddleBox = memo(({ monsterStatus }: IMonsterMiddleBox) => {
  return (
    <div className={classnames(css.monsterMiddleBox, css[monsterStatus])}>
      {monsterStatus === IMonsterStatus.MonsterNftWait ||
      monsterStatus === IMonsterStatus.MonsterNft ||
      monsterStatus === IMonsterStatus.WaitFight ? (
        <>
          <img src={preStaticUrl + `/img/monster/box01.png`} alt="box" className={css.bg1} />
        </>
      ) : monsterStatus === IMonsterStatus.Fight ? (
        <>
          <img src={preStaticUrl + `/img/monster/monster.png`} alt="box" className={css.bg1} />
        </>
      ) : monsterStatus === IMonsterStatus.End ? (
        <>
          <img src={preStaticUrl + `/img/monster/box01.png`} alt="box" className={css.bg1} />
        </>
      ) : null}
    </div>
  )
}, isEqual)
export default MonsterMiddleBox
