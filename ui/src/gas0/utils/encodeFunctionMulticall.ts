import { Hash } from "@wagmi/core";
import { Address } from "wagmi";
import { WagmiWalletHandler } from "./wagmiWalletHandler";
import { ZytronMulticallTypedData } from "../constants/typedData";
import { hexToSignature, getContract } from "viem";
import { httpPost } from "../../utils/request";
import { WalletAbi } from "../abis/Wallet";
export interface MulticallMessageItem {
  from: Address;
  to: Address;
  value: bigint;
  data: Hash;
}

export const encodeFunctionMulticall = async (
  wallet: WagmiWalletHandler,
  items: MulticallMessageItem[]
) => {
  if (!wallet.aa) throw new Error("aa empty!");
  const nonce = await wallet.aaNonce();
  const calls = await wallet.walletClient.signTypedData({
    ...ZytronMulticallTypedData(wallet.chainId),
    message: {
      tip: wallet.aa.config.function_multicall_tip,
      items,
      nonce,
    },
  });
  const { v, r, s } = hexToSignature(calls);
  if (wallet.aa.isFree) {
    const res = await httpPost(`${wallet.aa.config.api}/functionmulticall`, {
      list: items.map((v) => ({
        wallet: v.from,
        to: v.to,
        data: v.data,
        value: String(v.value),
      })),
      v: Number(v),
      r,
      s,
      owner: wallet.walletClient.account.address,
    });
    // list wallet not same
    if (res.code !== 0) throw new Error(`functionmulticall err: ${res.msg}`);
    const data = res.data.data ? res.data.data : res.data;
    console.log("res", res);
    return data.tx_hash;
  }
  return wallet.aa.contract.write.functionMulticall([items, Number(v), r, s]);
};
