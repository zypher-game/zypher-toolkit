"use client";
import {
  getWalletConnectConnector,
  getWalletConnectUri
} from "./chunk-IY4T55P4.js";
import {
  isMobile
} from "./chunk-ZOLACFTK.js";

// src/wallets/walletConnectors/tokenPocketWallet/tokenPocketWallet.ts
import { InjectedConnector } from "wagmi/connectors/injected";
var tokenPocketWallet = ({
  chains,
  projectId,
  walletConnectOptions,
  walletConnectVersion = "2"
}) => {
  var _a;
  const isTokenPocketInjected = typeof window !== "undefined" && ((_a = window.ethereum) == null ? void 0 : _a.isTokenPocket) === true;
  const shouldUseWalletConnect = !isTokenPocketInjected;
  return {
    id: "tokenPocket",
    name: "TokenPocket",
    iconUrl: async () => (await import("./tokenPocketWallet-UYD66DEM.js")).default,
    iconBackground: "#2980FE",
    installed: !shouldUseWalletConnect ? isTokenPocketInjected : void 0,
    downloadUrls: {
      chrome: "https://chrome.google.com/webstore/detail/tokenpocket/mfgccjchihfkkindfppnaooecgfneiii",
      browserExtension: "https://extension.tokenpocket.pro/",
      android: "https://play.google.com/store/apps/details?id=vip.mytokenpocket",
      ios: "https://apps.apple.com/us/app/tp-global-wallet/id6444625622",
      qrCode: "https://tokenpocket.pro/en/download/app",
      mobile: "https://tokenpocket.pro/en/download/app"
    },
    createConnector: () => {
      const connector = shouldUseWalletConnect ? getWalletConnectConnector({
        chains,
        projectId,
        options: walletConnectOptions,
        version: walletConnectVersion
      }) : new InjectedConnector({ chains });
      const getUri = async () => {
        const uri = await getWalletConnectUri(connector, walletConnectVersion);
        return isMobile() ? `tpoutside://wc?uri=${encodeURIComponent(uri)}` : uri;
      };
      return {
        connector,
        mobile: {
          getUri: shouldUseWalletConnect ? getUri : void 0
        },
        qrCode: shouldUseWalletConnect ? {
          getUri,
          instructions: {
            learnMoreUrl: "https://help.tokenpocket.pro/en/",
            steps: [
              {
                description: "We recommend putting TokenPocket on your home screen for quicker access.",
                step: "install",
                title: "Open the TokenPocket app"
              },
              {
                description: "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
                step: "create",
                title: "Create or Import a Wallet"
              },
              {
                description: "After you scan, a connection prompt will appear for you to connect your wallet.",
                step: "scan",
                title: "Tap the scan button"
              }
            ]
          }
        } : void 0,
        extension: {
          instructions: {
            learnMoreUrl: "https://help.tokenpocket.pro/en/extension-wallet/faq/installation-tutorial",
            steps: [
              {
                description: "We recommend pinning TokenPocket to your taskbar for quicker access to your wallet.",
                step: "install",
                title: "Install the TokenPocket extension"
              },
              {
                description: "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
                step: "create",
                title: "Create or Import a Wallet"
              },
              {
                description: "Once you set up your wallet, click below to refresh the browser and load up the extension.",
                step: "refresh",
                title: "Refresh your browser"
              }
            ]
          }
        }
      };
    }
  };
};

export {
  tokenPocketWallet
};
