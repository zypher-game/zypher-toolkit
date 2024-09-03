import { useCallback } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { Address } from "viem";

import { httpGet } from "../utils/request";
import { TG_BOT_URL } from "../constant/constant";
import { useAaWallet } from "../gas0/hooks/useWalletHandler";

export const tgNameListState = atom<Record<string, string>>({
  key: "tgNameListState",
  default: {},
});
export const useGetTgName = () => {
  const tgNameList = useRecoilValue(tgNameListState);
  const setTgNameList = useSetRecoilState(tgNameListState);
  const { wallet } = useAaWallet();
  const setTgName = useCallback(
    async (address: string[]) => {
      //  先过滤掉本地已经有的
      const filterList = address.filter((v) => !tgNameList[v]) as Address[];
      if (filterList && filterList.length) {
        const { data } = await httpGet<[string, string][]>(
          TG_BOT_URL + `/user/ger_user_name?list=${JSON.stringify(filterList)}`
        );
        if (
          Array.isArray(data) &&
          data.length &&
          data.every((item) => Array.isArray(item) && item.length === 2)
        ) {
          // 将结果转换为一个对象
          const ltgNameList = Object.fromEntries(data);
          setTgNameList((pre) => ({ ...pre, ...ltgNameList }));
        }
      }
    },
    [wallet, JSON.stringify(tgNameList)]
  );
  return {
    setTgName,
    tgNameList,
  };
};
