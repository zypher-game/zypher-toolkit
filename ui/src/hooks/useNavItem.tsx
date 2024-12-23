import { isPro } from "../constant/constant";

export const zAceLink = isPro()
  ? "https://zytron-linea.acequest.io/pokerking/"
  : "https://testnet.acequest.io/pokerking/";
export const crLink = "https://cryptorumble.io";

export const LinkList = [
  // "/zBingo",
  "https://zypher.game/bingo/",
  "https://zypher.game/2048/",
  zAceLink,
  crLink,
  "", //game_tcg.jpg
  "", //game_mahjong.jpg
  "", //game_muder.jpg
];
export const blankLinkList = [
  false,
  true,
  true,
  true,
  false, //game_tcg.jpg
  false, //game_mahjong.jpg
  false, //game_muder.jpg
];
