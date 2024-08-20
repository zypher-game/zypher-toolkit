import { PublicClient, useWalletClient } from "wagmi";
import { useGas0Balance } from "./useGas0Balance";
import { useActiveWeb3React } from "../../hooks/useActiveWeb3React";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { WagmiWalletHandler } from "../utils/wagmiWalletHandler";
import { Gas0Constants } from "../constants/Gas0Constant";
import { GlobalVar } from "../../constant/constant";

export const useWalletHandler = () => {
  const { data: walletClient } = useWalletClient();
  const gas0Balance = useGas0Balance();
  const { account, chainId } = useActiveWeb3React();
  const [isSet, setIsSet] = useState(false);
  const key = useRef("");
  console.log({ gas0Balance });
  const getWalletClient = useCallback(() => {
    if (isSet) {
      return;
    }
    const keyString = [account, chainId, gas0Balance].join("-");
    if (key.current === keyString && GlobalVar.walletClient) {
      return;
    }
    key.current = keyString;
    if (!walletClient || !chainId || !account) {
      console.log(1);
      return;
    }
    setIsSet(true);
    console.log({ xxx: GlobalVar.walletClient });
    if (Gas0Constants[chainId]) {
      console.log(111111);
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
  }, [key.current, account, chainId, Boolean(walletClient), gas0Balance]);
  useEffect(() => {
    getWalletClient();
  }, [getWalletClient]);
  return useMemo(() => {
    return GlobalVar.walletClient;
  }, [GlobalVar.walletClient]);
};
