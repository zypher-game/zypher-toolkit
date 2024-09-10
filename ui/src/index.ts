import {
  toUserFriendlyAddress,
  useTonAddress,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";
export { toUserFriendlyAddress, useTonAddress, useTonConnectUI, useTonWallet };
import {
  useSetRecoilState,
  atom,
  selector,
  RecoilRoot,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
} from "recoil";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  animate,
  useTransform,
  useSpring,
} from "framer-motion";
export {
  motion,
  AnimatePresence,
  useMotionValue,
  animate,
  useTransform,
  useSpring,
};
export { dialogVariants } from "./constant/motionConstant";

export { AllChainInfo } from "./constant/chains";

export { IPointsItem } from "./components/ConnectWallet/components/PointsDialog/PointsDialog.type";
export { INavLink, INavLinkType } from "./hooks/useNavItem.type";
export { useTonWalletProofMounted } from "./hooks/useTonWalletProofMounted";

export { useIsTelegram } from "./hooks/useIsTelegram";
export { useGetTgName, tgNameListState } from "./hooks/useGetTgName";
export { useGetOwnAddress, ownerListState } from "./hooks/useGetOwnAddress";
export { IConnectorState } from "./components/ConnectWallet/state/connectWalletState.type";

export {
  IGameStatus,
  IGameName,
  IBingoInfo,
  IPlayer,
  IRecentGame,
  IGameList,
} from "./types/gameList.types";
import {
  useWalletClient,
  useSwitchNetwork,
  useDisconnect,
  useAccount,
  usePublicClient,
  useContractReads,
} from "wagmi";
export {
  useWalletClient,
  useSwitchNetwork,
  useDisconnect,
  useAccount,
  usePublicClient,
  useContractReads,
};
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
  getCryptoImg,
  TG_BOT_URL,
  TaskJoinTelegramGroup,
  TaskTelegramBot,
  TaskFollowZypher,
  TaskReweet1,
  targetDate,
  GlobalVar,
} from "./constant/constant";
export {
  useAaWallet,
  useSetAaWallet,
  useWalletHandler,
  useCreate,
} from "./gas0/hooks/useWalletHandler";
export { aaApproveAndFcErc20 } from "./gas0/utils/aaApproveAndFcErc20";
export { MulticallMessageItem } from "./gas0/utils/encodeFunctionMulticall";
export { Gas0Constants } from "./gas0/constants/Gas0Constant";
export { getIsCode } from "./gas0/utils/getIsCode";

export {
  TVL_API,
  TVLChainId,
  defaultActiveChainId,
  TVLStakingSupportedChainId,
  IToken,
  TVLToken,
  activeTokenList,
  tvlTokenAddress,
  tvlTokens,
  LinkPre,
  getLinkPre,
  minStakingValue,
  CODELENGTH,
  ITvlHero,
  L3ChainId,
} from "./constant/tvlConstant";
export {
  TelegramUserInfoState,
  useTelegramUser,
  useWebAppData,
} from "./hooks/useTelegramUser";
export { IGamesItem, IGames, Games } from "./constant/gamesList";
export { localStorageEffect } from "./utils/localStorageEffect";
export { default as BigNumberJs, FORMAT, BM } from "./utils/BigNumberJs";
export { default as cn } from "./utils/cn";
export { default as sleep, timeoutPromise } from "./utils/sleep";
export { default as ListWithMotion } from "./components/List/ListWithMotion/ListWithMotion";

