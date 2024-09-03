import { Address } from "wagmi";
import { WagmiWalletHandler } from "./wagmiWalletHandler";
import { MulticallMessageItem } from "./encodeFunctionMulticall";
export declare const aaApproveAndFcErc20: ({ erc20Address, wallet, tokenAmount, permitForAddress, otherFc, }: {
    erc20Address: Address;
    wallet: WagmiWalletHandler;
    permitForAddress: Address;
    tokenAmount: string;
    otherFc: MulticallMessageItem[];
}) => Promise<any>;
