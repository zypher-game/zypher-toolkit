import { ChainId, getContract } from '@ui/src'
import { ethers } from 'ethers'
import { Address, WalletClient } from 'wagmi'

import { activeTokenList } from '@/pages/Active/constants/activeConstants'

import TVLStakingABI from './abi/tvlStaking.json'

export const TVLStakingContract = ({
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
    abi: TVLStakingABI,
    address: activeTokenList[chainId].Staking,
    signer,
    chainId: chainId as unknown as ChainId
  })
}

export { TVLStakingABI }
