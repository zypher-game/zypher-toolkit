import { Address } from "wagmi";
import { WagmiWalletHandler } from "./wagmiWalletHandler";
export declare const gas0WalletCreateAndApprove: (wallet: WagmiWalletHandler, controller: Address, isAllow: boolean, isFree: boolean) => Promise<void>;
