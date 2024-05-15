import { ChainId, getContract } from '@ui/src'
import { ethers } from 'ethers'
import { Address, WalletClient } from 'wagmi'

import { activeTokenList } from '@/pages/Active/constants/activeConstants'

import crHeroAbi from './abi/crHeroAbi.json'

export const crHeroContract = ({
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
    abi: crHeroAbi,
    address: activeTokenList[chainId].CRHero,
    signer,
    chainId: chainId as unknown as ChainId
  })
}

export { crHeroAbi }
