import { useEffect } from "react";
import { atom, useSetRecoilState } from "recoil";
import { useEffectValue } from "./useEffectValue";
import { httpPost } from "../utils/request";
import { GlobalVar, TG_BOT_URL } from "../constant/constant";
import { WebAppData } from "../rainbow/Ton";
export interface TelegramUserInfoDto {
  id: string;
  name: string;
  is_premium: boolean;
  ref: string;
  ref2: string;
  lastLoginAt: string;
  lastShareAt: string;
  last256At: string;
  createdAt: string;
  updatedAt: string;
  star: string;
  onceTask: string;
  evmWallet: `0x${string}`;
  tonWallet: string;
}
export const TelegramUserInfoState = atom({
  key: "TelegramUserInfoState",
  default: null as null | TelegramUserInfoDto,
});
export const TelegramUserIdEvmAddressKey = "TgUserIdEvmAddressKey";

export const useTelegramUser = () => {
  const _user = useSetRecoilState(TelegramUserInfoState);
  const user = useEffectValue(
    null,
    async () => {
      if (!window.IS_TELEGRAM) {
        // if (!window.IS_TELEGRAM || !window.Telegram?.WebApp?.initData) {
        return null;
      }
      const res = httpPost<TelegramUserInfoDto>(`${TG_BOT_URL}/user/get`, {
        WebAppData,
      });
      if ((await res).code) return null;
      return (await res).data;
    },
    []
  );
  useEffect(() => {
    if (user) {
      localStorage.setItem("TelegramUserIdEvmAddressKey", user.evmWallet);
      GlobalVar.mockAcc(user.evmWallet);
      _user(user);
    }
  }, [JSON.stringify(user)]);
};
