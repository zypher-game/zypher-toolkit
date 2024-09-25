import { ChainId, getContract } from '@ui/src'
import * as ethers from 'ethers'
import { Address } from 'wagmi'

import abi from './abi/zkGame2048.json'

const zkGame2048 = (chainId: ChainId, env: string, address?: Address, signer?: any): ethers.ethers.Contract | undefined => {
  if (address) {
    return getContract({
      env,
      abi,
      address: address,
      signer,
      chainId
    })
  }
}

export default zkGame2048
