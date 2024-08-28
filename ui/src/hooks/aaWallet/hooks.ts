import { useRecoilValue, useSetRecoilState } from "recoil";
import { aaWalletState } from "./aaWalletAtoms";

export const useAaWallet = () => {
  return useRecoilValue(aaWalletState);
};
export const useSetAaWallet = () => {
  return useSetRecoilState(aaWalletState);
};
