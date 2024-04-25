import BigNumberjs from 'bignumber.js'
import { useMemo, useState } from 'react'

import { DP_PRICE_LIST, IDpBalance, IStakeParam } from '../../../hooks/useGPAction'

export const useActionHooks = (dpBalance: IDpBalance) => {
  const [params, setParams] = useState<IStakeParam[]>(DP_PRICE_LIST.map(v => ({ id: v.num, amount: '0', duration: '0' })))
  const totalChoose = useMemo(() => {
    const sum = params.reduce((accumulator, currentValue) => {
      const amount = new BigNumberjs(currentValue.amount)
      return accumulator.plus(amount)
    }, new BigNumberjs(0))
    return sum.toNumber()
  }, [JSON.stringify(params)])
  const totalBalance = useMemo(() => {
    const sum = Object.values(dpBalance).reduce((accumulator, currentValue) => {
      const amount = new BigNumberjs(currentValue.num)
      return accumulator.plus(amount)
    }, new BigNumberjs(0))
    return sum.toNumber()
  }, [JSON.stringify(dpBalance)])
  return {
    params,
    setParams,
    totalChoose,
    totalBalance,
    // selectAllProps: false
    selectAllProps: totalBalance === totalChoose && totalBalance !== 0 && totalChoose !== 0
  }
}
