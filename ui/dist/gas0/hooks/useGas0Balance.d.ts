import { IGas0Config } from "../constants/Gas0Constant";
import { Address } from "wagmi";
import { Hash } from "@wagmi/core";
export interface IGas0ApiConfig extends IGas0Config {
    deployer_address: Address;
    function_call_tip: string;
    function_multicall_tip: string;
    wallet_bytecode: Hash;
    token_proxy: Address;
}
export declare const useGas0Balance: () => {
    balance: string;
    config: IGas0ApiConfig;
    loading: boolean;
};
