"use client";
import {
  isAndroid
} from "./chunk-ZOLACFTK.js";
import {
  getWalletConnectConnector,
  getWalletConnectUri
} from "./chunk-IY4T55P4.js";

// src/wallets/walletConnectors/bitgetWallet/bitgetWallet.ts
import { InjectedConnector } from "wagmi/connectors/injected";
var bitgetWallet = ({
  chains,
  projectId,
  walletConnectOptions,
  walletConnectVersion = "2",
  ...options
}) => {
  const isBitKeepInjected = typeof window !== "undefined" && window.bitkeep !== void 0 && window.bitkeep.ethereum !== void 0 && window.bitkeep.ethereum.isBitKeep === true;
  const shouldUseWalletConnect = !isBitKeepInjected;
  return {
    id: "bitGet",
    name: "Bitget Wallet",
    iconUrl: async () => (await import("./bitgetWallet-CKCB4DXG.js")).default,
    iconAccent: "#f6851a",
    iconBackground: "#fff",
    installed: !shouldUseWalletConnect ? isBitKeepInjected : void 0,
    downloadUrls: {
      android: "https://bitkeep.com/en/download?type=2",
      ios: "https://apps.apple.com/app/bitkeep/id1395301115",
      mobile: "https://bitkeep.com/en/download?type=2",
      qrCode: "https://bitkeep.com/en/download",
      chrome: "https://chrome.google.com/webstore/detail/bitkeep-crypto-nft-wallet/jiidiaalihmmhddjgbnbgdfflelocpak",
      browserExtension: "https://bitkeep.com/en/download"
    },
    createConnector: () => {
      const connector = shouldUseWalletConnect ? getWalletConnectConnector({
        chains,
        options: walletConnectOptions,
        projectId,
        version: walletConnectVersion
      }) : new InjectedConnector({
        chains,
        options: {
          getProvider: () => window.bitkeep.ethereum,
          ...options
        }
      });
      const getUri = async () => {
        const uri = await getWalletConnectUri(connector, walletConnectVersion);
        return isAndroid() ? uri : `bitkeep://wc?uri=${encodeURIComponent(uri)}`;
      };
      return {
        connector,
        extension: {
          instructions: {
            learnMoreUrl: "https://study.bitkeep.com",
            steps: [
              {
                description: "We recommend pinning BitKeep to your taskbar for quicker access to your wallet.",
                step: "install",
                title: "Install the BitKeep extension"
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
        },
        mobile: {
          getUri: shouldUseWalletConnect ? getUri : void 0
        },
        qrCode: shouldUseWalletConnect ? {
          getUri: async () => getWalletConnectUri(connector, walletConnectVersion),
          instructions: {
            learnMoreUrl: "https://study.bitkeep.com",
            steps: [
              {
                description: "We recommend putting BitKeep on your home screen for quicker access.",
                step: "install",
                title: "Open the BitKeep app"
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
        } : void 0
      };
    }
  };
};

export {
  bitgetWallet
};
