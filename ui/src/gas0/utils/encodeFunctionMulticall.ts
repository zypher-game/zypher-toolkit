import { Hash } from '@wagmi/core';
import { Address } from 'wagmi';
import { WagmiWalletHandler } from './wagmiWalletHandler';
import { ZytronMulticallTypedData } from '../constants/typedData';
import { hexToSignature, getContract, toHex } from 'viem';
import { httpPost } from '../../utils/request';
import { WalletAbi } from '../abis/Wallet';
import {
  ZytronPermitTypedData,
  ZytronSignTypedData,
} from '../constants/typedData';
export interface MulticallMessageItem {
  from: Address;
  to: Address;
  value: bigint;
  data: Hash;
  function_call_tip?: string;
}

export const encodeFunctionMulticall = async (
  wallet: WagmiWalletHandler,
  items: MulticallMessageItem[],
) => {
  if (!wallet.aa) throw new Error('aa empty!');
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
        value: `0x${parseInt(String(v.value), 10).toString(16)}`,
      })),
      v: Number(v),
      r,
      s,
      owner: wallet.walletClient.account.address,
    });
    // list wallet not same
    if (res.code !== 0) throw new Error(`functionmulticall err: ${res.msg}`);
    const data = res.data.data ? res.data.data : res.data;
    return `${data.tx_hash}`.replaceAll('"', '').replace(/\\/g, '');
  }
  return wallet.aa.contract.write.functionMulticall([items, Number(v), r, s]);
};

export const encodeFunction = async (
  wallet: WagmiWalletHandler,
  items: MulticallMessageItem,
) => {
  if (!wallet.aa) throw new Error('aa empty!');
  const nonce = await wallet.aaNonce();
  const calls = await wallet.walletClient.signTypedData({
    ...ZytronSignTypedData(wallet.chainId),
    message: {
      from: items.from,
      to: items.to,
      value: items.value,
      data: items.data,
      nonce,
      tip: items?.function_call_tip ?? '',
    },
  });
  const { v, r, s } = hexToSignature(calls);
  const res = await httpPost(`${wallet.aa.config.api}/functioncall`, {
    wallet: items.from,
    to: items.to,
    data: items.data,
    value: toHex(BigInt(0)),
    v: Number(v),
    r,
    s,
    owner: wallet.walletClient.account.address,
  });
  // list wallet not same
  if (res.code !== 0) throw new Error(`functionmulticall err: ${res.msg}`);
  const data = res.data.data ? res.data.data : res.data;
  return `${data.tx_hash}`.replaceAll('"', '').replace(/\\/g, '');
};
