import { Address } from "wagmi";
import { WagmiWalletHandler } from "./wagmiWalletHandler";
import { hexToSignature, encodeFunctionData, getContract } from "viem";
import { ZytronPermitTypedData } from "../constants/typedData";
import { PermitProxyAbi } from "../abis/PermitProxy";
import { ERC20PermitAbi } from "../abis/ERC20Permit";
import {
  encodeFunctionMulticall,
  MulticallMessageItem,
} from "./encodeFunctionMulticall";
export const aaApproveAndFcErc20 = async ({
  erc20Address,
  wallet,
  tokenAmount,
  permitForAddress,
  otherFc,
}: {
  erc20Address: Address;
  wallet: WagmiWalletHandler;
  permitForAddress: Address;
  tokenAmount: string;
  otherFc: MulticallMessageItem[];
}) => {
  const owner = wallet.account.address;
  const chainId = wallet.chainId;
  const walletClient = wallet.getWalletClient();
  const aa = wallet.aa;
  if (!aa) {
    throw Error(`${owner} has no aa wallet`);
  }
  const GP = getContract({
    abi: ERC20PermitAbi,
    address: wallet.address.GP,
    publicClient: wallet.publicClient,
  });
  const nonce = await GP.read.nonces([owner]);
  const deadline = BigInt(Math.floor(Date.now() / 1000) + 10 * 60);
  const gpName = await GP.read.name();
  const from = aa.address;

  // 1. owner Permit GP to PermitProxy
  const Permit = await walletClient.signTypedData({
    ...ZytronPermitTypedData(gpName, chainId, erc20Address),
    message: {
      owner,
      spender: aa.config.PermitProxy,
      value: BigInt(tokenAmount),
      nonce,
      deadline,
    },
  });
  const { v, r, s } = hexToSignature(Permit);
  // 2. transfer GP => PermitProxy => aa
  const functionName = "transferTokenToProxyContract" as const;
  const Transfer2aa = encodeFunctionData({
    abi: PermitProxyAbi,
    args: [
      erc20Address,
      owner,
      aa.address,
      BigInt(tokenAmount),
      deadline,
      Number(v),
      r,
      s,
    ],
    functionName,
  });
  // 3. aa approve GP => zAce
  const Approve2game = encodeFunctionData({
    abi: ERC20PermitAbi,
    args: [permitForAddress, BigInt(tokenAmount)],
    functionName: "approve",
  });
  const tx = await encodeFunctionMulticall(wallet, [
    // 2. transfer GP => PermitProxy => aa
    { from, to: aa.config.PermitProxy, data: Transfer2aa, value: BigInt(0) },
    // 3. aa approve GP => zAce
    { from, to: wallet.address.GP, data: Approve2game, value: BigInt(0) },
    ...otherFc,
  ]);
  return tx;
};
