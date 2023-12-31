"use client";
import {
  getWalletConnectConnector,
  getWalletConnectUri
} from "./chunk-IY4T55P4.js";

// src/wallets/walletConnectors/imTokenWallet/imTokenWallet.ts
var imTokenWallet = ({
  chains,
  projectId,
  walletConnectOptions,
  walletConnectVersion = "2"
}) => ({
  id: "imToken",
  name: "imToken",
  iconUrl: async () => (await import("./imTokenWallet-DMDOIZDQ.js")).default,
  iconBackground: "#098de6",
  downloadUrls: {
    android: "https://play.google.com/store/apps/details?id=im.token.app",
    ios: "https://itunes.apple.com/us/app/imtoken2/id1384798940",
    mobile: "https://token.im/download",
    qrCode: "https://token.im/download"
  },
  createConnector: () => {
    const connector = getWalletConnectConnector({
      projectId,
      chains,
      version: walletConnectVersion,
      options: walletConnectOptions
    });
    return {
      connector,
      mobile: {
        getUri: async () => {
          const uri = await getWalletConnectUri(
            connector,
            walletConnectVersion
          );
          return `imtokenv2://wc?uri=${encodeURIComponent(uri)}`;
        }
      },
      qrCode: {
        getUri: async () => getWalletConnectUri(connector, walletConnectVersion),
        instructions: {
          learnMoreUrl: typeof window !== "undefined" && window.navigator.language.includes("zh") ? "https://support.token.im/hc/zh-cn/categories/360000925393" : "https://support.token.im/hc/en-us/categories/360000925393",
          steps: [
            {
              description: "Put imToken app on your home screen for faster access to your wallet.",
              step: "install",
              title: "Open the imToken app"
            },
            {
              description: "Create a new wallet or import an existing one.",
              step: "create",
              title: "Create or Import a Wallet"
            },
            {
              description: "Choose New Connection, then scan the QR code and confirm the prompt to connect.",
              step: "scan",
              title: "Tap Scanner Icon in top right corner"
            }
          ]
        }
      }
    };
  }
});

export {
  imTokenWallet
};
