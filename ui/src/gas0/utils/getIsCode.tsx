import { Address, PublicClient } from "viem";

export const getIsCode = async (
  publicClient: PublicClient,
  address: Address
): Promise<boolean> => {
  if (address) {
    const code = await publicClient.getBytecode({
      address: address,
    });
    if (code) {
      return true;
    }
  }
  return false;
};
