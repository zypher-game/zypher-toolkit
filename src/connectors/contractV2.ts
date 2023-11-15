import { AddressZero } from "@ethersproject/constants";
import {
  JsonRpcProvider,
  JsonRpcSigner,
  Web3Provider,
} from "@ethersproject/providers";
import { ethers, utils } from "ethers";
// import { Contract } from 'ethers/lib/ethers'
// import { getAddress } from 'ethers/lib/utils'
import {
  Abi,
  getContract as viemGetContract,
  PublicClient,
  WalletClient,
} from "viem";
import { Address } from "wagmi";

import { ChainId, defaultChainId } from "../constant/constant";

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
  chainId?: ChainId;
  signer?: TWalletClient;
  publicClient?: PublicClient;
  env: string;
}): any => {
  const c = viemGetContract({
    abi,
    address,
    publicClient:
      publicClient ??
      getViemClients({ env, chainId: chainId ?? defaultChainId }),
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
