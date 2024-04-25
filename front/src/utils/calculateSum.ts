import { Currency } from '@UI/src/'
import BigNumberjs from 'bignumber.js'

import { IPriceType } from '../store/price/reducer'
import { IContractResponse } from './batchRequestContracts'

export const calculateSumWithKey = (array: any[], index: number): string => {
  return array.reduce((accumulator, contractResponse) => {
    const value = new BigNumberjs(contractResponse.response[index])
    return value.plus(new BigNumberjs(accumulator)).toString()
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
    let amount = new BigNumberjs(1)
    if (timeNativeAmount && chainNativePrice) {
      amount = new BigNumberjs(chainNativePrice[Currency[contractResponse.chainId]])
    }
    const value = new BigNumberjs(contractResponse.response.toString()).times(amount).plus(new BigNumberjs(accumulator))
    return value.toString()
  }, '0')
}

export const calculateSumByNumber = (array: string[]): string => {
  return array.reduce((accumulator, item: string) => {
    const value = new BigNumberjs(item).plus(new BigNumberjs(accumulator))
    return value.toString()
  }, '0')
}
