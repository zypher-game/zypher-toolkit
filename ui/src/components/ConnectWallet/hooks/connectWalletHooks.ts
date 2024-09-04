import { useMemo } from "react";
import { useRecoilValue } from "recoil";

import { formatMoney } from "../../../utils/tool";

import {
  nativeBalanceState,
  pointsBalanceState,
} from "../state/connectWalletState";

export const useNativeBalanceStr = (): string => {
  const nativeBalance = useRecoilValue(nativeBalanceState);
  return useMemo(() => {
    return formatMoney(nativeBalance, 4);
  }, [nativeBalance]);
};

export const usePointsBalanceStr = (): string => {
  const pointsBalance = useRecoilValue(pointsBalanceState);
  return useMemo(() => {
    return formatMoney(pointsBalance, 0);
  }, [pointsBalance]);
};
