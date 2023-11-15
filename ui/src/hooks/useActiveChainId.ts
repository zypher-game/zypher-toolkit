import { useNetwork } from "wagmi";

import { supportedChainIds } from "../constant/constant";

export const useActiveChainId = (env: string) => {
  const { chain } = useNetwork();
  const chainId = chain?.id ?? undefined;

  const isError = !Object.values(supportedChainIds(env)).includes(
    Number(chainId)
  );

  return {
    chainId,
    isWrongNetwork: isError,
  };
};
