import { Multicall } from "ethereum-multicall";

import { ChainId, ChainRpcUrls, CurrencyContract } from "../constant/constant";
import { getProvider } from "../connectors/contract";
import { getChainId } from "../utils/getChainId";
import { sample } from "../utils/lodash";

const MulticallContract = async (chainIdParams?: ChainId): Promise<any> => {
  try {
    const chainId = chainIdParams ?? (await getChainId());
    const provider = await getProvider(sample(ChainRpcUrls[chainId]));
    return new Multicall({
      ethersProvider: provider,
      tryAggregate: false,
      multicallCustomContractAddress: sample(
        CurrencyContract[chainId].multicall
      ),
    });
  } catch (error) {
    console.error("Getting multicall failure:", error);
    return undefined;
  }
};
export default MulticallContract;
