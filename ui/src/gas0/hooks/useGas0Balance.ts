import { useEffect, useRef, useState } from "react";
import { useActiveWeb3React } from "../../hooks/useActiveWeb3React";
import { Gas0Constants, IGas0Config } from "../constants/Gas0Constant";
import { httpGetOnce } from "../../utils/request";
import BigNumberJs from "../../utils/BigNumberJs";
import { Address } from "wagmi";
import { Hash } from "@wagmi/core";
import { zeroAddress } from "viem";
export interface IGas0ApiConfig extends IGas0Config {
  deployer_address: Address;
  function_call_tip: string;
  function_multicall_tip: string;
  wallet_bytecode: Hash;
  token_proxy: Address;
}
export const useGas0Balance = () => {
  const [loading, setLoading] = useState(false);
  const { account, chainId } = useActiveWeb3React();
  const [balance, _balance] = useState("0");
  const [config, _config] = useState<IGas0ApiConfig>({
    api: "",
    deployer_address: zeroAddress,
    function_call_tip: "",
    function_multicall_tip: "",
    wallet_bytecode: "0x",
    token_proxy: zeroAddress,
  });
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
    setLoading(true);
    httpGetOnce(`${chainConf.api}/balanceof/${account}`).then(
      ({ data: res }) => {
        console.log({ res });
        // console.log(`${chainConf.Gas0.api}/balanceof/${acc.address}`, res);
        if (res.code !== 0) {
          _balance("0");
          key.current = "";
          return;
        }
        console.log({ res });
        const gas0Balance = res.data.amount;
        console.log({ gas0Balance });
        if (new BigNumberJs(gas0Balance).gt(0)) {
          httpGetOnce(`${chainConf.api}/config`).then(({ data: configRes }) => {
            console.log({ configRes });
            setLoading(false);
            if (configRes.code !== 0) {
              _balance("0");
              key.current = "";
              return;
            }
            _balance(gas0Balance);
            console.log({ configRes });
            _config({
              ...Gas0Constants[chainId],
              deployer_address: configRes.data.deployer_address,
              function_call_tip: configRes.data.function_call_tip,
              function_multicall_tip: configRes.data.function_multicall_tip,
              token_proxy: configRes.data.token_proxy,
              wallet_bytecode: configRes.data.wallet_bytecode,
            });
          });
        } else {
          setLoading(false);
        }
      }
    );
  }, [account, chainId]);
  return { balance, config, loading };
};
