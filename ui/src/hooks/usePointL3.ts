import { useCallback, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import { pointsL3DialogState } from "../components/ConnectWallet/state/connectWalletState";

type ISwapPoint = {
  isLoading: boolean;
  swapPointL3Handle: any;
};
export const useSwapPointL3 = ({
  env,
  setSuccessToast,
  setErrorToast,
}: {
  env: string;
  setSuccessToast: any;
  setErrorToast: any;
}): ISwapPoint => {
  const [isLoading, setIsLoading] = useState(false);
  const pointsL3DialogOpen = useRecoilValue(pointsL3DialogState);
  useEffect(() => {
    setIsLoading(false);
  }, [pointsL3DialogOpen]);
  const swapPointL3Handle = useCallback(async (index?: number) => {}, []);
  return { isLoading, swapPointL3Handle };
};
