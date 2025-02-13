import { Hash } from '@wagmi/core';
import { Address } from 'wagmi';
import { WagmiWalletHandler } from './wagmiWalletHandler';
export interface MulticallMessageItem {
    from: Address;
    to: Address;
    value: bigint;
    data: Hash;
    function_call_tip?: string;
}
export declare const encodeFunctionMulticall: (wallet: WagmiWalletHandler, items: MulticallMessageItem[]) => Promise<string>;
export declare const encodeFunction: (wallet: WagmiWalletHandler, items: MulticallMessageItem) => Promise<string>;
