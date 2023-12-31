"use client";
import {
  getWalletConnectConnector,
  getWalletConnectUri
} from "./chunk-IY4T55P4.js";

// src/wallets/walletConnectors/foxWallet/foxWallet.ts
import { InjectedConnector } from "wagmi/connectors/injected";
var foxWallet = ({
  chains,
  projectId,
  walletConnectOptions,
  walletConnectVersion = "2",
  ...options
}) => {
  const isFoxInjected = typeof window !== "undefined" && typeof window.foxwallet !== "undefined";
  const shouldUseWalletConnect = !isFoxInjected;
  return {
    id: "foxwallet",
    name: "FoxWallet",
    iconUrl: async () => (await import("./foxWallet-RFPGZZOK.js")).default,
    iconBackground: "#fff",
    downloadUrls: {
      android: "https://play.google.com/store/apps/details?id=com.foxwallet.play",
      ios: "https://apps.apple.com/app/foxwallet-crypto-web3/id1590983231",
      qrCode: "https://foxwallet.com/download"
    },
    createConnector: () => {
      const connector = shouldUseWalletConnect ? getWalletConnectConnector({
        projectId,
        chains,
        version: walletConnectVersion,
        options: walletConnectOptions
      }) : new InjectedConnector({
        chains,
        options: {
          getProvider: () => window.foxwallet.ethereum,
          ...options
        }
      });
      return {
        connector,
        mobile: {
          getUri: shouldUseWalletConnect ? async () => {
            const uri = await getWalletConnectUri(
              connector,
              walletConnectVersion
            );
            return `foxwallet://wc?uri=${encodeURIComponent(uri)}`;
          } : void 0
        },
        qrCode: shouldUseWalletConnect ? {
          getUri: async () => getWalletConnectUri(connector, walletConnectVersion),
          instructions: {
            learnMoreUrl: "https://foxwallet.com",
            steps: [
              {
                description: "We recommend putting FoxWallet on your home screen for quicker access.",
                step: "install",
                title: "Open the FoxWallet app"
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
  foxWallet
};
