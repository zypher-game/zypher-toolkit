import { ChainId } from "@ui/src";
import { getProvider } from "@ui/src";

export default async (): Promise<number> => {
  const provider = await getProvider();
  const network = await provider.getNetwork();
  const isError = !Object.values(ChainId).includes(network.chainId);
  if (isError) {
    throw new Error("Network not supported");
  }
  return network.chainId;
};
