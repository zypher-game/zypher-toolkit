import { Address } from "wagmi";
import { Hash } from "@wagmi/core";
export type IGas0ApiConfig = {
    deployer_address: Address;
    function_call_tip: string;
    function_multicall_tip: string;
    wallet_bytecode: Hash;
};
export declare const useGas0Balance: () => {
    balance: string;
    config: IGas0ApiConfig;
    loading: boolean;
};
