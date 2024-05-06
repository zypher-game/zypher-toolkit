import { ChainId, Currency, request } from '@ui/src'

import BigNumberJs from '@/utils/BigNumberJs'

import { IPriceType } from './reducer'
const COINGECKO_CHAIN_ID = {
  [ChainId.LineaMainnet]: {
    id: 'linea',
    chain_identifier: 59144,
    name: 'Linea',
    shortname: '',
    native_coin_id: 'ethereum',
    currency: Currency[ChainId.LineaMainnet],
    init_price: '2221.76'
  },
  [ChainId.OPBNB]: {
    id: 'opbnb',
    chain_identifier: 204,
    name: 'opBNB',
    shortname: '',
    native_coin_id: 'binancecoin',
    currency: Currency[ChainId.OPBNB],
    init_price: '294.34'
  }
}
export const fetchMultiTokenPrice = async () => {
  try {
    // https://api.coingecko.com/api/v3/asset_platforms
    const list = Object.values(COINGECKO_CHAIN_ID)
    const params = list.map(v => v.native_coin_id).join(',')
    const r = await request(`https://api.coingecko.com/api/v3/simple/price?ids=${params}&vs_currencies=usd`, {
      method: 'GET'
    })
    const obj: IPriceType = {}
    for (let i = 0; i < list.length; i++) {
      const now = r.data[list[i].native_coin_id]
      const currency = list[i].currency
      if (!now) {
        obj[currency] = new BigNumberJs(now['usd']).toFixed(2)
      } else {
        obj[currency] = new BigNumberJs(now['usd']).toFixed(2)
      }
    }
    return obj
  } catch (e: any) {
    return undefined
  }
}
