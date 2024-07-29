import { Currency, request } from '@ui/src'

import { IPriceType } from './reducer'

export const fetchMultiTokenPrice = async () => {
  try {
    const currency = [...new Set(Object.values(Currency))]

    const optionalFilter = ['1']
    const r = await request('https://li.quest/v1/tokens', {
      method: 'GET',
      params: {
        chains: optionalFilter.join(',')
      }
    })
    const obj: IPriceType = {}
    for (let i = 0; i < currency.length; i++) {
      const now = r.data.tokens[1].filter((v: any) => v.symbol.toLowerCase() === currency[i].toLowerCase())[0]
      if (!now) {
      } else {
        obj[currency[i]] = now['priceUSD']
      }
    }
    return obj
  } catch (e: any) {
    return undefined
  }
}
