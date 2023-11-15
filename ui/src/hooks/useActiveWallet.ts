import { useWalletConnectors } from "@zypher-game/toolkit/rainbowkit";
import { WalletConnector } from "@zypher-game/toolkit/rainbowkit/wallets/useWalletConnectors";
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
