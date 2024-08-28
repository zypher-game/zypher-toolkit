import {
  bingoBetaSupportedChainId,
  bingoV1SupportedChainId,
  ChainId,
  useAccount,
  useChainId,
  useAaWallet,
  usePublicClient,
  useRecoilValue,
  useWalletHandler
} from '@ui/src'
import { useMemo } from 'react'
import { PublicClient } from 'wagmi'

import { bingoVersionState, IBingoVersion } from '@/pages/state/state'

export function useActiveWeb3ReactForBingo(): {
  chainId: ChainId
  account: `0x${string}` | undefined
  provider: PublicClient
  bingoVersion: IBingoVersion
} {
  const bingoVersion = useRecoilValue(bingoVersionState)
  const _chainId = useChainId()
  const { address } = useAccount()
  const provider = usePublicClient() as PublicClient
  const { walletClient } = useAaWallet()
  return useMemo(() => {
    // const chainId = provider.chain.id as ChainId
    const chainId = `${_chainId}` as ChainId
    const supportedChainId = bingoVersion === IBingoVersion.v1 ? bingoV1SupportedChainId : bingoBetaSupportedChainId
    return {
      chainId: (chainId && supportedChainId.includes(chainId) ? chainId : undefined) as ChainId,
      account: walletClient ? walletClient.account.address : chainId && supportedChainId.includes(chainId) ? address : undefined,
      // account: '0xe6c789b1fb47dbbdcdc5ba643d698f575c598178',
      // account: '0x7394e4baf670f98a07a708578bca0e94788327b3',
      // account: '0x0d60cd0f59378e780c883d6af5ca5c23dbf6f479',
      provider: provider,
      bingoVersion: bingoVersion
    }
  }, [_chainId, address, walletClient, bingoVersion, provider])
}
