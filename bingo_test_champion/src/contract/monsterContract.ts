import { JsonRpcProvider } from '@ethersproject/providers'
import { ChainId, getContract, getContractFromRpc, IContractName, zkBingoV1 } from '@ui/src'
import abi from '@zypher-game/events/abi/MonsterSlayer202310.json'
import * as ethers from 'ethers'
import { Address } from 'wagmi'

// monster  tokenOfOwnerByIndex
const MonsterContract = (chainId: ChainId, env: string, address?: Address, signer?: any): ethers.ethers.Contract => {
  return getContract({
    env,
    abi,
    address: address ?? zkBingoV1(chainId, IContractName.Monster),
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
