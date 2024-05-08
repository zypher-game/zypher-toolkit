import { formatMoney } from '@ui/src'

import BigNumberJs from '@/utils/BigNumberJs'
import { formatAmount } from '@/utils/numbers'

export const form_info = (data: any) => {
  return {
    invitationCode: data.curInviteCode,
    avatar: data.headImg,
    id: `${data.id}`,
    nickname: data.nickname,
    twitter: {
      avatar: data.twitterImg,
      nickname: data.twitterName,
      followerCount: `${data.twitterFollower}`,
      isLoading: false
    }
  }
}

export const form_primary_score = (pre: any, data: any) => {
  const airdropPoints = new BigNumberJs(data.twitterFollowerScore).plus(data.gasScore).plus(data.balanceScore)
  return {
    ...pre,
    airdropPoints: airdropPoints.toString(),
    airdropPointsDetail: {
      init: '0',
      byTwitter: `${data.twitterFollowerScore}`,
      byTwitterMore: '',
      gas: data.gas,
      gasStr: formatMoney(data.gas, 2),
      byGas: `${data.gasScore}`,
      byBalance: `${data.balanceScore}`,
      balance: data.balance,
      balanceStr: formatMoney(data.balance, 2)
    }
  }
}
