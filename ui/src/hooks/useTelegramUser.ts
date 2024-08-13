import { useEffect } from "react";
import {
  atom,
  SetterOrUpdater,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { useEffectValue } from "./useEffectValue";
import { httpPost } from "../utils/request";
import { GlobalVar, TG_BOT_URL } from "../constant/constant";
import { localStorageEffect } from "../utils/localStorageEffect";
export type IWebAppData = {
  auth_date: string;
  hash: string;
  query_id: string;
  user: string; // string
};
export interface TelegramUserInfoDto {
  id: string;
  name: string;
  is_premium: boolean;
  ref: string;
  ref2: string;
  lastLoginAt: string;
  lastShareAt: string;
  lastBingoAt: string;
  bingoAt: string;
  createdAt: string;
  updatedAt: string;
  star: string;
  onceTask: string;
  evmWallet: `0x${string}`;
  tonWallet: string;
  index?: string; // ranking 排名
}
export const TelegramUserInfoState = atom({
  key: "TelegramUserInfoState",
  default: null as null | TelegramUserInfoDto,
  effects_UNSTABLE: [localStorageEffect("TelegramUserInfoState")],
});

export const WebAppDataState = atom<IWebAppData | undefined>({
  key: "WebAppDataState",
  default: undefined,
  effects_UNSTABLE: [localStorageEffect("WebAppDataState")],
});
export const TelegramUserIdEvmAddressKey = "TgUserIdEvmAddressKey";
const getFaucet = async (WebAppData: IWebAppData) => {
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
  const [WebAppData, setWebAppData] = useRecoilState(WebAppDataState);
  const _user = useSetRecoilState(TelegramUserInfoState);
  const user = useEffectValue(
    null,
    async () => {
      console.log({ WebApp: WebAppData });
      if (!window.IS_TELEGRAM || !WebAppData?.user) {
        // if (!window.IS_TELEGRAM || !window.Telegram?.WebApp?.initData) {
        return null;
      }
      if (WebAppData && WebAppData.user) {
        const res = httpPost<TelegramUserInfoDto>(`${TG_BOT_URL}/user/get`, {
          WebAppData: WebAppData,
        });
        getFaucet(WebAppData);
        console.log({ res: await res });
        if ((await res).code) return null;
        return (await res).data;
      }
    },
    [WebAppData?.user]
  );
  console.log({ user });
  useEffect(() => {
    if (user) {
      localStorage.setItem("TelegramUserIdEvmAddressKey", user.evmWallet);
      GlobalVar.mockAcc(user.evmWallet);
      _user(user);
      // 如果没start 则
    } else {
      _user(null);
    }
  }, [JSON.stringify(user)]);
  useEffect(() => {
    console.log({ IS_TELEGRAM: GlobalVar.IS_TELEGRAM });
    if (GlobalVar.IS_TELEGRAM) {
      try {
        let _WebAppData: IWebAppData = {
          auth_date: "",
          hash: "",
          query_id: "",
          user: "",
        };
        const params = new URLSearchParams(window.Telegram?.WebApp?.initData);
        _WebAppData.query_id = params.get("query_id") ?? "";
        _WebAppData.user = params.get("user") ?? "";
        _WebAppData.hash = params.get("hash") ?? "";
        _WebAppData.auth_date = params.get("auth_date") ?? "";
        console.log({ _WebAppData });
        setWebAppData(_WebAppData);
        window.WebAppData = _WebAppData;
      } catch (err) {
        console.error("WebAppData", err);
      }
    }
  }, [GlobalVar.IS_TELEGRAM]);
  return WebAppData;
};
export const useWebAppData = () => {
  return useRecoilValue(WebAppDataState);
};
export const useTelegramAccountInit = (
  userInfo: TelegramUserInfoDto | null,
  _userInfo: SetterOrUpdater<TelegramUserInfoDto | null>,
  setIsModalOpen: SetterOrUpdater<boolean>
) => {
  const WebAppData = useWebAppData();
  return useEffectValue(
    null,
    async () => {
      console.log(1111111);
      if (!userInfo?.star) return null;
      if (userInfo.star !== "0") return null;
      const res = await httpPost<TelegramUserInfoDto>(
        `${TG_BOT_URL}/user/init-star`,
        { WebAppData }
      );
      if (res.code) return null;
      _userInfo(res.data);
      setIsModalOpen(true);
      return res.data;
    },
    [userInfo?.star]
  );
};
