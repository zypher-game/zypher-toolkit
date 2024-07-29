import { bingoSupportedChainId, ChainId, useChainModal } from "@ui/src";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { toBingoHref } from "@/utils/toBingoHref";

export const useInitRainbowFn = () => {
  const navigate = useNavigate();
  const { setFn, closeChainModal } = useChainModal();

  useEffect(() => {
    if (setFn && closeChainModal) {
      setFn((_c: ChainId) => {
        if (_c && bingoSupportedChainId.includes(_c)) {
          toBingoHref({
            chainIdParams: `${_c}`,
            navigate,
          });
        }
        return false;
      });
    }
    return () => {
      setFn(undefined);
    };
  }, [setFn, closeChainModal]);
};
