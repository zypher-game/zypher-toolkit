import { TonProofItemReplySuccess } from "@tonconnect/ui-react";
import { atom } from "recoil";
import { Address, WalletClient } from "wagmi";

export type IGlobalVar = {
  getContainer?: HTMLElement | null;
  walletClient?: WalletClient;
  mockAcc?: any;
};
export const globalState = atom<IGlobalVar>({
  key: "globalState",
  default: {
    getContainer: undefined,
    walletClient: undefined,
    mockAcc: (address: Address, proof?: TonProofItemReplySuccess) =>
      null as any,
  },
});
