import { TransactionRequest, Provider, TransactionResponse } from "@ethersproject/abstract-provider";
import { Bytes, Signer } from "ethers";
import { Deferrable } from "ethers/lib/utils";
import { Address } from "wagmi";
export declare class TelegramWallet extends Signer {
    address: Address;
    provider: Provider;
    api: string;
    constructor(address: Address, provider: Provider, api: string);
    getAddress(): Promise<string>;
    signMessage(message: Bytes | string): Promise<string>;
    signTransaction(transaction: Deferrable<TransactionRequest>): Promise<string>;
    connect(provider: Provider): Signer;
    setAddress(address: Address): void;
    sendTransaction(transaction: Deferrable<TransactionRequest>): Promise<TransactionResponse>;
}
