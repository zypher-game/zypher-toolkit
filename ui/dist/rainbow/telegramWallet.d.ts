import { TransactionRequest, Provider, TransactionResponse } from "@ethersproject/abstract-provider";
import { Bytes, Signer, utils } from "ethers";
import { Address } from "wagmi";
import { IWebAppData } from "../hooks/useTelegramUser";
type Deferrable<T> = utils.Deferrable<T>;
export declare class TelegramWallet extends Signer {
    address: Address;
    provider: Provider;
    api: string;
    WebAppData?: IWebAppData;
    constructor(address: Address, provider: Provider, api: string, WebAppData?: IWebAppData);
    getAddress(): Promise<string>;
    signMessage(message: Bytes | string): Promise<string>;
    signTransaction(transaction: Deferrable<TransactionRequest>): Promise<string>;
    connect(provider: Provider): Signer;
    setAddress(address: Address): void;
    sendTransaction(transaction: Deferrable<TransactionRequest>): Promise<TransactionResponse>;
}
export {};
