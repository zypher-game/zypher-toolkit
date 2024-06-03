import { Contract } from '@ethersproject/contracts'
import { ChainId, getContract, useActiveChainId, useWalletClient } from '@ui/src'
import { useMemo } from 'react'
import { Address } from 'viem'

import { defaultLocalChainId } from '@/constants/constants'

import { env } from '../utils/config'

export function useContract(addressOrAddressMap?: Address | { [chainId: number]: Address }, abi?: any, defaultChainId?: ChainId): Contract | null {
  const { chainId } = useActiveChainId(env)
  const { data: walletClient } = useWalletClient()

  return useMemo(() => {
    const localChainId = chainId ?? defaultLocalChainId
    if (!addressOrAddressMap || !abi || !localChainId) {
      return null
    }
    let address: Address | undefined
    if (typeof addressOrAddressMap === 'string') {
      address = addressOrAddressMap
    } else {
      address = addressOrAddressMap[localChainId]
    }
    if (!address) {
      return null
    }
    try {
      return getContract({
        env: env,
        abi,
        address,
        chainId: localChainId,
        signer: walletClient ?? undefined
      })
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [addressOrAddressMap, abi, chainId, walletClient])
}