import { formatMoney, LngNs, useCustomTranslation } from '@UI/src/'
import { isEqual } from 'lodash'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'

import { IDpBalance } from '../../../hooks/useGPAction'
import { Col, PrimaryButton } from '../../UIWidget'
import DPBalance from './DPBalance'
import css from './DPLocked.module.stylus'
import { useActionHooks } from './useDialogActionHooks'
export type ILockedTimesItem = {
  labe: string
  amount: number
}
export const LockedTimes: ILockedTimesItem[][] = [
  [
    { labe: '7 days', amount: 7 * 86400 },
    { labe: '14 days', amount: 14 * 86400 }
  ],
  [
    { labe: '1 month', amount: 30 * 86400 },
    { labe: '3 month', amount: 90 * 86400 },
    { labe: '6 month', amount: 180 * 86400 }
  ],
  [
    { labe: '1 year', amount: 365 * 86400 },
    { labe: '2 year', amount: 2 * 365 * 86400 },
    { labe: '3 year', amount: 3 * 365 * 86400 }
  ]
]
export const getLockedTimesStr = (num: string): string => {
  if (num === '0') {
    return ''
  }
  return LockedTimes.flat().filter(v => `${v.amount}` === `${num}`)[0].labe
}
const DPLocked = memo(
  ({
    dpBalance,
    loading,
    isApprovedForStaking,
    stakeLockHandleAction
  }: {
    dpBalance: IDpBalance
    loading: boolean
    isApprovedForStaking: boolean
    stakeLockHandleAction: any
  }) => {
    const { t } = useCustomTranslation([LngNs.dp])
    const [choseTime, setChoseTime] = useState<ILockedTimesItem>(LockedTimes[0][0])
    const { params, setParams, totalChoose, selectAllProps } = useActionHooks(dpBalance)
    const stakeLockHandle = useCallback(() => {
      if (params && totalChoose) {
        stakeLockHandleAction(params)
      }
    }, [params, totalChoose, stakeLockHandleAction])
    useEffect(() => {
      setParams(pre => pre.map(v => ({ ...v, duration: `${choseTime.amount}` })))
    }, [choseTime])
    const weight = useMemo(() => {
      // locked增加的权重= DP的数量 * 1000 * 选择的锁期天数/ 最长锁期天数
      if (totalChoose) {
        const last = LockedTimes[LockedTimes.length - 1]
        return formatMoney((totalChoose * 1000 * Number(choseTime.amount)) / last[last.length - 1].amount)
      }
      return '-'
    }, [totalChoose, choseTime])
    return (
      <div className={css.dPLocked}>
        <DPBalance dpBalance={dpBalance} setParams={setParams} selectAllProps={selectAllProps} />
        <div className={css.bottom}>
          <Col flText={t('Total selected')} frNode={<h4>{totalChoose} DPs</h4>} />
          <Col flText={t('Short')} frNode={<TimeLi time={LockedTimes[0]} chosedTime={choseTime} setChoseTime={setChoseTime} />} />
          <Col flText={t('Medium')} frNode={<TimeLi time={LockedTimes[1]} chosedTime={choseTime} setChoseTime={setChoseTime} />} />
          <Col flText={t('Long')} frNode={<TimeLi time={LockedTimes[2]} chosedTime={choseTime} setChoseTime={setChoseTime} />} />
          <Col flText={t('Increase weight')} frNode={<h4>{weight}</h4>} />
          <PrimaryButton
            label={t(isApprovedForStaking ? 'Lock' : 'Approve')}
            loading={loading}
            disable={totalChoose === 0}
            onClick={stakeLockHandle}
          />
        </div>
      </div>
    )
  },
  isEqual
)

export const TimeLi = memo(
  ({
    time,
    chosedTime,
    setChoseTime
  }: {
    setChoseTime: React.Dispatch<React.SetStateAction<ILockedTimesItem>>
    chosedTime: ILockedTimesItem
    time: { labe: string; amount: number }[]
  }) => {
    const { t } = useCustomTranslation([LngNs.dp])
    const onClickHandle = useCallback(v => {
      setChoseTime(v)
    }, [])
    return (
      <ul className={css.timeList}>
        {time.map(v => (
          <li key={v.labe} className={v.amount === chosedTime.amount ? css.on : ''} onClick={() => onClickHandle(v)}>
            {t(v.labe)}
          </li>
        ))}
      </ul>
    )
  },
  isEqual
)

export default DPLocked
