import { divisorBigNumber, formatMoney } from '@ui/src'
import { BigNumberJs } from '@ui/src'

export const form_primary_score = (pre: any, data: any) => {
  const airdropPoints = data.twitterFollowerScore
    ? new BigNumberJs(data.twitterFollowerScore).plus(data.gasScore).plus(data.balanceScore)
    : new BigNumberJs(0)
  return {
    ...pre,
    airdropPoints: airdropPoints.toFixed(),
    airdropPointsStr: formatMoney(airdropPoints.toFixed(), 8),
    airdropPointsDetail: {
      init: '0',
      byTwitter: `${data?.twitterFollowerScore}`,
      gas: data?.gasFee,
      gasStr: data.gasFee ? formatMoney(new BigNumberJs(data.gasFee).dividedBy(divisorBigNumber).toFixed(), 8) : '0',
      byGas: `${data?.gasScore}`,
      byBalance: `${data?.balanceScore}`,
      balance: data?.balance,
      balanceStr: data.balance ? formatMoney(new BigNumberJs(data.balance).dividedBy(divisorBigNumber).toFixed(), 8) : '0'
    }
  }
}
