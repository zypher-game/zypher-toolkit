import { activeTokenList, ChainId, getContract } from '@ui/src'
import { ethers } from 'ethers'
import { Address, WalletClient } from 'wagmi'

import sbtAbi from './abi/sbtAbi.json'

export const sbtContract = ({ chainId, env, signer }: { chainId: ChainId; env: string; address?: Address; signer?: any }): ethers.Contract => {
  return getContract({
    env: env,
    abi: sbtAbi,
    address: activeTokenList[chainId].Soulbound,
    signer,
    chainId: chainId as unknown as ChainId
  })
}

export { sbtAbi }
