import { useMemo } from "react";
import { PublicClient, useAccount, usePublicClient } from "wagmi";

import { ChainId, supportedChainIds } from "../constant/constant";
import { useChainId } from "../rainbowkit/src/hooks/useChainId";

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
      chainId: (chainId &&
      !supportedChainIds(env, chainList).includes(`${chainId}` as ChainId)
        ? undefined
        : `${chainId}`) as ChainId,
      // account:
      //   chainId &&
      //   !supportedChainIds(env, chainList).includes(`${chainId}` as ChainId)
      //     ? undefined
      //     : address,
      account: "0xE84aE76d852b9f522EE0871F0B16317CDc3F122D",
      provider: provider,
    };
  }, [chainId, address, provider]);
}
