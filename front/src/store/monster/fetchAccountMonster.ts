import { ChainId, divisor6xBigNumber, IContractName, zkBingo } from '@ui/src'
import { MulticallContract } from '@ui/src'
import MonsterAbi from '@zypher-game/events/abi/MonsterSlayer202310.json'
import { Address } from 'wagmi'

import BigNumberJs from '@/utils/BigNumberJs'
export const fetchAccountMonster = async ({ chainId, account }: { chainId: ChainId; account: Address }): Promise<Record<string, any> | undefined> => {
  try {
    const MonsterContract = zkBingo(chainId, IContractName.Monster)
    const staticStr = [
      {
        name: 'record',
        methodName: 'recordOf',
        params: [account]
      },
      {
        name: 'matchRestriction',
        params: [account]
      },
      {
        name: 'balance',
        methodName: 'balanceOf',
        params: [account]
      }
    ]
    const params = staticStr.map(v => ({
      reference: v.name,
      contractAddress: MonsterContract,
      abi: MonsterAbi,
      calls: [{ methodName: v?.methodName ?? v.name, reference: v.name, methodParameters: v.params ?? [] }]
    }))
    const multicall = await MulticallContract(chainId)
    if (multicall) {
      const { results } = await multicall.call(params)
      if (results) {
        const data: Record<string, any> = {}
        Object.values(results).map((v: any) => {
          const item = v['callsReturnContext'][0]['returnValues']
          let value: any
          if (v['originalContractCallContext']['reference'] === 'stages') {
            value = v['callsReturnContext'][0]['returnValues'].map((vv: any) => ({
              accumulatedDamage: new BigNumberJs(vv[0].hex).toFixed(), //累计伤害
              damageFactor: new BigNumberJs(vv[1].hex).dividedBy(divisor6xBigNumber).toFixed() // 损坏系数  初始階段, 傷害倍率 1 (這邊都是 x 1e6)  0-400-800
            }))
          } else if (item.length) {
            if (item[0].hex) {
              value = new BigNumberJs(item[0].hex).toFixed()
            } else {
              value = item[0]
            }
          } else {
            value = item
          }
          data[v['originalContractCallContext']['reference']] = value
        })
        return data
      }
    } else {
      throw new Error('No multicall address')
    }
    return undefined
  } catch (e: any) {
    console.error('fetchAccountMonster: ', e)
    return undefined
  }
}
