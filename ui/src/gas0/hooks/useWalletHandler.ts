import { useWalletClient } from "wagmi";
import { useGas0Balance } from "./useGas0Balance";
import { useActiveWeb3React } from "../../hooks/useActiveWeb3React";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { WagmiWalletHandler } from "../utils/wagmiWalletHandler";
import { Gas0Constants } from "../constants/Gas0Constant";
import { GlobalVar } from "../../constant/constant";
import { isEqual } from "../../utils/lodash";

export const useWalletHandler = () => {
  const { data: walletClient } = useWalletClient();
  const gas0Balance = useGas0Balance();
  const { account, chainId } = useActiveWeb3React();
  const [isSet, setIsSet] = useState(false);
  const key = useRef("");
  const getWalletClient = useCallback(() => {
    if (isSet) {
      return;
    }
    const keyString = [account, chainId, gas0Balance].join("-");

    if (!walletClient || !chainId || !account) {
      console.log(1);
      return;
    }
    setIsSet(true);
    if (Gas0Constants[chainId]) {
      if (key.current === keyString && GlobalVar.walletClient) {
        return;
      }
      key.current = keyString;
      GlobalVar.walletClient = new WagmiWalletHandler(
        walletClient,
        gas0Balance
      ).getWalletClient();
      setIsSet(false);
      return;
    }
    GlobalVar.walletClient = walletClient;
    setIsSet(false);
    return;
  }, [key.current, account, chainId, walletClient, gas0Balance]);
  useEffect(() => {
    getWalletClient();
  }, [getWalletClient]);
  return useMemo(() => {
    return GlobalVar.walletClient;
  }, [GlobalVar.walletClient]);
};
