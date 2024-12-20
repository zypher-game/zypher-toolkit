import { useCallback } from "react";
import { useActiveWeb3React, useSetRecoilState } from "..";
import {
  pointsDialogState,
  pointsV2DialogState,
} from "../components/ConnectWallet/state/connectWalletState";
import { GPV2SupportChainId } from "../components/Staking/GP/constant/GPConstant";

export const usePointsDialogState = () => {
  const setPointsDialogState = useSetRecoilState(pointsDialogState);
  const setPointsV2DialogState = useSetRecoilState(pointsV2DialogState);
  const { chainId } = useActiveWeb3React();
  const showPointsModal = useCallback(() => {
    // GPV2
    if (GPV2SupportChainId.includes(chainId)) {
      setPointsV2DialogState(true);
    } else {
      setPointsDialogState(true);
    }
  }, [setPointsDialogState, chainId]);
  return showPointsModal;
};
