import { ChainId, ChainRpcUrls, IContractName, zkBingo } from '@UI/src/'
import { getProvider } from '@UI/src/'
import { zeroAddress } from 'viem'
import { Address } from 'wagmi'

import { MonsterContractFromRpc } from '@/contract/monsterContract'

export const getTokenId = async ({ chainId, account, block }: { chainId: ChainId; account: Address; block: number }): Promise<string | undefined> => {
  let _tokenId
  try {
    if (!chainId || !account) {
      return
    }
    const provider = await getProvider(ChainRpcUrls[chainId][0])
    const monsterContractFromRpc = await MonsterContractFromRpc({ address: zkBingo(chainId, IContractName.Monster), library: provider, account })
    const curBlock = await provider.getBlockNumber()
    const filter = monsterContractFromRpc.filters.Transfer()
    // const events = await monsterContractFromRpc.queryFilter(filter, 10908321)
    const events = await monsterContractFromRpc.queryFilter(filter, block)
    const myEvents = events.filter(event => {
      const [list] = (event.args || []).slice(1, 2)
      return `${list}`.toLowerCase().includes(account.toLowerCase())
    })
    const [event] = myEvents
    if (event) {
      const [from, to, tokenId] = event.args || []
      if (from === zeroAddress) {
        _tokenId = '#BP' + tokenId.toString()
      }
    }
  } catch (e) {
    console.error('useMonsterContractEvent: ', e)
  }
  return _tokenId
}
