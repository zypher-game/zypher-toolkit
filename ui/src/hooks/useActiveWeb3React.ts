import { useChainId } from "@my/rainbowkit";
import { useMemo } from "react";
import { PublicClient, useAccount, usePublicClient } from "wagmi";

import { ChainId, supportedChainIds } from "../constant/constant";

export function useActiveWeb3React(
  env?: string,
  chainList?: ChainId[]
): {
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
      chainId: (chainId && supportedChainIds(env).includes(chainId)
        ? undefined
        : chainId) as ChainId,
      account:
        chainId && supportedChainIds(env, chainList).includes(chainId)
          ? undefined
          : address,
      provider: provider,
    };
  }, [chainId, address, provider]);
}
