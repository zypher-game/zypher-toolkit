import { crLink, LinkList, zAceLink } from "../hooks/useNavItem";
import { ChainId } from "./constant";

export type IGamesItem = {
  label: string;
  icon: string;
  twitter?: string;
  link?: string;
};

export type IGames = {
  keyValue: string;
  dapps: IGamesItem[];
};
export const Games = (chainId: ChainId): IGames[] => {
  return [
    {
      keyValue: "21",
      dapps: [
        {
          label: "Crypto Rumble",
          icon: "Candy.png",
          link: crLink,
        },
        {
          label: "Poker King",
          icon: "zAce.png",
          link: zAceLink,
        },
        {
          label: "Gammo",
          icon: "Gammo TG.png",
          link: "https://t.me/GammoBot",
        },
      ],
    },
    {
      keyValue: "22",
      dapps: [
        {
          label: "Zombie Survival",
          icon: "zombieSurvival TG.png",
          link: "https://t.me/zZombieSurvivalBot",
        },
        {
          label: "Rainbow Journey",
          icon: "RainbowJourney TG.png",
          link: "https://t.me/RainbowJourneyBot",
        },
        {
          label: "BigWhale",
          icon: "BigWhale TG.png",
          link: "https://t.me/zBigWhaleBot",
        },
      ],
    },
    {
      keyValue: "23",
      dapps: [
        {
          label: "TCG",
          icon: "TCG.png",
        },
        {
          label: "zMahjong",
          icon: "zMahjong.png",
        },
        {
          label: "Murder Mystery",
          icon: "Murder.png",
        },
      ],
    },
    {
      keyValue: "24",
      dapps: [
        {
          label: "z2048",
          icon: "z2048.png",
          link: "https://zypher.game/2048/",
        },
        {
          label: "Bingo",
          icon: "zBingo.png",
          link: "https://zypher.game/bingo/59144/",
        },
        {
          label: "Divine Cataclysm: Oblivion",
          icon: "DC.png",
          link: "https://www.dc.game/",
        },
      ],
    },
    {
      keyValue: "25",
      dapps: [
        {
          label: "z2048",
          icon: "z2048 TG.png",
          link: "https://t.me/zypher2048bot",
        },
        {
          label: "Bingo",
          icon: "zbingo TG.png",
          link: "https://t.me/zBingoBot",
        },
        {
          label: "Ten Sum Rings",
          icon: "TensumRings_temp_ TG.png",
          link: "https://ten-sum-next.zypher.game/",
        },
      ],
    },
    // {
    //   keyValue: "26",
    //   dapps: [
    //     {
    //       label: "Cross The Ages",
    //       icon: "CrossAges.png",
    //       twitter: "https://twitter.com/CrossTheAges ",
    //       link: "https://linktr.ee/crosstheages ",
    //     },
    //     {
    //       label: "Wildcard",
    //       icon: "Wildcard.png",
    //       twitter: "https://twitter.com/PlayWildcard",
    //     },
    //     {
    //       label: "BitcoinLoot",
    //       icon: "BitcoinLoot.png",
    //       twitter: "https://twitter.com/btc_loot",
    //       link: "https://www.bitcoinloot.co/home/",
    //     },
    //   ],
    // },
    {
      keyValue: "27",
      dapps: [
        {
          label: "Protect T-RUMP",
          icon: "ProtectTrump TG.png",
          link: "https://t.me/protectRumpBot",
        },
        {
          label: "Assassins Jump",
          icon: "AssassinsJump TG.png",
          link: "https://t.me/assassinsjump_bot",
        },
        {
          label: "Stick Cat",
          icon: "Stick Cat TG.png",
          link: "https://t.me/zStickCatBot",
        },
      ],
    },
    {
      keyValue: "28",
      dapps: [
        {
          label: "Endless Snake",
          icon: "Endless TG.png",
          link: "https://t.me/endlessSnakeZYBot",
        },
        {
          label: "Galaxia: Elements Conquest Coming Soon",
          icon: "Galaxia.png",
        },
      ],
    },
    {
      keyValue: "29",
      dapps: [
        {
          label: "Crypto Shooter",
          icon: "Crypto Shooter TG.png",
          link: "https://t.me/Crypto_ShooterBot",
        },
        {
          label: "Battles of Airdrop",
          icon: "Airdrop TG.png",
          link: "https://t.me/AirdropBattlesBot",
        },
        {
          label: "Ten Sum Rings",
          icon: "TensumRings_temp_ TG.png",
          link: "https://t.me/TenSumRingsBot",
        },
      ],
    },
    {
      keyValue: "more",
      dapps: [
        {
          label: "Cross The Ages",
          icon: "CrossAges.png",
          twitter: "https://twitter.com/CrossTheAges ",
          link: "https://linktr.ee/crosstheages ",
        },
        {
          label: "Wildcard",
          icon: "Wildcard.png",
          twitter: "https://twitter.com/PlayWildcard",
        },
        {
          label: "BitcoinLoot",
          icon: "BitcoinLoot.png",
          twitter: "https://twitter.com/btc_loot",
          link: "https://www.bitcoinloot.co/home/",
        },
      ],
    },
  ];
};
