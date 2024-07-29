import { getProvider } from "../connectors/contractV2";
import { ChainId } from "../constant/constant";

export const getChainId = async (): Promise<number> => {
  const provider = await getProvider();
  const network = await provider.getNetwork();
  const isError = !Object.values(ChainId).includes(
    `${network.chainId}` as ChainId
  );
  if (isError) {
    throw new Error("Network not supported");
  }
  return network.chainId;
};
