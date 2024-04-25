import { LngNs, preStaticUrl, useCustomTranslation } from '@UI/src/'
import BigNumberjs from 'bignumber.js'
import classnames from 'classnames'
import { isEqual } from 'lodash'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'

import { DP_PRICE_LIST, IBalance, IDpBalance, IStakeParam } from '../../../hooks/useGPAction'
import { DPAmountInputItem } from '../../UIWidget'
import css from './DPBalance.module.stylus'
type IDPBalanceItem = {
  label: string
  price: string
  amount: IBalance
  setParams?: React.Dispatch<React.SetStateAction<IStakeParam[]>>
  children?: React.ReactNode
  selectAll?: boolean
}
const DPBalance = memo(
  ({
    selectAllProps,
    dpBalance,
    setParams
  }: {
    selectAllProps: boolean
    dpBalance: IDpBalance
    setParams: React.Dispatch<React.SetStateAction<IStakeParam[]>>
  }) => {
    const { t } = useCustomTranslation([LngNs.dp])
    const [selectAll, setSelectAll] = useState(false)
    return (
      <div className={css.dpBalance}>
        {DP_PRICE_LIST.map(v => ({
          label: `DPs / ${v.numStr} $GP`,
          price: v.num,
          amount: dpBalance[v.num]
        })).map((v, index) => (
          <DPBalanceItem key={index} label={v.label} amount={v.amount} price={v.price} setParams={setParams} selectAll={selectAll} />
        ))}
        <div className={css.selectAll} onClick={() => setSelectAll(!selectAll)}>
          <i className={classnames(css.selectAllIcon, selectAllProps ? css.on : '')} />
          <p>{t('select All')}</p>
        </div>
      </div>
    )
  },
  isEqual
)
const DPBalanceItem = memo(({ label, amount, price, setParams, selectAll }: IDPBalanceItem) => {
  const { t } = useCustomTranslation([LngNs.dp])
  const [value, setValue] = useState<string>('1')
  useEffect(() => {
    if (new BigNumberjs(amount.num).eq(0)) {
      setValue('0')
    } else {
      setValue('1')
    }
  }, [amount.num])
  useEffect(() => {
    if (selectAll) {
      setValue(amount.num)
    }
  }, [selectAll, amount.num])
  useEffect(() => {
    if (setParams) {
      setParams(pre => {
        return pre.map(v => {
          if (v.id === price) {
            return {
              ...v,
              amount: value
            }
          }
          return v
        })
      })
    }
  }, [value, price])
  const maxHandle = useCallback(() => {
    setValue(amount.num)
  }, [amount.num])
  return (
    <DPBalanceItemInner label={label} amount={amount} price={price} setParams={setParams} selectAll={selectAll}>
      <div className={css.numberAction}>
        <DPAmountInputItem size="small" value={value} setValue={setValue} max={amount.num} />
        <div className={css.max} onClick={maxHandle}>
          {t('MAX')}
        </div>
      </div>
    </DPBalanceItemInner>
  )
}, isEqual)

export const DPBalanceItemInner = memo(({ label, amount, price, children }: IDPBalanceItem) => {
  return (
    <div className={css.dPBalanceItemBorder}>
      <div className={css.fl}>
        <img src={preStaticUrl + `/img/dp/price_${price}.png`} />
      </div>
      <div className={css.fr}>
        <p className={css.label}>{label}</p>
        <div className={css.col}>
          <h4 className="h4">x{amount.numStr}</h4>
          {children}
        </div>
      </div>
    </div>
  )
}, isEqual)

export default DPBalance
