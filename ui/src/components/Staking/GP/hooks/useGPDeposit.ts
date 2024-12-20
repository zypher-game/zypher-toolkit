import { useCallback, useEffect, useMemo, useState } from "react";
import { useAaWallet } from "../../../../gas0/hooks/useWalletHandler";
import ZgClientContract from "../contract/ZgClient";
import { Address, TransactionReceipt, zeroAddress } from "viem";
import { usePublicNodeWaitForTransaction } from "../../../../hooks/usePublicNodeWaitForTransaction";
import {
  ChainId,
  Currency,
  divisorBigNumber,
  getCryptoImg,
  IContractName,
  isPro,
  txStatus,
  zkBingo,
} from "../../../../constant/constant";
import { useAccountInvitation } from "../../../../hooks/useAccountInvitation";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  nativeBalanceState,
  pointsBalanceState,
  pointsV2DialogState,
  refreshBalanceState,
} from "../../../../components/ConnectWallet/state/connectWalletState";
import BigNumberJs from "../../../../utils/BigNumberJs";
import { IToken } from "../../../../constant/tvlConstant";
import erc20Contract from "../../../../contract/erc20";
import { GPAddress, GPV2SupportChainId } from "../constant/GPConstant";
import { formatMoney } from "../../../../utils/tool";
import { useSwitchNetwork } from "wagmi";

export interface IHealth {
  gp: Address;
  vault: Address;
  ok: boolean;
  canDeposit: boolean;
  canHandleGP: boolean;
  canWithdraw: boolean;
  accumulatedFee: string;
  ethLiquidity: string;
  exchangeRate: string;
  feeWithdraw: string;
  gpHandling: string;
  gpLiquidity: string;
  liquidityRatio: string;
  maxWithdrawStr: string;
  minDeposit: string;
  minDepositStr: string;
  minWithdraw: string;
  maxWithdraw: string;
  minWithdrawStr: string;
  timestamp: string;
}
export interface IUseGPDeposit {
  NativeToken?: IToken;
  GPToken?: IToken;

  loadingDeposit?: boolean;
  loadingWithdraw?: boolean;

