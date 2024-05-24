import React, { useEffect, useMemo } from "react";

import { LngNs } from "../utils/i18n";
import { useCustomTranslation } from "./useCustomTranslation";
import { INavLink, INavLinkType } from "./useNavItem.type";
import { useActiveWeb3React } from "./useActiveWeb3React";
import { isPro, preStaticUrl } from "../constant/constant";

export const zAceLink = isPro()
  ? "https://acequest.io/zAce/"
  : "https://testnet.acequest.io/zAce/";
export const crLink = "https://testnet.cryptorumble.io";

export const LinkList = [
  // "/zBingo",
  window.location.origin + "/bingo/",
  window.location.origin + "/2048/",
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

const gameStatus = {
  Live: {
    btn_label: "Live",
    btn_background_color: "#C5631D",
  },
  Testing: {
    btn_label: "Testing",
    btn_background_color: "#AF2D6A",
  },
};
export const useNavItem = (): INavLink[] => {
  const { t } = useCustomTranslation([LngNs.sideBar]);
  const { chainId } = useActiveWeb3React();
  return useMemo(() => {
    return [
      {
        label: t("Home"),
        keyValue: "1",
        icon: "home.svg",
        link: "/",
        disabled: false,
        type: INavLinkType.Activities,
      },
      {
        label: t("zBingo"),
        keyValue: "2",
        icon: "zBingo.png",
        link: `${LinkList[0]}${chainId ? chainId + "/" : ""}`,
        disabled: false,
        type: INavLinkType.Games,
        ...gameStatus.Live,
      },

      {
        label: t("z2048"),
        keyValue: "10",
        icon: "z2048.png",
        link: LinkList[1],
        disabled: false,
        type: INavLinkType.Games,
        ...gameStatus.Live,
      },
      {
        label: t("zAce"),
        keyValue: "6",
        icon: "zACE.png",
        link: LinkList[2],
        disabled: false,
        type: INavLinkType.Games,
        content: (className: string) => (
          <div className={className}>
            <p>Acequect Studio</p>
            <img src={preStaticUrl + "/img/games/star.svg"} />
          </div>
        ),
        ...gameStatus.Live,
      },

      {
        label: t("Candy Crush"),
        keyValue: "12",
        icon: "Candy.png",
        link: LinkList[3],
        disabled: false,
        type: INavLinkType.Games,
        ...gameStatus.Testing,
      },
      {
        label: t("TCG"),
        keyValue: "14",
        icon: "TCG.png",
        link: "/tcg",
        disabled: true,
        type: INavLinkType.Games,
      },
      {
        label: t("zMahjong"),
        keyValue: "11",
        icon: "zMahjong.png",
        link: "/zMahjong",
        disabled: true,
        type: INavLinkType.Games,
      },
      {
        label: t("Murder Mystery"),
        keyValue: "13",
        icon: "Murder.png",
        link: "/murdermystery",
        disabled: true,
        type: INavLinkType.Games,
      },
      {
        label: t("Profile"),
        keyValue: "3",
        icon: "profile.svg",
        link: "/profile",
        disabled: false,
        type: INavLinkType.Activities,
      },
      // {
      //   label: t("Defense"),
      //   keyValue: "9",
      //   icon: "defense.svg",
      //   link: "/defense",
      //   disabled: false,
      //   type: INavLinkType.Activities,
      // },
      // {
      //   label: t('Invitation 🔥'),
      //   keyValue: '7',
      //   icon: 'invitation.svg',
      //   link: '/invitation',
      //   disabled: true,
      //   type: INavLinkType.Activities
      // },
      // {
      //   label: t("Ranking"),
      //   keyValue: "8",
      //   icon: "ranking.svg",
      //   link: "/ranking",
      //   disabled: false,
      //   type: INavLinkType.Activities,
      // },
      // {
      //   label: t("Depository Pass"),
      //   keyValue: "15",
      //   icon: "dp.svg",
      //   link: "/dp",
      //   disabled: false,
      //   type: INavLinkType.Activities,
      // },
      // { label: t('GB )Box', keyValue: '4', icon: "gbBox.svg", link: '/gbBox', disabled: false, type: INavLinkType.Activities },
      // { label: t('Shop'), keyValue: '5', icon: 'shop.svg', link: '/shop', disabled: true, type: INavLinkType.Activities }
    ];
  }, [t, chainId]);
};
