import { BigNumberJs, targetDate } from '@ui/src'
import { useMemo } from 'react'

export const usePrice = () => {
  return useMemo(() => {
    const currentDate = new Date()
    const isActive = currentDate < targetDate
    const addition = isActive ? '0.2' : '0'
    const _lossAmount = new BigNumberJs(10).plus(new BigNumberJs(10).times(addition)).toFixed()
    const _winAmount = new BigNumberJs(20).plus(new BigNumberJs(20).times(addition)).toFixed()
    return {
      winAmount: _winAmount,
      lossAmount: _lossAmount
    }
  }, [])
}
