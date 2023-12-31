"use client";
import {
  getWalletConnectConnector,
  getWalletConnectUri
} from "./chunk-IY4T55P4.js";
import {
  isAndroid
} from "./chunk-ZOLACFTK.js";

// src/wallets/walletConnectors/frontierWallet/frontierWallet.ts
import { InjectedConnector } from "wagmi/connectors/injected";
var frontierWallet = ({
  chains,
  projectId,
  walletConnectOptions,
  walletConnectVersion = "2",
  ...options
}) => {
  var _a, _b, _c, _d;
  const isFrontierInjected = typeof window !== "undefined" && typeof window.frontier !== "undefined" && ((_b = (_a = window == null ? void 0 : window.frontier) == null ? void 0 : _a.ethereum) == null ? void 0 : _b.isFrontier);
  return {
    id: "frontier",
    name: "Frontier Wallet",
    installed: typeof window !== "undefined" && typeof window.frontier !== "undefined" && ((_d = (_c = window == null ? void 0 : window.frontier) == null ? void 0 : _c.ethereum) == null ? void 0 : _d.isFrontier) ? true : void 0,
    iconUrl: async () => (await import("./frontierWallet-3CNZ2ST5.js")).default,
    iconBackground: "#CC703C",
    downloadUrls: {
      android: "https://play.google.com/store/apps/details?id=com.frontierwallet",
      ios: "https://apps.apple.com/us/app/frontier-crypto-defi-wallet/id1482380988",
      qrCode: "https://www.frontier.xyz/download",
      chrome: "https://chrome.google.com/webstore/detail/frontier-wallet/kppfdiipphfccemcignhifpjkapfbihd",
      browserExtension: "https://www.frontier.xyz/download"
    },
    createConnector: () => {
      const shouldUseWalletConnect = !isFrontierInjected;
      const connector = shouldUseWalletConnect ? getWalletConnectConnector({
        chains,
        projectId,
        options: walletConnectOptions,
        version: walletConnectVersion
      }) : new InjectedConnector({ chains });
      const getUri = async () => {
        const uri = await getWalletConnectUri(connector, walletConnectVersion);
        return isAndroid() ? `frontier://wc?uri=${encodeURIComponent(uri)}` : uri;
      };
      return {
        connector: new InjectedConnector({
          chains,
          options: {
            getProvider: () => {
              const getFront = (frontier) => (frontier == null ? void 0 : frontier.ethereum) ? frontier == null ? void 0 : frontier.ethereum : void 0;
              if (typeof window === "undefined")
                return;
              return getFront(window.frontier);
            },
            ...options
          }
        }),
        mobile: {
          getUri: shouldUseWalletConnect ? getUri : void 0
        },
        qrCode: shouldUseWalletConnect ? {
          getUri,
          instructions: {
            learnMoreUrl: "https://help.frontier.xyz/en/",
            steps: [
              {
                description: "We recommend putting Frontier Wallet on your home screen for quicker access.",
                step: "install",
                title: "Open the Frontier Wallet app"
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
            learnMoreUrl: "https://help.frontier.xyz/en/articles/6967236-setting-up-frontier-on-your-device",
            steps: [
              {
                description: "We recommend pinning Frontier Wallet to your taskbar for quicker access to your wallet.",
                step: "install",
                title: "Install the Frontier Wallet extension"
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
  frontierWallet
};
