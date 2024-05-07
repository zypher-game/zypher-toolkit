import { useEffect } from "react";
import { useChainModal } from "../rainbowkit/src/components/RainbowKitProvider/ModalContext";

export const useInitRainbowFn = () => {
  const { setFn, closeChainModal } = useChainModal();
  // const setLinkToBetaDialogState = useSetRecoilState(linkToBetaDialogState);
  // const setLinkToBetaDialogChainIdState = useSetRecoilState(
  //   linkToBetaDialogChainIdState
  // );
  useEffect(() => {
    if (setFn && closeChainModal) {
      setFn((_c: any) => {
        // if (_c && UnSupportBingoChainId.includes(_c)) {
        //   setLinkToBetaDialogState(true);
        //   setLinkToBetaDialogChainIdState(_c as ChainId);
        //   closeChainModal();
        //   return false;
        // }
        return true;
      });
    }
    return () => {
      setFn(undefined);
    };
  }, [setFn, closeChainModal]);
};
