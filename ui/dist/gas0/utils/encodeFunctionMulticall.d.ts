import { Hash } from "@wagmi/core";
import { Address } from "wagmi";
import { WagmiWalletHandler } from "./wagmiWalletHandler";
export interface MulticallMessageItem {
    from: Address;
    to: Address;
    value: bigint;
    data: Hash;
}
export declare const encodeFunctionMulticall: (wallet: WagmiWalletHandler, items: MulticallMessageItem[]) => Promise<any>;
