import {
  TransactionRequest,
  Provider,
  TransactionResponse,
} from "@ethersproject/abstract-provider";
import { Bytes, Signer, utils } from "ethers";

import { Address } from "wagmi";
import { httpPost } from "../utils/request";
import { WebAppData } from "./Ton";

type Deferrable<T> = utils.Deferrable<T>;
const { resolveProperties } = utils;
export class TelegramWallet extends Signer {
  address: Address;
  provider: Provider;
  api: string;
  constructor(address: Address, provider: Provider, api: string) {
    super();
    this.provider = provider;
    this.address = address;
    this.api = api;
  }
  getAddress(): Promise<string> {
    return Promise.resolve(this.address);
  }
  async signMessage(message: Bytes | string): Promise<string> {
    const res = await httpPost<string>(`${this.api}/wallet/use`, {
      WebAppData,
      method: "signMessage",
      params: message,
    });
    if (res.code) throw new Error(res.msg);
    return Promise.resolve(res.data);
  }
  signTransaction(
    transaction: Deferrable<TransactionRequest>
  ): Promise<string> {
    try {
      console.log("signTransaction", `${this.api}/wallet/use`);
      return resolveProperties(transaction).then(async (tx) => {
        const res = await httpPost<string>(`${this.api}/wallet/use`, {
          WebAppData,
          method: "signTransaction",
          params: tx,
        });
        if (res.code) throw new Error(res.msg);
        return Promise.resolve(res.data);
      });
    } catch (err) {
      console.log("signTransaction", err);
      throw err;
    }
  }
  connect(provider: Provider): Signer {
    this.provider = provider;
    return this;
  }

  setAddress(address: Address) {
    this.address = address;
  }
  async sendTransaction(
    transaction: Deferrable<TransactionRequest>
  ): Promise<TransactionResponse> {
    try {
      console.log(1);
      this._checkProvider("sendTransaction");
      console.log(2);
      const tx = await this.populateTransaction(transaction);
      console.log(3);
      const signedTx = await this.signTransaction(tx);
      console.log(4);
      return this.provider.sendTransaction(signedTx);
    } catch (e) {
      console.log(e);
    }
  }
}
