import { ChainId, formatMoney, request } from '@UI/src/'
import { Address } from 'wagmi'

import { monsterGraphqlApiUrl } from '@/constants/constants'
import { IDefenceRankDataItem } from '@/pages/Monster/hooks/monster.types'
export async function fetchMonsterGraphql({ chainId }: { chainId: ChainId }): Promise<any> {
  const api = monsterGraphqlApiUrl[chainId]
  if (!api) {
    return undefined
  }
  const result = await request(api, {
    method: 'POST',
    data: JSON.stringify({
      query: `query MyQuery {
        heros(
          first: 20
          orderBy: totalDamage
          where: {bonus: true}
          orderDirection: desc
        ) {
          id
          tokenId
          totalDamage
          bonus
        }
      }`,
      variables: {},
      operationName: 'MyQuery'
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (result.data && result.data.data && result.data.data.heros) {
    if (result.data.data.heros.length) {
      return result.data.data.heros.map(
        (v: any, index: number) =>
          ({
            rank: index + 1,
            address: v['id'],
            point: v['totalDamage'],
            pointStr: formatMoney(v['totalDamage'])
          } as unknown as IDefenceRankDataItem)
      )
    }
  }
  return undefined
}

export async function fetchAccountMonsterGraphql({
  chainId,
  account,
  defenceRankData
}: {
  chainId: ChainId
  account: Address
  defenceRankData: IDefenceRankDataItem[]
}): Promise<any> {
  const api = monsterGraphqlApiUrl[chainId]
  if (!api) {
    return undefined
  }
  const result = await request(api, {
    method: 'POST',
    data: JSON.stringify({
      query: `query MyQuery {
        heros(first: 1,  where: {bonus: true, id: "${account}"}) {
          id
          tokenId
          totalDamage
          bonus
        }
      }`,
      variables: {},
      operationName: 'MyQuery'
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (result.data && result.data.data && result.data.data.heros) {
    if (result.data.data.heros.length) {
      const v = result.data.data.heros[0]
      const obj: IDefenceRankDataItem = {
        // rank: index,
        address: v['id'],
        point: v['totalDamage'],
        pointStr: formatMoney(v['totalDamage'])
      }
      const rankingFilter = defenceRankData.filter(vv => vv.address.toLowerCase() === account.toLowerCase())
      if (rankingFilter && rankingFilter.length) {
        obj.rank = rankingFilter[0].rank
      } else {
        const totalDamage = obj.point
        const wresult = await request(api, {
          method: 'POST',
          data: JSON.stringify({
            query: `
          query MyQuery {
            heros(first: 1, where: {totalDamage_gte: "${totalDamage}"}) {
              id
            }
          }
        `,
            variables: {},
            operationName: 'MyQuery'
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const len = wresult.data.data.heros.length
        obj.rank = len
      }
      return obj
    }
  }
  return undefined
}
