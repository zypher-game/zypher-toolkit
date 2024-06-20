import { LinkList } from "../hooks/useNavItem";
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
          label: "CryptoRumble",
          icon: "Candy.png",
          link: LinkList[3],
        },
        {
          label: "zBingo",
          icon: "zBingo.png",
          link: `${LinkList[0]}${chainId ? chainId + "/" : ""}`,
        },
      ],
    },
    {
      keyValue: "22",
      dapps: [
        {
          label: "zAce",
          icon: "zAce.png",
          link: LinkList[2],
        },
        {
          label: "z2048",
          icon: "z2048.png",
          link: LinkList[1],
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
          label: "Anome",
          icon: "Anome.png",
          twitter: "https://twitter.com/Anome_Official",
          link: "https://b2.anome.xyz/",
        },
        {
          label: "Gabby World",
          icon: "Gabby World.png",
          twitter: "https://twitter.com/gabby_world_",
          link: "https://tabi.gabby.world/",
        },
      ],
    },
    {
      keyValue: "25",
      dapps: [
        {
          label: "PawX",
          icon: "PawX.png",
          twitter: "https://twitter.com/PawXcats",
          link: "https://www.pawx.me/",
        },
        {
          label: "Castle Of Blackwater",
          icon: "Blackwater.png",
          link: "https://castleofblackwater.com/",
        },
      ],
    },
    {
      keyValue: "26",
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
    {
      keyValue: "27",
      dapps: [
        {
          label: "Degen Verse",
          icon: "Degen Verse.png",
          twitter: "https://twitter.com/degen_game",
          link: "https://degengame.cc/#/home",
        },
        {
          label: "Yuliverse",
          icon: "Yuliverse.png",
          twitter: "https://twitter.com/TheYuliverse",
          link: "https://www.yuliverse.com/",
        },
        {
          label: "Forge Heros",
          icon: "Forge Heros.png",
          twitter: "https://twitter.com/ForgeHeroesGame",
          link: "https://x.com/ForgeHeroesGame",
        },
      ],
    },
    {
      keyValue: "28",
      dapps: [
        {
          label: "Splinterlands",
          icon: "Splinterlands.png",
          twitter: "https://twitter.com/Splinterlands",
        },
        {
          label: "Core Engine",
          icon: "Core Engine.png",
          link: "https://www.creoengine.com/",
        },
        {
          label: "Crystal Fun",
          icon: "Crystal Fun.png",
          twitter: "https://x.com/playCrystalFun",
          link: "https://outer.gg/",
        },
      ],
    },
    {
      keyValue: "29",
      dapps: [
        {
          label: "Cellula",
          icon: "Cellula.png",
          link: "https://factory.cellula.life/welcome",
        },
        {
          label: "Metaline X",
          icon: "Metaline X.png",
          twitter: "https://twitter.com/Metaline001",
          link: "https://app.metaline.games/",
        },
        {
          label: "Trumen World",
          icon: "Trumen World.png",
          twitter: "https://twitter.com/trumen_worl",
          link: "https://www.trumen.world/",
        },
      ],
    },
  ];
};
