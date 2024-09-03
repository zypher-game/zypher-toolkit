import { Iaa, WagmiWalletHandler } from "../utils/wagmiWalletHandler";
import { Address, WalletClient } from "viem";
export type IAAWallet = {
    getContainer?: HTMLElement | null;
    wallet?: WagmiWalletHandler;
    walletClient?: WalletClient;
    aaWalletClient?: WalletClient;
    mockAcc?: any;
    aa_mm_address?: Address;
    aa?: Iaa;
    account?: Address;
};
export declare const aaWalletState: import("recoil").RecoilState<IAAWallet>;
export declare const useAaWallet: () => IAAWallet;
export declare const useSetAaWallet: () => import("recoil").SetterOrUpdater<IAAWallet>;
export declare const useWalletHandler: () => void;
export declare const useCreate: () => () => Promise<void>;
