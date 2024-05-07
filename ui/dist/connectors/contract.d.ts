import { Contract, ContractInterface, providers, Signer } from "ethers";
export declare const getProvider: (url?: string) => Promise<providers.JsonRpcProvider>;
export declare function getSigner(provider: providers.JsonRpcProvider, account: string): Signer;
export declare function jsonRpcContract(address: string, abi: ContractInterface, chainId: number): Promise<Contract>;
declare const _default: (address: string, abi: ContractInterface, account?: string) => Promise<Contract>;
export default _default;
