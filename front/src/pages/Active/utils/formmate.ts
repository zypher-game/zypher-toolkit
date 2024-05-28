import { ChainId, formatMoney, getLinkPre } from '@ui/src'
import { BigNumberJs } from '@ui/src'

export const form_primary_score = (pre: any, data: any) => {
  const airdropPoints = new BigNumberJs(data.twitterFollowerScore).plus(data.gasScore).plus(data.balanceScore)
  return {
    ...pre,
    airdropPoints: airdropPoints.toString(),
    airdropPointsDetail: {
      init: '0',
      byTwitter: `${data.twitterFollowerScore}`,
      gas: data.gas,
      gasStr: formatMoney(data.gas, 2),
      byGas: `${data.gasScore}`,
      byBalance: `${data.balanceScore}`,
      balance: data.balance,
      balanceStr: formatMoney(data.balance, 2)
    }
  }
}
