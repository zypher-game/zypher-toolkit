import { Address } from "wagmi";
import { ChainId } from "../constant/constant";
import { erc20Abi } from "../contract/erc20";
import MulticallContract from "../contract/multicall";
import BigNumberJs from "./BigNumberJs";
export const fetchErc20 = async ({
  address,
  chainId,
  account,
}: {
  address: Address;
  chainId: ChainId;
  account: Address;
}): Promise<boolean | undefined> => {
  try {
    const staticStr = [
      {
        name: "balance",
        methodName: "balanceOf",
        params: [account],
      },
    ];
    const params = staticStr.map((v) => ({
      reference: v.name,
      contractAddress: address,
      abi: erc20Abi,
      calls: [
        {
          methodName: v?.methodName ?? v.name,
          reference: v.name,
          methodParameters: v.params ?? [],
        },
      ],
    }));
    const multicall = await MulticallContract(chainId);
    if (multicall) {
      const { results } = await multicall.call(params);
      if (results) {
        const item = new BigNumberJs(
          results["balance"]["callsReturnContext"][0]["returnValues"][0].hex
        ).gt(0);
        return item;
      }
    } else {
      throw new Error("No multicall address");
    }
    return undefined;
  } catch (e: any) {
    return undefined;
  }
};
