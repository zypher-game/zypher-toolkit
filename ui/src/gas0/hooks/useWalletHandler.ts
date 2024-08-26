import { useWalletClient } from "wagmi";
import { useGas0Balance } from "./useGas0Balance";
import { useActiveWeb3React } from "../../hooks/useActiveWeb3React";
import { useCallback, useEffect, useRef, useState } from "react";
import { WagmiWalletHandler } from "../utils/wagmiWalletHandler";
import { Gas0Constants } from "../constants/Gas0Constant";
import { useGlobalVar, useSetGlobalVar } from "../../hooks/GlabalVar/hooks";

export const useWalletHandler = () => {
  const { data: walletClient } = useWalletClient();
  const gas0Balance = useGas0Balance();
  const { account, chainId } = useActiveWeb3React();
  const [isSet, setIsSet] = useState(false);
  const key = useRef("");
  const setGlobalVar = useSetGlobalVar();
  const { walletClient: _walletClient } = useGlobalVar();
  const getWalletClient = useCallback(() => {
    if (isSet) {
      return;
    }
    const keyString = [account, chainId, gas0Balance].join("-");

    if (!walletClient || !chainId || !account) {
      return;
    }
    if (key.current === keyString && _walletClient) {
      return;
    }
    key.current = keyString;
    setIsSet(true);
    if (Gas0Constants[chainId]) {
      setGlobalVar((pre) => ({
        ...pre,
        walletClient: new WagmiWalletHandler(
          walletClient,
          gas0Balance
        ).getWalletClient(),
      }));
      setIsSet(false);
      return;
    }
    setGlobalVar((pre) => ({
      ...pre,
      walletClient: walletClient,
    }));
    setIsSet(false);
    return;
  }, [key.current, account, chainId, walletClient, gas0Balance]);
  useEffect(() => {
    getWalletClient();
  }, [getWalletClient]);
};
