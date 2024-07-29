import { bingoSupportedChainId, ChainId } from "@ui/src";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

import { defaultChainId } from "@/constants/constants";

export const useChainIdParams = () => {
  const { chainIdParams } = useParams();
  return useMemo(() => {
    return chainIdParams ? chainIdParams : defaultChainId.toString();
  }, [chainIdParams]);
};

export const useChainIdParamsAsChainId = () => {
  const { chainIdParams } = useParams();
  return useMemo(() => {
    const _chainId = Number(chainIdParams) as ChainId;
    if (bingoSupportedChainId.includes(_chainId)) {
      return _chainId;
    }
    return undefined;
  }, [chainIdParams]);
};
