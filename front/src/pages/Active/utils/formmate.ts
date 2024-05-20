import { ChainId, formatMoney } from '@ui/src'
import { BigNumberJs } from '@ui/src'

import { getLinkPre } from '../constants/activeConstants'

export const form_info = (data: any, chainId: ChainId) => {
  const linkType = getLinkPre(chainId)
  return {
    invitationCode: `${linkType.label}${data.curInviteCode}`,
    signedStr: '0000',
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
      gas: data.gas,
      gasStr: formatMoney(data.gas, 2),
      byGas: `${data.gasScore}`,
      byBalance: `${data.balanceScore}`,
      balance: data.balance,
      balanceStr: formatMoney(data.balance, 2)
    }
  }
}
