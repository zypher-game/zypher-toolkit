import { Currency } from '@ui/src'

import BigNumberJs from '@/utils/BigNumberJs'

import { IPriceType } from '../store/price/reducer'
import { IContractResponse } from './batchRequestContracts'

export const calculateSumWithKey = (array: any[], index: number): string => {
  return array.reduce((accumulator, contractResponse) => {
    const value = new BigNumberJs(contractResponse.response[index])
    return value.plus(new BigNumberJs(accumulator)).toFixed()
  }, 0)
}
// const ChainNativePrice = {
//   [ChainId.LineaMainnet]: 1600,
//   [ChainId.LineaTestnet]: 1600,
//   [ChainId.OPBNB]: 210,
//   [ChainId.OPBNBTEST]: 210
// }
export const calculateSum = (array: IContractResponse[], timeNativeAmount?: boolean, chainNativePrice?: IPriceType): string => {
  return array.reduce((accumulator, contractResponse: IContractResponse) => {
    let amount = new BigNumberJs(1)
    if (timeNativeAmount && chainNativePrice) {
      amount = new BigNumberJs(chainNativePrice[Currency[contractResponse.chainId]])
    }
    const value = new BigNumberJs(contractResponse.response.toString()).times(amount).plus(new BigNumberJs(accumulator))
    return value.toFixed()
  }, '0')
}

export const calculateSumByNumber = (array: string[]): string => {
  return array.reduce((accumulator, item: string) => {
    const value = new BigNumberJs(item).plus(new BigNumberJs(accumulator))
    return value.toFixed()
  }, '0')
}
