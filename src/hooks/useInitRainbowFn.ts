import { useChainModal } from "@zypher-game/rainbowkit";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { ChainId } from "../constant/constant";

import {
  linkToBetaDialogChainIdState,
  linkToBetaDialogState,
} from "../components/ConnectWallet/state/connectWalletState";

export const useInitRainbowFn = () => {
  const { setFn, closeChainModal } = useChainModal();
  const setLinkToBetaDialogState = useSetRecoilState(linkToBetaDialogState);
  const setLinkToBetaDialogChainIdState = useSetRecoilState(
    linkToBetaDialogChainIdState
  );
  useEffect(() => {
    if (setFn && closeChainModal) {
      setFn((_c: any) => {
        if (_c === ChainId.Arbitrum || _c === ChainId.MantaPacificMainnet) {
          setLinkToBetaDialogState(true);
          setLinkToBetaDialogChainIdState(_c as ChainId);
          closeChainModal();
          return false;
        }
        return true;
      });
    }
    return () => {
      setFn(undefined);
    };
  }, [setFn, closeChainModal]);
};
