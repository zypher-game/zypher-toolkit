import { useEffect } from "react";
import { atom, SetterOrUpdater, useSetRecoilState } from "recoil";
import { useEffectValue } from "./useEffectValue";
import { httpPost } from "../utils/request";
import { GlobalVar, TG_BOT_URL } from "../constant/constant";
import { WebAppData } from "../rainbow/Ton";
import { localStorageEffect } from "../utils/localStorageEffect";
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
  effects_UNSTABLE: [localStorageEffect("TelegramUserInfoState")],
});
export const TelegramUserIdEvmAddressKey = "TgUserIdEvmAddressKey";
const getFaucet = async () => {
  try {
    const resaaa = httpPost<string>(`${TG_BOT_URL}/wallet/get`, {
      WebAppData,
    });
    const address = (await resaaa).data;
    if (address && address.startsWith("0x")) {
      const faucetURL = "https://mainnet-simple-faucet.zypher.game";
      await fetch(faucetURL, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ address: address }),
      });
    }
  } catch (e) {
    console.log("getFaucet Error", e);
  }
};
export const useTelegramUser = () => {
  const _user = useSetRecoilState(TelegramUserInfoState);
  const user = useEffectValue(
    null,
    async () => {
      // if (!window.IS_TELEGRAM) {
      if (!window.IS_TELEGRAM || !window.Telegram?.WebApp?.initData) {
        return null;
      }
      const res = httpPost<TelegramUserInfoDto>(`${TG_BOT_URL}/user/get`, {
        WebAppData,
      });
      getFaucet();
      console.log({ res: await res });
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
    } else {
      _user(null);
    }
  }, [JSON.stringify(user)]);
};

export const useTelegramAccountInit = (
  userInfo: TelegramUserInfoDto | null,
  _userInfo: SetterOrUpdater<TelegramUserInfoDto | null>
) => {
  return useEffectValue(
    null,
    async () => {
      if (!userInfo?.star) return null;
      if (userInfo.star !== "0") return null;
      const res = await httpPost<TelegramUserInfoDto>(
        `${TG_BOT_URL}/user/init-star`,
        { WebAppData }
      );
      if (res.code) return null;
      _userInfo(res.data);
      return res.data;
    },
    [userInfo?.star]
  );
};
