import {
  useSetRecoilState,
  atom,
  selector,
  RecoilRoot,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
} from "recoil";
export { IPointsItem } from "./components/ConnectWallet/components/PointsDialog/PointsDialog.type";
export { INavLink, INavLinkType } from "./hooks/useNavItem.type";
export { IConnectorState } from "./components/ConnectWallet/state/connectWalletState.type";
export {
  IGameStatus,
  IGameName,
  IBingoInfo,
  IPlayer,
  IRecentGame,
  IGameList,
} from "./types/gameList.types";
import { useWalletClient, useSwitchNetwork } from "wagmi";
export { useWalletClient, useSwitchNetwork };
export {
  useSetRecoilState,
  atom,
  selector,
  RecoilRoot,
  useRecoilValue,
  useRecoilState,
  useResetRecoilState,
};
export {
  appInfo,
  divisor6xBigNumber,
  divisorBigNumber,
  txStatus,
  preStaticUrl,
  ChainId,
  supportedChainIds,
  DPSupportChainId,
  ChainRpcUrls,
  ChainRpcWebSocketUrls,
  BlockExplorerUrls,
  ChainName,
  ChainNetworkName,
  isTestnet,
  ChainImage,
  Currency,
  CurrencyLogo,
  CurrencyContract,
  IContractName,
  zkBingoV0,
  zkBingo,
  bingoV1SupportedChainId,
  bingoBetaSupportedChainId,
  bingoSupportedChainId,
  isPro,
} from "./constant/constant";
export { localStorageEffect } from "./utils/localStorageEffect";

export {
  LinkList,
  blankLinkList,
  useNavItem,
  usePathname,
} from "./hooks/useNavItem";
export {
  connectorState,
  walletModalOpenState,
  ChainSelector,
  refreshBalanceState,
  pointsDialogState,
  pointsWarnState,
  hidePointsWarnState,
  pointsRuleDialogState,
  accountInfoDialogState,
  linkToBetaDialogState,
  linkToBetaDialogChainIdState,
  nativeBalanceState,
  pointsBalanceState,
} from "./components/ConnectWallet/state/connectWalletState";
export { default as PointsDialog } from "./components/ConnectWallet/components/PointsDialog/PointsDialog";
export { default as SideBar } from "./components/SideBar";
export { defaultSelectedKey } from "./components/SideBar/state";
export { default as DivWrap } from "./components/DivWrap/DivWrap";
export {
  useNativeBalanceStr,
  usePointsBalanceStr,
} from "./components/ConnectWallet/hooks/connectWalletHooks";
export { default as CurrencyLogoComp } from "./components/CurrencyLogo";

export { default as LinkToBetaDialog } from "./components/ConnectWallet/components/linkToBetaDialog/LinkToBetaDialog";
export { Header } from "./components/Header";
export { siderCollapseState } from "./components/Header/state";
export {
  default as PlayerAvatar,
  PlayerAvatarList,
} from "./components/PlayerAvatar";
// export { default as AccountInfoDialog } from "./components/ConnectWallet/components/AccountInfoDialog";
export { default as Balance } from "./components/ConnectWallet/components/Balance/Balance";
export { default as ChainSelectorWidget } from "./components/ConnectWallet/components/ChainSelector/ChainSelectorWidget";
export { PointsIcon } from "./components/icons/PointsIcon/PointsIcon";
export { default as SvgComponent } from "./components/SvgComponent/SvgComponent";

export { default as PointsRuleDialog } from "./components/ConnectWallet/components/PointsDialog/PointsRuleDialog";

export {
  IsMdProvider,
  IsMobileProvider,
  IsMd1100Provider,
  IsMd1220Provider,
} from "./provider/IsMobileProvider";
export { default as RainbowKitWithThemeProvider } from "./provider/RainbowKitWithThemeProvider";
export { useAccountInvitation } from "./hooks/useAccountInvitation";
export { useActiveChainId } from "./hooks/useActiveChainId";
export { useActiveWallet } from "./hooks/useActiveWallet";
export { useCurrentLanguage } from "./hooks/useCurrentLanguage";
export { useActiveWeb3React } from "./hooks/useActiveWeb3React";
export { useCustomTranslation } from "./hooks/useCustomTranslation";
export { useInitRainbowFn } from "./hooks/useInitRainbowFn";
export { useGetInvitationAddress } from "./hooks/useGetInvitationAddress";
export {
  useRecentGamesFromGraph,
  graphqlApiUrl,
  chainIdPre,
  getStatus,
  formatDataFromGraph,
  getRecentGameById,
} from "./hooks/useRecentGamesFromGraph";
export { useInterval } from "./hooks/useInterval";

export { useSwapPoint } from "./hooks/usePoint";
export { usePublicNodeWaitForTransaction } from "./hooks/usePublicNodeWaitForTransaction";
export {
  default as useWindowSize,
  useIsMobile,
  useIsMd,
  useIsMd1100,
  useIsMd1220,
} from "./hooks/useWindowSize";
import { changeLanguage } from "i18next";
export { changeLanguage };
export { LngNs } from "./utils/i18n";

export { getProvider } from "./connectors/contract";
export { getContract, getContractFromRpc } from "./connectors/contractV2";
export { default as erc20Contract, erc20Abi } from "./contract/erc20";
export { default as ZkBingoPointsContract } from "./contract/bingoPoints";
export { default as MulticallContract } from "./contract/multicall";

import { useConnectModal, useChainModal } from "./rainbowkit/src";
export { useConnectModal, useChainModal };
export {
  pow10,
  bnPow10,
  getShortenAddress,
  getShortenAddress2,
  filterInput,
  measureText,
  formatCurrency,
  formatSymbol,
  eX,
  formatDecimal,
  formatMoney,
  convertToLargeNumberRepresentation,
  splitArrByLen,
} from "./utils/tool";
export { request } from "./utils/request";
export {
  getUTCSeconds,
  timestampToDateStr,
  getFormattedTime,
  isTimeout,
  getFormattedTimeMobile,
} from "./utils/data";
export { getChainId } from "./utils/getChainId";
export { languageList } from "./components/SideBar/component/Language";
export {
  IPixelProps,
  ActivePixelCard,
  ActivePixelColorCard,
  PixelBorderCard,
  PixelCube2,
  PixelCube3,
  PixelCube5,
  ActivePixelButton,
  ActivePixelButtonColor,
  PixelBorderCardButton,
} from "./components/PixelBtn/ActivePixelButton";

export { default as PixelTab } from "./components/PixelTab/PixelTab";
export { default as PixelTabBorder } from "./components/PixelTab/PixelTabBorder";
export {
  PixelTableBorder,
  PixelTable,
} from "./components/PixelTable/PixelTable";
export { default as LoadingButton } from "./components/LoadingSvg/LoadingButton";
export { default as DialogClose } from "./components/DialogClose/DialogClose";

export { default as CommunityLink } from "./components/SideBar/component/CommunityLink";