  allowance?: string;
  health?: IHealth;
  deposit?: ({
    nativeValue,
    GPValue,
  }: {
    nativeValue: string;
    GPValue: string;
  }) => Promise<void>;
  withdraw?: ({
    nativeValue,
    GPValue,
    isL2,
  }: {
    nativeValue: string;
    GPValue: string;
    isL2: boolean;
  }) => Promise<void>;
  getWithdrawETH?: (GPValue: string) => Promise<string>;
}
export const useGPDeposit = ({
  env,
  setSuccessToast,
  setErrorToast,
}: {
  env: string;
  setSuccessToast: any;
  setErrorToast: any;
}): IUseGPDeposit => {
  const setPointsDialogOpen = useSetRecoilState(pointsV2DialogState);
  const { postAccountUpdate } = useAccountInvitation(env);
  const { walletClient, account, chainId } = useAaWallet();
  const { waitForTransaction } = usePublicNodeWaitForTransaction(env);
  const [refreshBalance, setRefreshBalanceState] =
    useRecoilState(refreshBalanceState);
  const [loadingDeposit, setIsLoadingDeposit] = useState(false);
  const [loadingWithdraw, setIsLoadingWithdraw] = useState(false);
  const [allowance, setAllowance] = useState("");
  const [health, setHealth] = useState<IHealth>();

  const nativeBalance = useRecoilValue(nativeBalanceState);
  const pointBalance = useRecoilValue(pointsBalanceState);
  const { switchNetworkAsync } = useSwitchNetwork();
  const { NativeToken, GPToken } = useMemo(() => {
    if (chainId) {
      const currency = Currency[chainId];
      return {
        NativeToken: {
          index: 1,
          address: zeroAddress,
          symbol: currency,
          logoPath: getCryptoImg("token", currency),
        },
        GPToken: {
          index: 2,
          address: zkBingo(chainId, IContractName.ZypherGameToken),
          symbol: "GP",
          logoPath: getCryptoImg("token", "GP"),
        },
      };
    }
    return {};
  }, [chainId]);
  useEffect(() => {
    getData();
  }, [chainId, account]);
  const getData = useCallback(async () => {
    if (chainId && GPV2SupportChainId.includes(chainId) && account) {
      const { Store } = GPAddress[chainId];
      const pointsAddress = zkBingo(chainId, IContractName.ZypherGameToken);
      const pointsContract = erc20Contract(
        chainId,
        env,
        pointsAddress,
        walletClient
      );
      const allowance = await pointsContract.read.allowance([account, Store]);
      const zgClient = ZgClientContract({ chainId, env });
      if (zgClient) {
        const health = await zgClient.read.health();
        console.log({ health });
        setHealth({
          ...health,
          accumulatedFee: health["accumulatedFee"].toString(),
          ethLiquidity: health["ethLiquidity"].toString(),
          exchangeRate: health["exchangeRate"].toString(),
          feeWithdraw: health["feeWithdraw"].toString(),
          gpHandling: health["gpHandling"].toString(),
          gpLiquidity: health["gpLiquidity"].toString(),
          liquidityRatio: health["liquidityRatio"].toString(),
          maxWithdraw: health["maxWithdraw"].toString(),
          minDeposit: health["minDeposit"].toString(),
          minDepositStr: formatMoney(
            new BigNumberJs(health["minDeposit"].toString())
              .dividedBy(divisorBigNumber)
              .toFixed(),
            8
          ),
          minWithdraw: health["minWithdraw"].toString(),
          minWithdrawStr: formatMoney(
            new BigNumberJs(health["minWithdraw"].toString())
              .dividedBy(divisorBigNumber)
              .toFixed(),
            8
          ),
          maxWithdrawStr: formatMoney(
            new BigNumberJs(health["maxWithdraw"].toString())
              .dividedBy(divisorBigNumber)
              .toFixed(),
            8
          ),
          timestamp: health["timestamp"].toString(),
        });
      }
      setAllowance(allowance.toString());
    }
  }, [chainId, account]);
  const deposit = useCallback(
    async ({
      nativeValue,
      GPValue,
    }: {
      nativeValue: string;
      GPValue: string;
    }) => {
      if (!chainId || !walletClient) {
        setErrorToast("walletClient is not ready");
        return;
      }
      const zgClient = ZgClientContract({ chainId, env, signer: walletClient });
      if (!zgClient) {
        setErrorToast("ZgClientContract is not ready");
        return;
      }
      setIsLoadingDeposit(true);
      try {
        if (new BigNumberJs(nativeValue).gt(nativeBalance)) {
          throw new Error("Amount is not enough");
        }
        const tokenAmount = new BigNumberJs(nativeValue)
          .times(divisorBigNumber)
          .toFixed();
        if (health) {
          if (new BigNumberJs(health.minDeposit).gt(tokenAmount)) {
            throw new Error(
              `Deposit value is below the minimum required amount (${health.minDepositStr}${Currency[chainId]}).`
            );
          }
        }

        const res = await zgClient.write.deposit([account], {
          value: tokenAmount,
        });
        const hash = typeof res === "string" ? res : res.hash;
        const nativeSwapTx: TransactionReceipt | undefined =
          await waitForTransaction({ confirmations: 1, hash });
        if (nativeSwapTx && nativeSwapTx.status === txStatus) {
          setSuccessToast({
            title: "",
            message: `Deposit ${GPValue}GP successful`,
          });
          setTimeout(() => {
            setPointsDialogOpen(false);
            postAccountUpdate({ tx: nativeSwapTx });
            setRefreshBalanceState(refreshBalance + 1);
          }, 500);
        } else {
          throw Object.assign(new Error("NativeSwap Transaction Failed"), {
            name: "NativeSwap",
          });
        }
      } catch (e) {
        setErrorToast(e);
        console.error("swapPointL2Handle: ", e);
      } finally {
        setIsLoadingDeposit(false);
      }
    },
    [chainId, nativeBalance, account, JSON.stringify(health)]
  );
  const withdraw = useCallback(
    async ({
      nativeValue,
      GPValue,
      isL2,
    }: {
      nativeValue: string;
      GPValue: string;
      isL2: boolean;
    }) => {
      if (!chainId || !walletClient) {
        setErrorToast("walletClient is not ready");
        return;
      }
      if (isL2) {
        setIsLoadingWithdraw(true);
        console.log(111);
        if (switchNetworkAsync) {
          const chain = isPro
            ? ChainId.ZytronLineaMain
            : ChainId.ZytronLineaSepoliaTestnet;
          await switchNetworkAsync(parseInt(chain, 10));
        } else {
          setErrorToast("switchNetwork is not ready");
        }
        setIsLoadingWithdraw(false);
        return;
      }
      const zgClient = ZgClientContract({ chainId, env, signer: walletClient });
      if (!zgClient) {
        setErrorToast("ZgClientContract is not ready");
        return;
      }
      setIsLoadingWithdraw(true);
      try {
        // const Store = GPAddress[chainId].Store
        // const storeContract = erc20Contract(chainId, env, Store, walletClient)
        // const _nativeBalance = storeContract.read.balanceOf()
        if (new BigNumberJs(GPValue).gt(pointBalance)) {
          throw new Error("Amount is not enough");
        }
        const { Store, GP } = GPAddress[chainId];
        const pointsContract = erc20Contract(chainId, env, GP, walletClient);
        const allowance = await pointsContract.read.allowance([account, Store]);
        const tokenAmount = new BigNumberJs(GPValue)
          .times(divisorBigNumber)
          .toFixed();
        if (health) {
          // >
          if (new BigNumberJs(health.minWithdraw).gt(tokenAmount)) {
            throw new Error(
              `Withdraw value is below the minimum required amount (${health.minWithdrawStr}) GP.`
            );
          }
          // <
          if (new BigNumberJs(health.maxWithdraw).lt(tokenAmount)) {
            throw new Error(
              `Withdraw value is below the maxWithdraw required amount (${health.maxWithdrawStr}) GP.`
            );
          }
        }
        if (new BigNumberJs(allowance.toString()).lt(tokenAmount)) {
          const approveTxn = await pointsContract.write.approve(
            [Store, tokenAmount],
            {
              account: account,
            }
          );
          const approveTxnHash =
            typeof approveTxn === "string" ? approveTxn : approveTxn.hash;
          await waitForTransaction({ confirmations: 2, hash: approveTxnHash });
          setSuccessToast({ title: "", message: "Approve successful" });
          await getData();
          return;
        }
        const res = await zgClient.write.withdraw([account, tokenAmount]);
        // const Store = GPAddress[chainId].Store
        const hash = typeof res === "string" ? res : res.hash;
        const nativeSwapTx: TransactionReceipt | undefined =
          await waitForTransaction({ confirmations: 1, hash });
        if (nativeSwapTx && nativeSwapTx.status === txStatus) {
          setSuccessToast({
            title: "",
            message: `Withdraw ${nativeValue}${Currency[chainId]} successful!`,
          });
          setTimeout(() => {
            setPointsDialogOpen(false);
            postAccountUpdate({ tx: nativeSwapTx });
            setRefreshBalanceState(refreshBalance + 1);
          }, 500);
        } else {
          throw Object.assign(new Error("WithdrawSwap Transaction Failed"), {
            name: "WithdrawSwap",
          });
        }
      } catch (e) {
        setErrorToast(e);
        console.error("Withdraw swapPointL2Handle: ", e);
      } finally {
        setIsLoadingWithdraw(false);
      }
    },
    [chainId, switchNetworkAsync, pointBalance, account, JSON.stringify(health)]
  );
  const getWithdrawETH = useCallback(
    async (GPValue: string) => {
      if (chainId) {
        const zgClient = ZgClientContract({ chainId, env });
        if (!zgClient) {
          setErrorToast("ZgClientContract is not ready");
        } else {
          try {
            const tokenAmount = new BigNumberJs(GPValue)
              .times(divisorBigNumber)
              .toFixed();
            // console.log({ tokenAmount });
            const value = await zgClient.read.queryWithdraw([tokenAmount]);
            // console.log({ value });
            if (value && value["receivedETH"]) {
              return formatMoney(
                new BigNumberJs(value["receivedETH"].toString())
                  .dividedBy(divisorBigNumber)
                  .toFixed(),
                8
              );
            }
          } catch (err: any) {
            // console.log("getWithdrawETH: ", err);
          }
        }
      }
      return "-";
    },
    [chainId]
  );
  return {
    NativeToken,
    GPToken,
    loadingWithdraw,
    loadingDeposit,
    deposit,
    withdraw,
    allowance,
    health,
    getWithdrawETH,
  };
};
