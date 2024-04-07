import { useEffect, useMemo } from "react";
import { useSetRecoilState } from "recoil";

import { LngNs } from "../utils/i18n";
import { useCustomTranslation } from "./useCustomTranslation";
import { useIsMobile } from "./useWindowSize";
import { defaultSelectedKey } from "../components/SideBar/state";
import { INavLink, INavLinkType } from "./useNavItem.type";
import { useActiveWeb3React } from "./useActiveWeb3React";
import { isPro } from "../constant/constant";

export const LinkList = [
  // "/zBingo",
  window.location.origin + "/bingo/",
  window.location.origin + "/2048/",
  isPro() ? "https://acequest.io/zAce/" : "https://testnet.acequest.io/zAce/",
  "https://test.zypher.game/CryptoRumble/",
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

export const usePathname = () => {
  const isMobile = useIsMobile();
  const setDefaultSelectedKey = useSetRecoilState(defaultSelectedKey);
  useEffect(() => {
    const path = window.location.hash.split("/");
    const pathName = path[1];
    switch (pathName) {
      case "zBingo":
        return setDefaultSelectedKey("2");
      // case "TCG":
      //   return setDefaultSelectedKey("14");
      // case "Murder Mystery":
      //   return setDefaultSelectedKey("13");
      // case "Candy Crush":
      //   return setDefaultSelectedKey("12");
      // case "zMahjong":
      //   return setDefaultSelectedKey("11");
      // case "z2048":
      //   return setDefaultSelectedKey("10");
      // case "zAce":
      //   return setDefaultSelectedKey("6");
      case "profile":
        return setDefaultSelectedKey("3");
      case "gbBox":
        return setDefaultSelectedKey("4");
      case "invitation":
        return setDefaultSelectedKey("7");
      case "ranking":
        return setDefaultSelectedKey("8");
      case "defense":
        return setDefaultSelectedKey("9");
      case "shop":
        return setDefaultSelectedKey("5");
      case "dp":
        return setDefaultSelectedKey("15");
      default:
        setDefaultSelectedKey("1");
    }
  }, [location, isMobile]);
};

export const useNavItem = (): INavLink[] => {
  const { t } = useCustomTranslation([LngNs.siderBar]);
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
      },

      {
        label: t("z2048"),
        keyValue: "10",
        icon: "z2048.png",
        link: LinkList[1],
        disabled: false,
        type: INavLinkType.Games,
      },
      {
        label: t("zAce"),
        keyValue: "6",
        icon: "zACE.png",
        link: LinkList[2],
        disabled: false,
        type: INavLinkType.Games,
      },

      {
        label: t("Candy Crush"),
        keyValue: "12",
        icon: "Candy.png",
        link: LinkList[3],
        disabled: false,
        type: INavLinkType.Games,
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
