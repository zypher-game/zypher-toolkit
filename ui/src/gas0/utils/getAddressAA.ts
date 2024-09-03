import { Address } from "wagmi";
import {
  Hash,
  hexToBytes,
  bytesToHex,
  encodeDeployData,
  getCreate2Address,
} from "viem";
import { WalletAbi } from "../abis/Wallet";

const address2salt = (addr: Address) => {
  const arr = hexToBytes(addr);
  const bytes = new Uint8Array(32);
  const len = arr.length;
  arr.forEach((v, i) => {
    bytes[32 - len + i] = v;
  });
  return bytesToHex(bytes);
};
export const getAddressAA = (
  owner: Address,
  walletBytecode: Hash,
  deployer: Address
) => {
  console.log({ owner, walletBytecode, deployer });
  const salt = address2salt(owner);
  const bytecode = encodeDeployData({
    abi: WalletAbi,
    args: [owner],
    bytecode: walletBytecode,
  });
  return getCreate2Address({ bytecode, from: deployer, salt });
};
