import { ChainId } from '@UI/src/'

import { env } from '@/utils/config'

const apiPre = env === 'develop' ? 'https://testapi.zypher.game' : 'https://api.zypher.game'
export const apiUrl = {
  accountInfo: apiPre + `/user/getone`,
  accountListInfo: apiPre + `/user/getmulti`,
  accountInfoUpdate: apiPre + `/user/infoupdate`
}
export const PageSize = 20
export const CurrentPage = 0
export const defaultChainId = env === 'develop' ? ChainId.OPBNBTEST : ChainId.LineaMainnet
