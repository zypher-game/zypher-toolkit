import { ChainRpcUrls, useActiveWeb3React } from '@UI/src/'
import { getProvider } from '@UI/src/'
import { ethers } from 'ethers'
import { useCallback, useMemo } from 'react'

/**
 * Returns the price of 1 gas in WEI for the currently selected network using the chainlink fast gas price oracle
 */
export default function useGasPrice() {
  const { chainId } = useActiveWeb3React()

  // const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`);
  return useCallback(async () => {
    if (!chainId) {
      return undefined
    }
    const provider = await getProvider(ChainRpcUrls[chainId][0])
    const gasPrice = await provider.getGasPrice()
    // return { gasPrice: gasPrice, gasLimit: 100000000 }
    return {}
  }, [chainId])
}
