import { JsonRpcProvider } from '@ethersproject/providers'
import abi from '@zypher-game/events/abi/MonsterSlayer202310.json'
import { ChainId, getContract, getContractFromRpc, IContractName, zkBingo } from '@zypher-game/toolkit/ui'
import * as ethers from 'ethers'
import { Address, WalletClient } from 'wagmi'

// monster  tokenOfOwnerByIndex
const MonsterContract = (chainId: ChainId, env: string, address?: Address, signer?: WalletClient): ethers.ethers.Contract => {
  return getContract({
    env,
    abi,
    address: address ?? zkBingo(chainId, IContractName.Monster),
    signer,
    chainId
  })
}

export const MonsterContractFromRpc = ({
  address,
  library,
  account
}: {
  address: Address
  library: JsonRpcProvider
  account?: string | null | undefined
}): Promise<ethers.Contract> => {
  return getContractFromRpc({
    address,
    abi,
    library,
    account
  })
}
export default MonsterContract
