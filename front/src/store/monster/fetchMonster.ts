// import { IMonsterStatus } from '@/pages/Monster/hooks/monster.types'
import { ChainId, divisor6xBigNumber, IContractName, zkBingo } from '@ui/src'
// import MonsterAbi from '@/contract/abi/MonsterAbi.json'
import { MulticallContract } from '@ui/src'
import MonsterAbi from '@zypher-game/events/abi/MonsterSlayer202310.json'

import { IMonsterStatus } from '@/pages/Monster/hooks/monster.types'
import BigNumberJs from '@/utils/BigNumberJs'

export const Time = {
  [IMonsterStatus.MonsterNftWait]: {
    maxHP: '20', // 2023-11-19 14:52:41
    nftStartedAt: '1700376761', // 2023-11-19 14:52:41
    nftEndedAt: '1702968761', // 2023-12-19 14:52:41
    challengeStartedAt: '1703055161', // 2023-12-20 14:52:41
    challengeEndedAt: '1729667879'
  },
  [IMonsterStatus.MonsterNft]: {
    maxHP: '20', // 2023-11-19 14:52:41
    nftStartedAt: '1695192761', // 2023-9-20 14:52:41
    nftEndedAt: '1702968761',
    challengeStartedAt: '1703055161',
    challengeEndedAt: '1729667879'
  },
  [IMonsterStatus.WaitFight]: {
    maxHP: '20', // 2023-11-19 14:52:41
    nftStartedAt: '1695192761', // 2023-9-20 14:52:41
    nftEndedAt: '1695192761',
    challengeStartedAt: '1703055161',
    challengeEndedAt: '1729667879'
  },
  [IMonsterStatus.Fight]: {
    maxHP: '20', // 2023-11-19 14:52:41
    nftStartedAt: '1695192761', // 2023-9-20 14:52:41
    nftEndedAt: '1695192761',
    challengeStartedAt: '1695192761',
    challengeEndedAt: '1729667879'
  },
  [IMonsterStatus.End]: {
    nftStartedAt: '1695192761', // 2023-9-20 14:52:41
    nftEndedAt: '1695192761',
    challengeStartedAt: '1695192761',
    challengeEndedAt: '1695192761'
  }
}
export const fetchMonster = async ({ chainId }: { chainId: ChainId }): Promise<Record<string, any> | undefined> => {
  try {
    const MonsterContract = zkBingo(chainId, IContractName.Monster)
    const staticStr = [
      {
        name: 'name'
      },
      {
        name: 'symbol'
      },
      {
        name: 'challengeStartedAt' // 开始挑战的时间
      },
      {
        name: 'totalDamage' // 怪獸受到的總傷害
      },
      {
        name: 'maxHP' // 總血量
      },
      {
        name: 'stages' // 打怪兽的阶段
      },
      {
        name: 'purchasePrice'
      },
      {
        name: 'eventDates'
      }
    ]
    const params = staticStr.map(v => ({
      reference: v.name,
      contractAddress: MonsterContract,
      abi: MonsterAbi,
      calls: [{ methodName: v.name, reference: v.name, methodParameters: [] }]
    }))
    const multicall = await MulticallContract(chainId)
    if (multicall) {
      const { results } = await multicall.call(params)
      if (results) {
        const data: Record<string, any> = {}
        Object.values(results).map((v: any) => {
          const item = v['callsReturnContext'][0]['returnValues']
          let value: any
          const eventDates: [string, string][] = []
          const eventDatesKey = ['battlePassStart', 'battlePassEnd', 'challengeStart', 'challengeEnd']
          const eventDatesValueKey = ['nftStartedAt', 'nftEndedAt', 'challengeStartedAt', 'challengeEndedAt']
          if (v['originalContractCallContext']['reference'] === 'stages') {
            value = v['callsReturnContext'][0]['returnValues'].map((vv: any) => ({
              accumulatedDamage: new BigNumberJs(vv[0].hex).toFixed(), //累计伤害
              damageFactor: new BigNumberJs(vv[1].hex).dividedBy(divisor6xBigNumber).toFixed() // 损坏系数  初始階段, 傷害倍率 1 (這邊都是 x 1e6)  0-400-800
            }))
          } else if (v['originalContractCallContext']['reference'] === 'eventDates') {
            v['callsReturnContext'][0]['returnValues'].map((vv: any, index: number) => {
              const numberStr = new BigNumberJs(vv.hex).toFixed()
              eventDates.push([eventDatesKey[index], numberStr])
            })
          } else if (item.length) {
            if (item[0].hex) {
              value = new BigNumberJs(item[0].hex).toFixed()
            } else {
              value = item[0]
            }
          } else {
            value = item
          }
          if (v['originalContractCallContext']['reference'] !== 'eventDates') {
            data[v['originalContractCallContext']['reference']] = value
          } else {
            eventDates.map((vvv, index) => {
              data[eventDatesValueKey[index]] = vvv[1]
            })
            // IMonsterStatus.fight
            // data[MonsterKeyType.maxHP] = '1695192761' // 2023-11-19 14:52:41
            // data['nftStartedAt'] = '1695192761' // 2023-11-19 14:52:41
            // data['nftEndedAt'] = '1702968761' // 2023-12-19 14:52:41
            // data['challengeStartedAt'] = '1695192761' // 2023-12-20 14:52:41
            // data['challengeEndedAt'] = '1729667879'
            // IMonsterStatus.MonsterNft
            // data[MonsterKeyType.maxHP] = '1695192761' // 2023-11-19 14:52:41
            // data['nftStartedAt'] = '1695192761' // 2023-11-19 14:52:41
            // data['nftEndedAt'] = '1702968761' // 2023-12-19 14:52:41
            // data['challengeStartedAt'] = '1702968761' // 2023-12-20 14:52:41
            // data['challengeEndedAt'] = '1729667879'

            // data['nftStartedAt'] = '1695192761' // 2023-11-19 14:52:41
            // data['nftEndedAt'] = '1702968761' // 2023-12-19 14:52:41
            // data['challengeStartedAt'] = '1695192761' // 2023-12-20 14:52:41
            // data['challengeEndedAt'] = '1695192761'
          }
        })
        return data
      }
    } else {
      throw new Error('No multicall address')
    }
    return undefined
  } catch (e: any) {
    console.error('fetchMonster: ', e)
    return undefined
  }
}
