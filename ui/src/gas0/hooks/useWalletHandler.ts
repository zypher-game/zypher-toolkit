import { useWalletClient } from "wagmi";
import { useGas0Balance } from "./useGas0Balance";
import { useActiveWeb3React } from "../../hooks/useActiveWeb3React";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  gas0WalletCreateAndApprove,
  Iaa,
  WagmiWalletHandler,
} from "../utils/wagmiWalletHandler";
import { Gas0Constants } from "../constants/Gas0Constant";

import BigNumberJs from "../../utils/BigNumberJs";
import { Address, WalletClient, zeroAddress } from "viem";
import { getIsCode } from "../utils/getIsCode";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { TonProofItemReplySuccess } from "@tonconnect/ui-react";

export type IAAWallet = {
  getContainer?: HTMLElement | null;
  wallet?: WagmiWalletHandler;
  walletClient?: any;
  aaWalletClient?: any;
  mockAcc?: any;
  aa_mm_address?: Address;
  aa?: Iaa;
  account?: Address;
};
export const aaWalletState = atom<IAAWallet>({
  key: "aaWalletState",
  default: {
    getContainer: undefined,
    walletClient: undefined,
    aa: undefined,
    aa_mm_address: undefined,
    account: undefined,
    mockAcc: (address: Address, proof?: TonProofItemReplySuccess) =>
      null as any,
  },
});

export const useAaWallet = () => {
  return useRecoilValue(aaWalletState);
};
export const useSetAaWallet = () => {
  return useSetRecoilState(aaWalletState);
};

export const useWalletHandler = () => {
  const { data: walletClient } = useWalletClient();
  const { walletClient: _walletClient } = useAaWallet();
  const { getWalletClient } = useGetWalletClient();
  useEffect(() => {
    getWalletClient();
  }, [getWalletClient, !!walletClient]);
  return { getWalletClient };
};

export const useGetWalletClient = () => {
  const { data: walletClient } = useWalletClient();
  const { loading, balance: gas0Balance, config } = useGas0Balance();
  const { account, chainId } = useActiveWeb3React();
  const [isSet, setIsSet] = useState(false);
  const key = useRef("");
  const setAaWallet = useSetAaWallet();
  const { walletClient: _walletClient, aaWalletClient } = useAaWallet();
  const getWalletClient = useCallback(() => {
    try {
      if (isSet) {
        return;
      }
      if (loading || !chainId || !account || !walletClient) {
        return;
      }
      const keyString = [
        account,
        chainId,
        gas0Balance,
        !!_walletClient,
        !!aaWalletClient,
      ].join("-");
      console.log({ gas0Balance, config });
      if (Gas0Constants[chainId]) {
        if (key.current === keyString && _walletClient && aaWalletClient) {
          return;
        }
        setIsSet(true);
        key.current = keyString;
        if (
          new BigNumberJs(gas0Balance).gt(0) &&
          config.deployer_address !== zeroAddress
        ) {
          console.log(1111);
          console.log(33333);
          const WH = new WagmiWalletHandler(walletClient, gas0Balance, config);
          setAaWallet((pre) => ({
            ...pre,
            wallet: WH,
            aa: WH.aa,
            account: WH.account.address,
            aa_mm_address: WH.aa ? WH.aa.address : WH.account.address,
            walletClient: WH.getWalletClient(),
            aaWalletClient: WH.getAAWalletClient(),
          }));
          setIsSet(false);
          return;
        }
      }
      setIsSet(true);
      console.log(4444);
      console.log({ account });
      setAaWallet((pre) => ({
        ...pre,
        wallet: undefined,
        aa: undefined,
        account: account,
        aa_mm_address: account,
        walletClient: walletClient,
        aaWalletClient: walletClient,
      }));
      setIsSet(false);
      return;
    } catch (err) {
      console.log("getWalletClient err", err);
    }
  }, [key.current, account, chainId, walletClient, gas0Balance]);
  return { getWalletClient };
};

export const useCreate = () => {
  const { account: owner, wallet, aa_mm_address } = useAaWallet();
  const create = useCallback(async () => {
    console.log(222222);
    if (wallet && aa_mm_address && wallet.aa && owner) {
      console.log(11111);
      const isCreate = await getIsCode(wallet.publicClient, aa_mm_address); // eoa =>
      console.log(1, { isCreate });
      if (!isCreate) {
        const hash = await gas0WalletCreateAndApprove(
          owner,
          wallet.aa.config.api,
          wallet.aa.isFree
        );
        console.log(1);
        if (!hash) return;
        console.log(1, hash);
        await wallet.publicClient.waitForTransactionReceipt({
          hash,
          confirmations: 1,
        });
      }
    }
  }, [owner, aa_mm_address]);
  return create;
};
