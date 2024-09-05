import { activeTokenList, ChainId, getContract } from '@ui/src'
import { ethers } from 'ethers'
import { Address, WalletClient } from 'wagmi'

import TVLStakingABI from './abi/tvlStaking.json'

export const TVLStakingContract = ({ chainId, env, signer }: { chainId: ChainId; env: string; address?: Address; signer?: any }): ethers.Contract => {
  return getContract({
    env: env,
    abi: TVLStakingABI,
    address: activeTokenList[chainId].Staking,
    signer,
    chainId: chainId as unknown as ChainId
  })
}

export { TVLStakingABI }
