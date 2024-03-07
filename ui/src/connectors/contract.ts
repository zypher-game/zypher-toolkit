/* eslint-disable @typescript-eslint/no-explicit-any */
import { Contract, ContractInterface, providers, Signer } from "ethers";

import { ChainRpcUrls } from "../constant/constant";
import { sample } from "../utils/lodash";

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

export function getSigner(
  provider: providers.JsonRpcProvider,
  account: string
): Signer {
  return provider.getSigner(account).connectUnchecked();
}

window.addEventListener("load", async () => {
  setProvider();
});

export async function jsonRpcContract(
  address: string,
  abi: ContractInterface,
  chainId: number
): Promise<Contract> {
  const provider = await getProvider(sample(ChainRpcUrls[chainId]));
  return new Contract(address, abi, provider);
}

export default async (
  address: string,
  abi: ContractInterface,
  account?: string
): Promise<Contract> => {
  const provider = await getProvider();
  if (account) {
    return new Contract(address, abi, getSigner(provider, account));
  }
  return new Contract(address, abi, provider);
};
