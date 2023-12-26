import { useChainId } from "@my/rainbowkit";
import { useMemo } from "react";
import { PublicClient, useAccount, usePublicClient } from "wagmi";

import { ChainId, UnSupportChainId } from "../constant/constant";

export function useActiveWeb3React(): {
  chainId: ChainId;
  account: `0x${string}` | undefined;
  provider: PublicClient;
} {
  const chainId = useChainId();
  const { address } = useAccount();
  const provider = usePublicClient() as PublicClient;
  return useMemo(() => {
    // const chainId = provider.chain.id as ChainId
    return {
      chainId: (chainId && UnSupportChainId.includes(chainId)
        ? undefined
        : chainId) as ChainId,
      account:
        chainId && UnSupportChainId.includes(chainId) ? undefined : address,
      // account: '0xe6c789b1fb47dbbdcdc5ba643d698f575c598178',
      // account: '0x7394e4baf670f98a07a708578bca0e94788327b3',
      // account: '0x0d60cd0f59378e780c883d6af5ca5c23dbf6f479',
      provider: provider,
    };
  }, [chainId, address, provider]);
}
