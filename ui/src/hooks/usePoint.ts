import { formatMoney } from "../utils/tool";
import {
  ChainId,
  IPointsItem,
  hidePointsWarnState,
  pointsDialogState,
  pointsWarnState,
  refreshBalanceState,
} from "..";
import { TransactionReceipt } from "viem";
import BigNumberjs from "bignumber.js";
import { useActiveWeb3React } from "./useActiveWeb3React";
import { useAccountInvitation } from "./useAccountInvitation";
import { useCallback, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { usePublicNodeWaitForTransaction } from "./usePublicNodeWaitForTransaction";
import { useWalletClient } from "wagmi";
import ZkBingoPointsContract from "../contract/bingoPoints";
import { IContractName, txStatus, zkBingo } from "../constant/constant";
import { ethers } from "ethers";
const ChainPointPrice = {
  [ChainId.LineaMainnet]: 1 / 2_000_000,
  [ChainId.LineaTestnet]: 1 / 2_000_000,
  [ChainId.OPBNB]: 1 / 250_000,
  [ChainId.OPBNBTEST]: 1 / 250_000,
};
export const pointsListDefault = (
  chainId: ChainId
): IPointsItem[] | undefined => {
  try {
    return [
      ["1000"],
      ["10000"],
      ["30000"],
      ["50000"],
      // ["60000"],
      ["80000"],
      ["100000 ", "2"],
      ["300000", "5"],
      ["500000", "10"],
    ].map((v, index) => {
      const chainPrice = ChainPointPrice[chainId];
      const price = v[1]
        ? new BigNumberjs(chainPrice)
            .times(v[0])
            .times((100 - Number(v[1])) * 0.01)
            .toFixed(8)
        : new BigNumberjs(chainPrice).times(v[0]).toFixed(8);
      const priceStr = formatMoney(Number(price), 8);
      const pointAmountStr = formatMoney(Number(v[0]));
      return {
        index: index + 1,
        pointAmount: v[0],
        pointAmountStr: pointAmountStr,
        price: price,
        priceStr: priceStr,
        discount: v[1],
      } as unknown as IPointsItem;
    });
  } catch (e) {
    console.error("pointsListDefault: ", e);
  }
  return undefined;
};

type ISwapPoint = {
  isLoading: boolean;
  swapPointHandle: any;
};
export const useSwapPoint = ({
  env,
  dispatch,
  setSuccessToast,
  setErrorToast,
}: {
  env: string;
  dispatch: any;
  setSuccessToast: any;
  setErrorToast: any;
}): ISwapPoint => {
  const { account, chainId } = useActiveWeb3React();
  const { postAccountUpdate } = useAccountInvitation(env);
  const [isLoading, setIsLoading] = useState(false);
  const setPointsDialogOpen = useSetRecoilState(pointsDialogState);
  const [refreshBalance, setRefreshBalanceState] =
    useRecoilState(refreshBalanceState);
  // const pointsContract = useBingoPointsContract()
  const { waitForTransaction } = usePublicNodeWaitForTransaction(env);

  const hidePointsWarn = useRecoilValue(hidePointsWarnState);
  const [pointsWarn, setPointsWarn] = useRecoilState(pointsWarnState);
  const [choseIndex, setChoseIndex] = useState<number>();
  const { data: walletClient } = useWalletClient();
  const swapPointHandle = useCallback(
    async (index?: number) => {
      if ((pointsWarn === 1 || hidePointsWarn) && walletClient) {
        const _index = choseIndex || choseIndex === 0 ? choseIndex : index;
        if (_index || _index === 0) {
          setPointsWarn(2);
          try {
            const pointsList = pointsListDefault(chainId);
            if (pointsList) {
              const v = pointsList[_index];
              setIsLoading(true);
              const pointsContract = ZkBingoPointsContract(
                chainId,
                env,
                undefined,
                walletClient
              );
              if (!chainId || !pointsContract) {
                setPointsDialogOpen(false);
                if (!pointsContract) {
                  setErrorToast(dispatch, "PointsContract is not ready");
                }
                return;
              }
              const lobbyContractAddress = zkBingo(
                chainId,
                IContractName.Lobby
              );
              const res = await pointsContract.write.nativeSwap(
                [lobbyContractAddress, v.index],
                {
                  value: ethers.utils.parseEther(v.price),
                  account: account,
                }
              );
              const hash = typeof res === "string" ? res : res.hash;
              const nativeSwapTx: TransactionReceipt | undefined =
                await waitForTransaction({ confirmations: 1, hash });
              if (nativeSwapTx && nativeSwapTx.status === txStatus) {
                postAccountUpdate({ tx: nativeSwapTx });
                setRefreshBalanceState(refreshBalance + 1);
                setSuccessToast(dispatch, {
                  title: "",
                  message: "Recharge successful",
                });
                setPointsDialogOpen(false);
              } else {
                throw Object.assign(
                  new Error("NativeSwap Transaction Failed"),
                  { name: "NativeSwap" }
                );
              }
            } else {
              throw Object.assign(new Error("Not pointsList"), {
                name: "NativeSwap",
              });
            }
          } catch (e) {
            setErrorToast(dispatch, e);
            console.error("swapPointHandle: ", e);
          } finally {
            setIsLoading(false);
          }
        } else {
          setPointsWarn(0);
        }
      } else {
        setChoseIndex(index);
        setPointsWarn(1);
      }
    },
    [
      account,
      choseIndex,
      hidePointsWarn,
      pointsWarn,
      chainId,
      refreshBalance,
      walletClient,
    ]
  );
  return { isLoading, swapPointHandle };
};
