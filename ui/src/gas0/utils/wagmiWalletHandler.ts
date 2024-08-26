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
  hashTypedData,
  encodeDeployData,
  hexToBytes,
  bytesToHex,
} from "viem";

import { PublicClient } from "wagmi";
import { WalletAbi } from "../abis/Wallet";
import { Gas0Constants, IGas0Config } from "../constants/Gas0Constant";
import BigNumberJs from "../../utils/BigNumberJs";
import { getAddressAA } from "./getAddressAA";
import {
  ZytronSetAdminTypedData,
  ZytronSignTypedData,
} from "../constants/typedData";
import { httpPost } from "../../utils/request";
import { getEIP712Sign } from "../../utils/getSign";
import { DeployerAbi } from "../abis/Deployer";
import { IContractName, zkBingo } from "ui/src/constant/constant";

export class WagmiWalletHandler {
  chain: Chain;
  account: Account; // owner
  walletClient: NonNullable<GetWalletClientResult>;
  publicClient: GetPublicClientResult<PublicClient>;
  chainId: number;
  address: {
    GP: Address;
  };
  aa?: {
    isFree: boolean;
    address: Address;
    contract: GetContractResult<
      typeof WalletAbi,
      NonNullable<GetWalletClientResult>
    >;
    config: IGas0Config;
  };
  constructor(
    walletClient: NonNullable<GetWalletClientResult>,
    gas0Balance: string
  ) {
    console.log({ gas0Balance });
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
      const deployer = conf.Deployer;
      const wallet = getAddressAA(
        this.account.address,
        conf.walletBytecode,
        deployer
      );
      console.log({ gas0Balance, s: new BigNumberJs(gas0Balance).gt(0) });
      this.aa = {
        isFree: new BigNumberJs(gas0Balance).gt(0),
        address: wallet,
        contract: getContract({
          abi: WalletAbi,
          address: wallet,
          walletClient,
        }),
        config: conf,
      };
      const aa = this.aa;
      console.log({ aa });
      const transport: Transport = custom({
        request: async ({ method, params }) => {
          console.log("custom request", method, params);
          if (method !== "eth_sendTransaction") {
            const res = await this.publicClient.request({ method, params });
            console.log("res", res);
            return res;
          }
          console.log(1);
          const owner = this.walletClient.account.address;
          console.log(1);
          const isCreate = await getIsCreate(this.publicClient, wallet);
          console.log(1);
          if (!isCreate) {
            const hash = await gas0WalletCreateAndApprove(
              this,
              owner,
              true,
              aa.isFree
            );
            console.log(1);
            if (!hash) return;
            console.log(1);
            await this.publicClient.waitForTransactionReceipt({
              hash,
              confirmations: 1,
            });
          }
          console.log(1);
          const isController = await this.aa?.contract.read.controllers([
            owner,
          ]);
          console.log(1);
          if (!isController) {
            console.log(1);
            const hash = await gas0WalletSetController(
              this,
              owner,
              true,
              aa.isFree
            );
            console.log(1);
            await this.publicClient.waitForTransactionReceipt({
              hash,
              confirmations: 1,
            });
          }
          console.log(1);
          const nonce = await this.aaNonce();
          console.log(1);
          const arg = params[0] as {
            data: `0x${string}`;
            from: `0x${string}`;
            to: `0x${string}`;
            value: bigint;
          };
          console.log(1);
          console.log({ arg });
          console.log(1);
          const value = arg.value || BigInt(0);
          const { domain, types } = ZytronSignTypedData(this.chainId);
          console.log(1);
          const data = {
            from: aa.address,
            to: arg.to,
            value,
            data: arg.data,
            nonce,
          };
          console.log(1);
          const sign = await getEIP712Sign({
            domain,
            types,
            data,
            account: owner,
          });
          console.log(1);
          if (typeof sign === "string") {
            const { v, r, s } = hexToSignature(sign as `0x${string}`);
            console.log({ v, r, s, aa: aa.isFree });
            if (aa.isFree) {
              console.log(1);
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
                console.log("res", res);
                throw new Error(`functioncall error: ${res.msg}`);
              }
              console.log(1);
              return res.data.tx_hash;
            } else {
              console.log(1);
              const aaContract = getContract({
                abi: WalletAbi,
                address: aa.address,
                walletClient,
              });
              console.log(1);
              return aaContract.write.functionCall([
                aa.address,
                arg.to,
                value,
                arg.data,
                Number(v),
                r,
                s,
              ]);
            }
          }
        },
      });

      this.walletClient = createWalletClient({
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
      console.log(String(err));
      throw err;
    }
  }
  getWalletClient() {
    return this.walletClient;
  }
}

const getIsCreate = async (publicClient: PublicClient, address: Address) => {
  if (address) {
    const code = await publicClient.getBytecode({
      address: address,
    });
    if (code) {
      return true;
    } else {
      return false;
    }
  }
};

export const gas0WalletCreateAndApprove = async (
  wallet: WagmiWalletHandler,
  controller: Address,
  isAllow: boolean,
  isFree: boolean
) => {
  if (!wallet.aa) {
    return;
  }
  const nonce = await wallet.aaNonce();
  const typeData = {
    ...ZytronSetAdminTypedData(wallet.chainId),
    message: { controller, isAllow, nonce },
  } as const;
  const sign = await wallet.walletClient.signTypedData(typeData);
  console.log("typeData", typeData, hashTypedData(typeData));

  const owner = wallet.walletClient.account.address;
  const { v, r, s } = hexToSignature(sign);
  if (isFree) {
    const res = await httpPost(`${wallet.aa.config.api}/create`, {
      controller,
      owner,
      v: Number(v),
      r,
      s,
    });
    if (res.code !== 0) throw new Error(`setController error: ${res.msg}`);
    return res.data.tx_hash;
  }
  const Deployer = getContract({
    abi: DeployerAbi,
    address: wallet.aa.config.Deployer,
    walletClient: wallet.walletClient,
  });
  const bytecode = encodeDeployData({
    abi: WalletAbi,
    args: [wallet.walletClient.account.address],
    bytecode: wallet.aa.config.walletBytecode,
  });
  const salt = address2salt(owner);
  return Deployer.write.deployContract([
    salt,
    bytecode,
    controller,
    Number(v),
    r,
    s,
  ]);
};

export const gas0WalletSetController = async (
  wallet: WagmiWalletHandler,
  controller: Address,
  isAllow: boolean,
  isFree: boolean
) => {
  if (!wallet.aa) return;
  const nonce = await wallet.aaNonce();
  const sign = await wallet.walletClient.signTypedData({
    ...ZytronSetAdminTypedData(wallet.chainId),
    message: { controller, isAllow, nonce },
  });
  const owner = wallet.walletClient.account.address;
  const { v, r, s } = hexToSignature(sign);
  if (isFree) {
    const res = await httpPost(`${wallet.aa.config.api}/set_controller`, {
      wallet: wallet.aa.address,
      controller,
      owner,
      is_allow: isAllow,
      v: Number(v),
      r,
      s,
    });
    if (res.code !== 0) throw new Error(`setController error: ${res.msg}`);
    return res.data.tx_hash;
  }
  return wallet.aa.contract.write.setController([
    controller,
    isAllow,
    Number(v),
    r,
    s,
  ]);
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
