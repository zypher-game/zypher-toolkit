import { atom, useRecoilValue } from "recoil";

export const isTelegramState = atom<boolean>({
  key: "isTelegramState",
  default: !!window.IS_TELEGRAM,
});
export const useIsTelegram = () => {
  return useRecoilValue(isTelegramState);
};
