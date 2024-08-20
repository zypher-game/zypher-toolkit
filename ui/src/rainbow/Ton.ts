import TonWeb from "tonweb";
export const TonChainInfo = {
  endpoint: "https://testnet.toncenter.com/api/v2/jsonRPC",
  key: "13fb4d7601245519085ff095211618bf4ec1485e729f5e957e066d49822cca7a",
  jettonAddress: "EQAELqZG_9DFmMUkL6Hk4LTz5vEqzahOJFhhbh9YEQjvk_19",
};
export const tonProvider = new TonWeb.HttpProvider(TonChainInfo.endpoint, {
  apiKey: TonChainInfo.key,
});
export const tonWeb = new TonWeb(tonProvider);

// export const WebAppData = {
//   query_id: "AAHoW-FSAAAAAOhb4VLDThlv",
//   user: JSON.stringify({
//     id: 1390500840,
//     first_name: "sli",
//     last_name: "hai",
//     username: "hailiting",
//     language_code: "zh-hans",
//     allows_write_to_pm: true,
//   }),
//   auth_date: "1722914942",
//   hash: "ed0f6e4d2cd3b4ff071a5a87c26a48bb679bb9cb166a982e9f7165e0b98c5ecf",
// };
