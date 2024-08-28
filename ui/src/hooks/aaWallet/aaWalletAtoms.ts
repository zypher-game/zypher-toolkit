import { TonProofItemReplySuccess } from "@tonconnect/ui-react";
import { atom } from "recoil";
import { Iaa, WagmiWalletHandler } from "../../gas0/utils/wagmiWalletHandler";
import { Address, WalletClient } from "wagmi";

export type IAAWallet = {
  getContainer?: HTMLElement | null;
  wallet?: WagmiWalletHandler;
  walletClient?: WalletClient;
  aaWalletClient?: WalletClient;
  mockAcc?: any;
  aa_mm_address?: Address;
  aa?: Iaa;
};
export const aaWalletState = atom<IAAWallet>({
  key: "aaWalletState",
  default: {
    getContainer: undefined,
    walletClient: undefined,
    aa: undefined,
    aa_mm_address: undefined,
    mockAcc: (address: Address, proof?: TonProofItemReplySuccess) =>
      null as any,
  },
});
