import {
  useSetRecoilState,
  atom,
  selector,
  RecoilRoot,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
} from "recoil";
import { useWalletClient } from "wagmi";
export { useWalletClient };
export {
  useSetRecoilState,
  atom,
  selector,
  RecoilRoot,
  useRecoilValue,
  useRecoilState,
  useResetRecoilState,
};

export { default as SideBar } from "./components/SideBar";
export {
  IConnectorState,
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
export {
  useNativeBalanceStr,
  usePointsBalanceStr,
} from "./components/ConnectWallet/hooks/connectWalletHooks";

export { default as LinkToBetaDialog } from "./components/ConnectWallet/components/linkToBetaDialog/LinkToBetaDialog";
export { Header } from "./components/Header";
export { default as PlayerAvatar } from "./components/PlayerAvatar";

export { default as LogoutDialog } from "./components/ConnectWallet/components/AccountInfoDialog";
export { default as Balance } from "./components/ConnectWallet/components/Balance/Balance";
export { default as ChainSelectorWidget } from "./components/ConnectWallet/components/ChainSelector/ChainSelectorWidget";
export {
  default as PointsDialog,
  IPointsItem,
} from "./components/ConnectWallet/components/PointsDialog/PointsDialog";
export { default as PointsRuleDialog } from "./components/ConnectWallet/components/PointsDialog/PointsRuleDialog";
export {
  appInfo,
  divisor6xBigNumber,
  divisorBigNumber,
  txStatus,
  preStaticUrl,
  ChainId,
  defaultChainId,
  supportedChainIds,
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
} from "./constant/constant";
export {
  IsMdProvider,
  IsMobileProvider,
  IsMdContext,
  IsMobileContext,
} from "./provider/IsMobileProvider";
export { default as RainbowKitWithThemeProvider } from "./provider/RainbowKitWithThemeProvider";
export { localStorageEffect } from "./utils/localStorageEffect";
export { useAccountInvitation } from "./hooks/useAccountInvitation";
export { useActiveChainId } from "./hooks/useActiveChainId";
export { useActiveWallet } from "./hooks/useActiveWallet";

export { useActiveWeb3React } from "./hooks/useActiveWeb3React";
export { useCustomTranslation } from "./hooks/useCustomTranslation";
export { useInitRainbowFn } from "./hooks/useInitRainbowFn";
export {
  LinkList,
  blankLinkList,
  INavLink,
  INavLinkType,
  useNavItem,
  usePathname,
} from "./hooks/useNavItem";
export { useSwapPoint } from "./hooks/usePoint";
export { usePublicNodeWaitForTransaction } from "./hooks/usePublicNodeWaitForTransaction";
export {
  default as useWindowSize,
  useIsMobile,
  useIsMd,
} from "./hooks/useWindowSize";
import { changeLanguage } from "i18next";
export { changeLanguage };
export { LngNs } from "./utils/i18n";

export { getProvider } from "./connectors/contract";
export { getContract, getContractFromRpc } from "./connectors/contractV2";
export { default as erc20Contract } from "./contract/erc20";
export { default as ZkBingoPointsContract } from "./contract/bingoPoints";
import { useConnectModal, useChainModal } from "@zypher-game/rainbowkit";
export { useConnectModal, useChainModal };
