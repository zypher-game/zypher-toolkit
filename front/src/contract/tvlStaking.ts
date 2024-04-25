import { ChainId, getContract } from '@UI/src/'
import { ethers } from 'ethers'
import { Address, WalletClient } from 'wagmi'

import { tvlTokenAddress } from '@/pages/Active/constants/activeConstants'

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
    address: tvlTokenAddress[chainId].Restaking,
    signer,
    chainId
  })
}

export { TVLStakingABI }
