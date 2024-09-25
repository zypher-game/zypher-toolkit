import {
  GetContractResult,
  GetPublicClientResult,
  GetWalletClientResult,
  getContract,
  getPublicClient,
} from "wagmi/actions";
import {
  Address,
  Chain,
  createWalletClient,
  custom,
  hexToSignature,
  publicActions,
  Transport,
  toHex,
  Account,
  hexToBytes,
  bytesToHex,
} from "viem";

import { PublicClient } from "wagmi";
import { WalletAbi } from "../abis/Wallet";
import { Gas0Constants, IGas0Config } from "../constants/Gas0Constant";
import BigNumberJs from "../../utils/BigNumberJs";
import { getAddressAA } from "./getAddressAA";
import { ZytronSignTypedData } from "../constants/typedData";
import { httpPost } from "../../utils/request";
import { IContractName, zkBingo } from "../../constant/constant";
import { IGas0ApiConfig } from "../hooks/useGas0Balance";
import { Hash } from "@wagmi/core";
import { getIsCode } from "./getIsCode";
export type Iaa = {
  isFree: boolean;
  address: Address;
  contract: GetContractResult<
    typeof WalletAbi,
    NonNullable<GetWalletClientResult>
  >;
  config: IGas0Config;
  configFromApi: IGas0ApiConfig;
};
export class WagmiWalletHandler {
  chain: Chain;
  account: Account; // owner
  walletClient: NonNullable<GetWalletClientResult>;
  aaWalletClient?: NonNullable<GetWalletClientResult>;
  publicClient: GetPublicClientResult<PublicClient>;
  chainId: number;
  address: {
    GP: Address;
  };
  aa?: Iaa;
  constructor(
    walletClient: NonNullable<GetWalletClientResult>,
    gas0Balance: string,
    configApi: IGas0ApiConfig
  ) {
    this.chainId = walletClient.chain.id;
    this.chain = walletClient.chain;
    this.walletClient = walletClient;
    this.publicClient = getPublicClient({ chainId: this.chainId });
    this.account = this.walletClient.account;
    this.address = {
      GP: zkBingo(this.chainId, IContractName.ZypherGameToken),
    };
    const conf = Gas0Constants[this.chainId];
    if (conf) {
      const deployer = configApi.deployer_address;

      const aaWallet = getAddressAA(
        this.account.address,
        configApi.wallet_bytecode as Hash,
        deployer as Address
      );
      console.log({
        address: this.account.address,
        wallet_bytecode: configApi.wallet_bytecode as Hash,
        deployer: deployer as Address,
        aaWallet,
      });
      this.aa = {
        isFree: new BigNumberJs(gas0Balance).gt(0),
        address: aaWallet,
        contract: getContract({
          abi: WalletAbi,
          address: aaWallet,
          walletClient,
        }),
        config: conf,
        configFromApi: configApi,
      };
      const aa = this.aa;
      const transport: Transport = custom({
        request: async ({ method, params }) => {
          if (method !== "eth_sendTransaction") {
            const res = await this.publicClient.request({ method, params });
            return res;
          }
          const owner = this.walletClient.account.address;
          const isCreate = await getIsCode(this.publicClient, aaWallet); // eoa =>
          if (!isCreate) {
            const hash = await gas0WalletCreateAndApprove(
              owner,
              aa.config.api,
              aa.isFree
            );
            if (!hash) return;
            await this.publicClient.waitForTransactionReceipt({
              hash,
              confirmations: 1,
            });
          }

          const nonce = await this.aaNonce();
          const arg = params[0];
          // as {
          // data: `0x${string}`;
          // from: `0x${string}`;
          // to: `0x${string}`;
          // value: bigint;
          // };
          const value = arg.value || 0;
          console.log({ value });
          const sign = await this.walletClient.signTypedData({
            ...ZytronSignTypedData(this.chainId),
            message: {
              from: aa.address,
              to: arg.to,
              value: value,
              data: arg.data,
              nonce,
              tip: aa.configFromApi.function_call_tip,
            },
          });
          if (typeof sign === "string") {
            const { v, r, s } = hexToSignature(sign as `0x${string}`);
            if (aa.isFree) {
              const { data: res } = await httpPost(
                `${aa.config.api}/functioncall`,
                {
                  wallet: aa.address,
                  to: arg.to,
                  data: arg.data,
                  value: toHex(BigInt(value)),
                  v: Number(v),
                  r,
                  s,
                  owner,
                }
              );
              if (res.code !== 0) {
                throw new Error(`functioncall error: ${res.msg}`);
              }
              return res.data.tx_hash;
            } else {
              const aaContract = getContract({
                abi: WalletAbi,
                address: aa.address,
                walletClient,
              });
              return aaContract.write.functionCall([
                aa.address,
                arg.to,
                BigInt(value),
                arg.data,
                Number(v),
                r,
                s,
              ]);
            }
          }
        },
      });
      this.aaWalletClient = createWalletClient({
        account: this.account,
        chain: this.chain,
        transport,
      }).extend(publicActions);
    }
  }
  async aaNonce() {
    try {
      const nonce = await this.aa?.contract.read.nonce();
      return nonce || BigInt(0);
    } catch (err: any) {
      if (
        err &&
        err.message &&
        err.message.match(
          /^The contract function "nonce" returned no data \("0x"\)/
        )
      )
        return BigInt(0);
      throw err;
    }
  }
  getAAWalletClient() {
    return this.aaWalletClient ?? this.walletClient;
  }
  getWalletClient() {
    return this.walletClient;
  }
}

export const gas0WalletCreateAndApprove = async (
  owner: Address,
  api: string,
  isFree: boolean
) => {
  if (!isFree) {
    return;
  }
  const { data } = await httpPost(`${api}/create`, {
    owner,
  });
  if (data.code !== 0) throw new Error(`setController error: ${data.msg}`);
  return data.data.tx_hash;
};

export const address2salt = (addr: Address) => {
  const arr = hexToBytes(addr);
  const bytes = new Uint8Array(32);
  const len = arr.length;
  arr.forEach((v, i) => {
    bytes[32 - len + i] = v;
  });
  return bytesToHex(bytes);
};
