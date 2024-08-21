import { useEffect, useRef, useState } from "react";
import { useActiveWeb3React } from "../../hooks/useActiveWeb3React";
import { Gas0Constants } from "../constants/Gas0Constant";
import { httpGetOnce } from "../../utils/request";

export const useGas0Balance = () => {
  const { account, chainId } = useActiveWeb3React();
  const [balance, _balance] = useState("0");
  const key = useRef("");
  useEffect(() => {
    if (!account) {
      key.current = "";
      _balance("0");
      return;
    }
    const chainConf = Gas0Constants[chainId];
    if (!chainConf) {
      key.current = "";
      _balance("0");
      return;
    }
    const keyString = [account, chainId].join("-");
    if (key.current === keyString) return;
    key.current = keyString;
    httpGetOnce(`${chainConf.api}/balanceof/${account}`).then(
      ({ data: res }) => {
        // console.log(`${chainConf.Gas0.api}/balanceof/${acc.address}`, res);
        if (res.code !== 0) {
          _balance("0");
          key.current = "";
          return;
        }
        console.log({ res });
        _balance(`${res.data.amount}`);
      }
    );
  }, [account, chainId]);
  return balance;
};
