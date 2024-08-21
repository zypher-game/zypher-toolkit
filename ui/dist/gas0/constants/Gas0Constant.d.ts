import { Address } from "wagmi";
import { Hash } from "viem";
export type IGas0Config = {
    Deployer: Address;
    api: string;
    walletBytecode: Hash;
};
export declare const Gas0Constants: Record<string, IGas0Config>;
