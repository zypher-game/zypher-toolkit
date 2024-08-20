import { useCallback } from "react";
import { TransactionReceipt } from "viem";
import { waitForTransaction, WaitForTransactionArgs } from "wagmi/actions";

import { viemClients as GETviemClients } from "../rainbow/rainbow";
import { useActiveWeb3React } from "./useActiveWeb3React";

export function usePublicNodeWaitForTransaction(env: string) {
  const { chainId } = useActiveWeb3React(env);

  const waitForTransaction_ = useCallback(
    async (
      opts: WaitForTransactionArgs
    ): Promise<TransactionReceipt | undefined> => {
      if (!chainId) {
        return undefined;
      }
      const viemClients = GETviemClients(env);
      // our custom node might be late to sync up
      if (viemClients[`${chainId}`]) {
        return viemClients[`${chainId}`].waitForTransactionReceipt(opts);
      }
      return waitForTransaction({ ...opts, chainId: Number(chainId) });
    },
    [chainId]
  );

  return {
    waitForTransaction: waitForTransaction_,
  };
}
