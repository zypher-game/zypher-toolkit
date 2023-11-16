import { WalletConnector, useWalletConnectors } from "@my/rainbowkit";
import { useMemo } from "react";

export const useActiveWallet = (): WalletConnector | undefined => {
  const wallets = useWalletConnectors();
  return useMemo((): WalletConnector | undefined => {
    if (wallets) {
      const wall = wallets.filter((v) => v.ready && v.recent);
      return wall?.[0];
    }
    return undefined;
  }, [wallets]);
};
