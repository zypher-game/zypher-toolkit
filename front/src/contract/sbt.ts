import { ChainId, getContract } from '@ui/src'
import { ethers } from 'ethers'
import { Address, WalletClient } from 'wagmi'

import { activeTokenList } from '@/pages/Active/constants/activeConstants'

import sbtAbi from './abi/sbtAbi.json'

export const sbtContract = ({
  chainId,
  env,
  signer
}: {
  chainId: ChainId
  env: string
  address?: Address
  signer?: WalletClient
}): ethers.Contract => {
  return getContract({
    env: env,
    abi: sbtAbi,
    address: activeTokenList[chainId].Soulbound,
    signer,
    chainId: chainId as unknown as ChainId
  })
}

export { sbtAbi }
