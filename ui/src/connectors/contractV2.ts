import { AddressZero } from "@ethersproject/constants";
import {
  JsonRpcProvider,
  JsonRpcSigner,
  Web3Provider,
} from "@ethersproject/providers";
import { ethers, providers, utils } from "ethers";
// import { Contract } from 'ethers/lib/ethers'
// import { getAddress } from 'ethers/lib/utils'
import {
  Abi,
  getContract as viemGetContract,
  PublicClient,
  WalletClient,
} from "viem";
import { Address } from "wagmi";

import { ChainId } from "../constant/constant";

import { getViemClients } from "../rainbow/rainbow";
const Contract = ethers.Contract;
const getAddress = utils.getAddress;
export const getContract = <
  TAbi extends Abi | unknown[],
  TWalletClient extends WalletClient
>({
  abi,
  address,
  chainId,
  publicClient,
  signer,
  env,
}: {
  abi: TAbi;
  address: Address;
  chainId: ChainId;
  signer?: TWalletClient;
  publicClient?: PublicClient;
  env: string;
}): any => {
  const c = viemGetContract({
    abi,
    address,
    publicClient: publicClient ?? getViemClients({ env, chainId: chainId }),
    walletClient: signer,
  });
  return {
    ...c,
    account: signer?.account,
    chain: signer?.chain,
  };
};
function isAddress(value: any): string | false {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}
export function getSigner(
  library: JsonRpcProvider,
  account: string
): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked();
}
export function getProviderOrSigner(
  library: JsonRpcProvider,
  account?: string | null | undefined
): Web3Provider | JsonRpcSigner | JsonRpcProvider {
  return account ? getSigner(library, account) : library;
}
export const getContractFromRpc = async ({
  address,
  abi,
  library,
  account,
}: {
  address: Address;
  abi: any;
  library: JsonRpcProvider;
  account?: string | null | undefined;
}): Promise<ethers.Contract> => {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(
    address,
    abi,
    getProviderOrSigner(library, account) as any
  );
};
let globalProvider: providers.JsonRpcProvider;

const setProvider = async (): Promise<void | providers.JsonRpcProvider> => {
  if (window.ethereum) {
    // await connect()
    return new providers.Web3Provider(window.ethereum);
  } else if (window.web3) {
    return new providers.Web3Provider(window.web3.currentProvider);
  } else {
    throw new Error("can't find default provider");
  }
};
export const getProvider = (
  url?: string
): Promise<providers.JsonRpcProvider> => {
  return new Promise(async (resolve, reject) => {
    if (url) {
      resolve(new providers.JsonRpcProvider(url));
    } else if (globalProvider) {
      resolve(globalProvider);
    } else {
      const res = await setProvider();
      if (res) {
        globalProvider = res;
        resolve(res);
      } else {
        reject("can't find default provider");
      }
    }
  });
};
