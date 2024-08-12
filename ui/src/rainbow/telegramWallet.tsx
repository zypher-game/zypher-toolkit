import {
  TransactionRequest,
  Provider,
  TransactionResponse,
} from "@ethersproject/abstract-provider";
import { Bytes, Signer, utils } from "ethers";

import { Address } from "wagmi";
import { httpPost } from "../utils/request";
import { IWebAppData } from "../hooks/useTelegramUser";

type Deferrable<T> = utils.Deferrable<T>;
const { resolveProperties } = utils;
export class TelegramWallet extends Signer {
  address: Address;
  provider: Provider;
  api: string;
  WebAppData?: IWebAppData;
  constructor(
    address: Address,
    provider: Provider,
    api: string,
    WebAppData?: IWebAppData
  ) {
    super();
    this.provider = provider;
    this.address = address;
    this.api = api;
    this.WebAppData = WebAppData;
  }
  getAddress(): Promise<string> {
    return Promise.resolve(this.address);
  }
  async signMessage(message: Bytes | string): Promise<string> {
    const res = await httpPost<string>(`${this.api}/wallet/use`, {
      WebAppData: this.WebAppData,
      method: "signMessage",
      params: window.dataToSign,
      isArrayify: window.isArrayify,
    });
    if (res.code) throw new Error(res.msg);
    return Promise.resolve(res.data);
  }
  signTransaction(
    transaction: Deferrable<TransactionRequest>
  ): Promise<string> {
    try {
      return resolveProperties(transaction).then(async (tx) => {
        const res = await httpPost<string>(`${this.api}/wallet/use`, {
          WebAppData: this.WebAppData,
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
    console.log("addd---------1");
    this._checkProvider("sendTransaction");
    console.log("addd---------3", transaction);
    const tx = await this.populateTransaction(transaction);
    console.log("addd--------5");
    const signedTx = await this.signTransaction(tx);
    console.log("addd--------91");
    return this.provider.sendTransaction(signedTx);
  }
}
