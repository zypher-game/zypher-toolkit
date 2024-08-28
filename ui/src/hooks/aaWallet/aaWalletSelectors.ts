import { selector } from "recoil";
import { aaWalletState, IAAWallet } from "./aaWalletAtoms";

export const aaWalletSelector = selector<IAAWallet>({
  key: "aaWalletSelector",
  get: ({ get }) => get(aaWalletState),
  set: ({ set }, newValue) => {
    set(aaWalletState, newValue);
  },
});
