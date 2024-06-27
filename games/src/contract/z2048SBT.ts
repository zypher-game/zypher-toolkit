import { ChainId, ChainRpcUrls, getContract, getContractFromRpc, getProvider } from '@ui/src'
import * as ethers from 'ethers'
import { Address, WalletClient } from 'wagmi'

import abi from './abi/z2048SBT.json'

const z2048SBT = (chainId: ChainId, env: string, address?: Address, signer?: WalletClient): ethers.ethers.Contract => {
  return getContract({
    env,
    abi,
    address: address,
    signer,
    chainId
  })
}

export const z2048SBTFromRpc = async ({
  chainId,
  address,
  account
}: {
  chainId: ChainId
  address: Address
  account?: string | null | undefined
}): Promise<ethers.Contract> => {
  const provider = await getProvider(ChainRpcUrls[chainId][0])
  return getContractFromRpc({
    address,
    abi,
    library: provider,
    account
  })
}
export default z2048SBT
