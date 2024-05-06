import { ChainId, IContractName, zkBingo } from '@ui/src'
import { MulticallContract } from '@ui/src'
import MonsterAbi from '@zypher-game/events/abi/MonsterSlayer202310.json'
import { Address } from 'wagmi'

import BigNumberJs from '@/utils/BigNumberJs'
export const fetchAccountMonsterNft = async ({ chainId, account }: { chainId: ChainId; account: Address }): Promise<boolean | undefined> => {
  try {
    const MonsterContract = zkBingo(chainId, IContractName.Monster)
    const staticStr = [
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
        const item = new BigNumberJs(results['balance']['callsReturnContext'][0]['returnValues'][0].hex).gt(0)
        return item
      }
    } else {
      throw new Error('No multicall address')
    }
    return undefined
  } catch (e: any) {
    console.error('fetchAccountMonsterNft: ', e)
    return undefined
  }
}
