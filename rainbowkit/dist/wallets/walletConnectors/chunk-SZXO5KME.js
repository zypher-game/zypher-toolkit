"use client";
import {
  getWalletConnectConnector,
  getWalletConnectUri
} from "./chunk-IY4T55P4.js";

// src/wallets/walletConnectors/coreWallet/coreWallet.ts
import { InjectedConnector } from "wagmi/connectors/injected";
function getCoreWalletInjectedProvider() {
  var _a, _b;
  const injectedProviderExist = typeof window !== "undefined" && typeof window.ethereum !== "undefined";
  if (!injectedProviderExist) {
    return;
  }
  if ((_a = window["evmproviders"]) == null ? void 0 : _a["core"]) {
    return (_b = window["evmproviders"]) == null ? void 0 : _b["core"];
  }
  if (window.avalanche) {
    return window.avalanche;
  }
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined" && window.ethereum.isAvalanche === true) {
    return window.ethereum;
  }
}
var coreWallet = ({
  chains,
  projectId,
  walletConnectOptions,
  walletConnectVersion = "2",
  ...options
}) => {
  const isCoreInjected = Boolean(getCoreWalletInjectedProvider());
  const shouldUseWalletConnect = !isCoreInjected;
  return {
    id: "core",
    name: "Core",
    iconUrl: async () => (await import("./coreWallet-HRVLR2XS.js")).default,
    iconBackground: "#1A1A1C",
    installed: !shouldUseWalletConnect ? isCoreInjected : void 0,
    downloadUrls: {
      android: "https://play.google.com/store/apps/details?id=com.avaxwallet",
      ios: "https://apps.apple.com/us/app/core-wallet/id6443685999",
      mobile: "https://core.app/?downloadCoreMobile=1",
      qrCode: "https://core.app/?downloadCoreMobile=1",
      chrome: "https://chrome.google.com/webstore/detail/core-crypto-wallet-nft-ex/agoakfejjabomempkjlepdflaleeobhb",
      browserExtension: "https://extension.core.app/"
    },
    createConnector: () => {
      const connector = shouldUseWalletConnect ? getWalletConnectConnector({
        projectId,
        chains,
        options: walletConnectOptions,
        version: walletConnectVersion
      }) : new InjectedConnector({
        chains,
        options: {
          getProvider: getCoreWalletInjectedProvider,
          ...options
        }
      });
      const getUri = async () => {
        const uri = await getWalletConnectUri(connector, walletConnectVersion);
        return uri;
      };
      return {
        connector,
        mobile: { getUri: shouldUseWalletConnect ? getUri : void 0 },
        qrCode: shouldUseWalletConnect ? {
          getUri,
          instructions: {
            learnMoreUrl: "https://support.avax.network/en/articles/6115608-core-mobile-how-to-add-the-core-mobile-to-my-phone",
            steps: [
              {
                description: "We recommend putting Core on your home screen for faster access to your wallet.",
                step: "install",
                title: "Open the Core app"
              },
              {
                description: "You can easily backup your wallet using our backup feature on your phone.",
                step: "create",
                title: "Create or Import a Wallet"
              },
              {
                description: "After you scan, a connection prompt will appear for you to connect your wallet.",
                step: "scan",
                title: "Tap the WalletConnect button"
              }
            ]
          }
        } : void 0,
        extension: {
          instructions: {
            learnMoreUrl: "https://extension.core.app/",
            steps: [
              {
                description: "We recommend pinning Core to your taskbar for quicker access to your wallet.",
                step: "install",
                title: "Install the Core extension"
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
  coreWallet
};
