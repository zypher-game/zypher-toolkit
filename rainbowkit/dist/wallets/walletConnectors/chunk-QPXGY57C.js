"use client";
import {
  getWalletConnectConnector,
  getWalletConnectUri
} from "./chunk-IY4T55P4.js";
import {
  isAndroid
} from "./chunk-ZOLACFTK.js";

// src/wallets/walletConnectors/bifrostWallet/bifrostWallet.ts
import { InjectedConnector } from "wagmi/connectors/injected";
var bifrostWallet = ({
  chains,
  projectId,
  walletConnectOptions,
  walletConnectVersion = "2",
  ...options
}) => {
  const isBifrostInjected = typeof window !== "undefined" && typeof window.ethereum !== "undefined" && window.ethereum.isBifrost;
  const shouldUseWalletConnect = !isBifrostInjected;
  return {
    id: "bifrostWallet",
    name: "Bifrost Wallet",
    iconUrl: async () => (await import("./bifrostWallet-5VPKXMCJ.js")).default,
    iconBackground: "#fff",
    installed: !shouldUseWalletConnect ? isBifrostInjected : void 0,
    downloadUrls: {
      android: "https://play.google.com/store/apps/details?id=com.bifrostwallet.app",
      ios: "https://apps.apple.com/us/app/bifrost-wallet/id1577198351",
      qrCode: "https://bifrostwallet.com/#download-app"
    },
    createConnector: () => {
      const connector = shouldUseWalletConnect ? getWalletConnectConnector({
        chains,
        projectId,
        options: walletConnectOptions,
        version: walletConnectVersion
      }) : new InjectedConnector({
        chains,
        options
      });
      const getUri = async () => {
        const uri = await getWalletConnectUri(connector, walletConnectVersion);
        return isAndroid() ? uri : `https://app.bifrostwallet.com/wc?uri=${encodeURIComponent(uri)}`;
      };
      return {
        connector,
        mobile: {
          getUri: shouldUseWalletConnect ? getUri : void 0
        },
        qrCode: shouldUseWalletConnect ? {
          getUri: async () => getWalletConnectUri(connector, walletConnectVersion),
          instructions: {
            learnMoreUrl: "https://support.bifrostwallet.com/en/articles/6886814-how-to-use-walletconnect",
            steps: [
              {
                description: "We recommend putting Bifrost Wallet on your home screen for quicker access.",
                step: "install",
                title: "Open the Bifrost Wallet app"
              },
              {
                description: "Create or import a wallet using your recovery phrase.",
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
        } : void 0
      };
    }
  };
};

export {
  bifrostWallet
};
