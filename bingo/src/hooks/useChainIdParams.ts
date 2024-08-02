import { bingoSupportedChainId, ChainId, useActiveWeb3React } from '@ui/src'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { defaultChainId } from '@/constants/constants'

export const useChainIdParams = () => {
  const { chainIdParams } = useParams()
  const { chainId } = useActiveWeb3React()
  console.log({ chainId })
  return useMemo(() => {
    return chainIdParams ? chainIdParams : chainId ? chainId : defaultChainId.toString()
  }, [chainIdParams])
}

export const useChainIdParamsAsChainId = () => {
  const { chainIdParams } = useParams()
  return useMemo(() => {
    const _chainId = chainIdParams as ChainId
    if (bingoSupportedChainId.includes(_chainId)) {
      return _chainId
    }
    return undefined
  }, [chainIdParams])
}
