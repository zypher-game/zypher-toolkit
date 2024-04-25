import { ChainId, getContract } from '@UI/src/'
import * as ethers from 'ethers'
import { Address, WalletClient } from 'wagmi'

import abi from './abi/zkGame2048.json'

const zkGame2048 = (chainId: ChainId, env: string, address?: Address, signer?: WalletClient): ethers.ethers.Contract => {
  return getContract({
    env,
    abi,
    address: address,
    signer,
    chainId
  })
}

export default zkGame2048
