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
// export const WebAppData = {
//   query_id: "AAHoW-FSAAAAAOhb4VLDThlv",
//   user: {
//     id: 1390500840,
//     first_name: "sli",
//     last_name: "hai",
//     username: "hailiting",
//     language_code: "zh-hans",
//     allows_write_to_pm: true,
//   },
//   auth_date: "1722849170",
//   hash: "2934d675e4210f9e3ded94f3ad3dc500cae3b51489fd2fbd96738a6145db009c",
// };
