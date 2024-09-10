import { activeTokenList, ChainId, getContract } from '@ui/src'
import { ethers } from 'ethers'
import { Address, WalletClient } from 'wagmi'

import crHeroAbi from './abi/crHeroAbi.json'

export const crHeroContract = ({ chainId, env, signer }: { chainId: ChainId; env: string; address?: Address; signer?: any }): ethers.Contract => {
  return getContract({
    env: env,
    abi: crHeroAbi,
    address: activeTokenList[chainId].CRHero,
    signer,
    chainId: chainId as unknown as ChainId
  })
}

export { crHeroAbi }
