import TonWeb from "tonweb";
import { isPro } from "../constant/constant";
export const TonChainInfo = {
  endpoint: "https://testnet.toncenter.com/api/v2/jsonRPC",
  key: "13fb4d7601245519085ff095211618bf4ec1485e729f5e957e066d49822cca7a",
  jettonAddress: "EQAELqZG_9DFmMUkL6Hk4LTz5vEqzahOJFhhbh9YEQjvk_19",
};
export const tonProvider = new TonWeb.HttpProvider(TonChainInfo.endpoint, {
  apiKey: TonChainInfo.key,
});
export const tonWeb = new TonWeb(tonProvider);

export const WebAppData: any = {};
try {
  const search = new URLSearchParams(window.Telegram?.WebApp?.initData);
  alert({ search });
  // @ts-ignore
  for (const [key, value] of search.entries()) {
    WebAppData[key] = value;
  }
  if (!isPro() && !WebAppData.user) {
    WebAppData.user = JSON.stringify({ id: 566752830 });
    WebAppData.dev = true;
  }
} catch (err) {
  console.error("WebAppData", err);
}
