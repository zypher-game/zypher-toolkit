import { useWalletClient } from "wagmi";
import { useGas0Balance } from "./useGas0Balance";
import { useActiveWeb3React } from "../../hooks/useActiveWeb3React";
import { useCallback, useEffect, useRef, useState } from "react";
import { WagmiWalletHandler } from "../utils/wagmiWalletHandler";
import { Gas0Constants } from "../constants/Gas0Constant";
import { useAaWallet, useSetAaWallet } from "../../hooks/aaWallet/hooks";
import BigNumberJs from "../../utils/BigNumberJs";
import { zeroAddress } from "viem";

export const useWalletHandler = () => {
  const { data: walletClient } = useWalletClient();
  const { loading, balance: gas0Balance, config } = useGas0Balance();
  const { account, chainId } = useActiveWeb3React();
  const [isSet, setIsSet] = useState(false);
  const key = useRef("");
  const setAaWallet = useSetAaWallet();
  const { walletClient: _walletClient } = useAaWallet();
  const getWalletClient = useCallback(() => {
    if (isSet) {
      return;
    }
    if (loading || !walletClient || !chainId || !account) {
      console.log({ loading, walletClient, chainId, account });
      return;
    }
    const keyString = [account, chainId, gas0Balance, !!_walletClient].join(
      "-"
    );
    console.log({ _walletClient });
    if (key.current === keyString && _walletClient) {
      return;
    }
    key.current = keyString;
    setIsSet(true);
    console.log({ gas0Balance, config });
    if (Gas0Constants[chainId]) {
      if (
        new BigNumberJs(gas0Balance).gt(0) &&
        config.deployer_address !== zeroAddress
      ) {
        console.log(1111);
        const WH = new WagmiWalletHandler(walletClient, gas0Balance, config);
        console.log(33333);
        setAaWallet((pre) => ({
          ...pre,
          wallet: WH,
          aa: WH.aa,
          aa_mm_address: WH.aa ? WH.aa.address : WH.account.address,
          walletClient: WH.getWalletClient(),
          aaWalletClient: WH.getAAWalletClient(),
        }));
        setIsSet(false);
        return;
      }
    }
    console.log(4444);
    setAaWallet((pre) => ({
      ...pre,
      wallet: undefined,
      aa: undefined,
      aa_mm_address: account,
      walletClient: walletClient,
      aaWalletClient: undefined,
    }));
    setIsSet(false);
    return;
  }, [key.current, account, chainId, walletClient, gas0Balance]);
  useEffect(() => {
    getWalletClient();
  }, [getWalletClient]);
};
