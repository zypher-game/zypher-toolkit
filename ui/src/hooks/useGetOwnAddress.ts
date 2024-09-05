import { useCallback } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { Address, createPublicClient, http } from "viem";
import { useActiveWeb3React } from "./useActiveWeb3React";
import { getIsCode } from "../gas0/utils/getIsCode";
import MulticallContract from "../contract/multicall";
import { WalletAbi } from "../gas0/abis/Wallet";
import { getPublicClient } from "@wagmi/core";
import { AllChainInfo } from "../constant/chains";
import { sample } from "../utils/lodash";
import { ChainRpcUrls } from "../constant/constant";

export const ownerListState = atom<Record<string, string>>({
  key: "ownerListState",
  default: {},
});
export const useGetOwnAddress = () => {
  const { chainId } = useActiveWeb3React();
  const ownerList = useRecoilValue(ownerListState);
  const setAddressOwnerList = useSetRecoilState(ownerListState);

  const setOwnerAddress = useCallback(
    async (address: string[]) => {
      try {
        const publicClient = createPublicClient({
          chain: AllChainInfo[chainId],
          transport: http(sample(ChainRpcUrls[chainId]), { timeout: 4000 }),
        });
        if (publicClient) {
          //  先过滤掉本地已经有的
          const filterList = address.filter((v) => !ownerList[v]) as Address[];
          if (filterList && filterList.length) {
            // 获取是否是owner
            const isCodeList = [];
            for (const _address of filterList) {
              try {
                const isCode = await getIsCode(publicClient, _address);
                isCodeList.push([_address, isCode]);
              } catch (error) {}
            }
            const hasCode = isCodeList.filter((v) => v[1]);
            if (hasCode && hasCode.length) {
              const hasCodeAddress = hasCode.map((v) => v[0]) as Address[];
              // multicall owner
              const multicall = await MulticallContract(chainId);
              console.log({ multicall });
              if (multicall) {
                const params = hasCodeAddress.map((__address, index) => ({
                  reference: "owner" + __address.toLowerCase() + chainId,
                  contractAddress: __address,
                  abi: WalletAbi,
                  calls: [
                    {
                      methodName: "owner",
                      reference: "owner",
                    },
                  ],
                }));
                console.log({ params });
                const { results } = await multicall.call(params);
                console.log({ results });
                if (results) {
                  const map: Record<string, string> = Object.fromEntries(
                    Object.values(results).map((v: any) => [
                      v[
                        "originalContractCallContext"
                      ].contractAddress.toLowerCase(), // contract
                      v["callsReturnContext"][0]["returnValues"][0], // owner
                    ])
                  );
                  console.log({ results, map });
                  setAddressOwnerList((pre) => ({
                    ...pre,
                    ...map,
                  }));
                }
              }
            }
          }
        }
      } catch (error) {
        console.log("setOwnerAddress: ", { error });
      }
    },
    [JSON.stringify(ownerList), chainId]
  );
  console.log({ ownerList });
  return {
    setOwnerAddress,
    ownerList,
  };
};