export {
  LinkList,
  blankLinkList,
  useNavItem,
  zAceLink,
  crLink,
} from "./hooks/useNavItem";
export { useGetHero, useGetUserInfo } from "./hooks/useGetActiveCall";
export {
  useTelegramAccountInit,
  TelegramUserInfoDto,
  RefreshState,
} from "./hooks/useTelegramUser";
export {
  connectorState,
  walletModalOpenState,
  ChainSelector,
  refreshBalanceState,
  refreshAvatarState,
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
export { default as SideBar } from "./components/SideBar/SideBar";
export { default as DivWrap } from "./components/DivWrap/DivWrap";
export { NavKey } from "./components/Header/Navigation/Navigation";
export { default as IsPixelWidget } from "./components/Header/rainbow_account/IsPixelWidget";

export {
  useNativeBalanceStr,
  usePointsBalanceStr,
} from "./components/ConnectWallet/hooks/connectWalletHooks";
export { default as CurrencyLogoComp } from "./components/CurrencyLogo";

export { default as LinkToBetaDialog } from "./components/ConnectWallet/components/linkToBetaDialog/LinkToBetaDialog";
export { Header } from "./components/Header";
export { sideCollapseState, pathnameState } from "./components/Header/state";
export {
  default as PlayerAvatar,
  IPlayerAvatar,
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
  IsW768Provider,
  IsW1100Provider,
  IsW1220Provider,
} from "./provider/IsMobileProvider";
export { default as RainbowKitWithThemeProvider } from "./provider/RainbowKitWithThemeProvider";
export { default as TonConnectUIProvider } from "./provider/TonConnectUIProvider";

export { useAccountInvitation } from "./hooks/useAccountInvitation";
export { useAvatar } from "./hooks/useAvatar";

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
  useIsW768,
  useIsMd,
  useIsW1100,
  useIsW1220,
} from "./hooks/useWindowSize";
import { changeLanguage } from "i18next";
export { changeLanguage };
export { LngNs } from "./utils/i18n";
export { addressIsEqual } from "./utils/addressIsEqual";
export { getWeb3Sign } from "./utils/getSign";
export {
  getContract,
  getContractFromRpc,
  getProvider,
} from "./connectors/contractV2";
export { default as erc20Contract, erc20Abi } from "./contract/erc20";
export { default as erc721Contract, erc721Abi } from "./contract/erc721";
export { default as ZkBingoPointsContract } from "./contract/bingoPoints";
export { default as MulticallContract } from "./contract/multicall";

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
  formatMoney,
  convertToLargeNumberRepresentation,
  splitArrByLen,
} from "./utils/tool";
export { getLocalTime } from "./utils/time";
export { request, httpPost, httpGet } from "./utils/request";
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
  IPixelButtonTheme,
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
  IsTablePixelWidget,
} from "./components/PixelTable/PixelTable";
export { default as LoadingButton } from "./components/LoadingSvg/LoadingButton";
export { default as DialogClose } from "./components/DialogClose/DialogClose";

export { default as CommunityLink } from "./components/SideBar/component/CommunityLink";

export { __private__ } from "./rainbowkit/src/__private__/index";
export * from "./rainbowkit/src/components/index";
export { useAsyncImage } from "./rainbowkit/src/components/AsyncImage/useAsyncImage";
export { DisclaimerComponent } from "./rainbowkit/src/components/RainbowKitProvider/AppContext";
export {
  AuthenticationConfig,
  AuthenticationStatus,
} from "./rainbowkit/src/components/RainbowKitProvider/AuthenticationContext";
export {
  createAuthenticationAdapter,
  RainbowKitAuthenticationProvider,
} from "./rainbowkit/src/components/RainbowKitProvider/AuthenticationContext";
export { AvatarComponent } from "./rainbowkit/src/components/RainbowKitProvider/AvatarContext";
export {
  useAccountModal,
  useChainModal,
  useConnectModal,
} from "./rainbowkit/src/components/RainbowKitProvider/ModalContext";
export { Chain } from "./rainbowkit/src/components/RainbowKitProvider/RainbowKitChainContext";
export { Theme } from "./rainbowkit/src/components/RainbowKitProvider/RainbowKitProvider";
export { default as ModalWithMotion } from "./components/Modal/ModalWithMotion/ModalWithMotion";
export { cssObjectFromTheme } from "./rainbowkit/src/css/cssObjectFromTheme";
export { cssStringFromTheme } from "./rainbowkit/src/css/cssStringFromTheme";
export { useChainId } from "./rainbowkit/src/hooks/useChainId";
export { useConnectionStatus } from "./rainbowkit/src/hooks/useConnectionStatus";
export { darkTheme } from "./rainbowkit/src/themes/darkTheme";
export { lightTheme } from "./rainbowkit/src/themes/lightTheme";
export { midnightTheme } from "./rainbowkit/src/themes/midnightTheme";
export { useAddRecentTransaction } from "./rainbowkit/src/transactions/useAddRecentTransaction";
export { connectorsForWallets } from "./rainbowkit/src/wallets/connectorsForWallets";
export { getDefaultWallets } from "./rainbowkit/src/wallets/getDefaultWallets";
export { getWalletConnectConnector } from "./rainbowkit/src/wallets/getWalletConnectConnector";
export {
  useWalletConnectors,
  WalletConnector,
} from "./rainbowkit/src/wallets/useWalletConnectors";
export { Wallet, WalletList } from "./rainbowkit/src/wallets/Wallet";
export {
  argentWallet,
  bifrostWallet,
  bitgetWallet,
  bitKeepWallet,
  bitskiWallet,
  braveWallet,
  coin98Wallet,
  coinbaseWallet,
  coreWallet,
  dawnWallet,
  enkryptWallet,
  foxWallet,
  frameWallet,
  frontierWallet,
  imTokenWallet,
  injectedWallet,
  ledgerWallet,
  metaMaskWallet,
  mewWallet,
  okxWallet,
  omniWallet,
  oneKeyWallet,
  phantomWallet,
  rabbyWallet,
  rainbowWallet,
  safeheronWallet,
  safeWallet,
  tahoWallet,
  talismanWallet,
  tokenPocketWallet,
  trustWallet,
  uniswapWallet,
  walletConnectWallet,
  xdefiWallet,
  zerionWallet,
} from "./rainbowkit/src/wallets/walletConnectors/index";
