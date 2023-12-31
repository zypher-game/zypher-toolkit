import { getProvider } from "../connectors/contract";
import { ChainId } from "../constant/constant";

export const getChainId = async (): Promise<number> => {
  const provider = await getProvider();
  const network = await provider.getNetwork();
  const isError = !Object.values(ChainId).includes(network.chainId);
  if (isError) {
    throw new Error("Network not supported");
  }
  return network.chainId;
};
