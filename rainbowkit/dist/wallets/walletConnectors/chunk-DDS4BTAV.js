"use client";
import {
  getWalletConnectConnector,
  getWalletConnectUri
} from "./chunk-IY4T55P4.js";

// src/wallets/walletConnectors/coin98Wallet/coin98Wallet.ts
import { InjectedConnector } from "wagmi/connectors/injected";
function getCoin98WalletInjectedProvider() {
  var _a;
  const isCoin98Wallet = (ethereum) => {
    const coin98Wallet2 = !!ethereum.isCoin98;
    return coin98Wallet2;
  };
  const injectedProviderExist = typeof window !== "undefined" && typeof window.ethereum !== "undefined";
  if (!injectedProviderExist) {
    return;
  }
  if (window["coin98Wallet"]) {
    return window["coin98Wallet"];
  }
  if (isCoin98Wallet(window.ethereum)) {
    return window.ethereum;
  }
  if ((_a = window.ethereum) == null ? void 0 : _a.providers) {
    return window.ethereum.providers.find(isCoin98Wallet);
  }
}
var coin98Wallet = ({
  chains,
  projectId,
  walletConnectOptions,
  walletConnectVersion = "2",
  ...options
}) => {
  const isCoin98WalletInjected = Boolean(getCoin98WalletInjectedProvider());
  const shouldUseWalletConnect = !isCoin98WalletInjected;
  return {
    id: "coin98",
    name: "Coin98 Wallet",
    iconUrl: async () => (await import("./coin98Wallet-7Q4WNBWR.js")).default,
    installed: !shouldUseWalletConnect ? isCoin98WalletInjected : void 0,
    iconAccent: "#CDA349",
    iconBackground: "#fff",
    downloadUrls: {
      android: "https://play.google.com/store/apps/details?id=coin98.crypto.finance.media",
      ios: "https://apps.apple.com/vn/app/coin98-super-app/id1561969966",
      mobile: "https://coin98.com/wallet",
      qrCode: "https://coin98.com/wallet",
      chrome: "https://chrome.google.com/webstore/detail/coin98-wallet/aeachknmefphepccionboohckonoeemg",
      browserExtension: "https://coin98.com/wallet"
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
          name: "Coin98 Wallet",
          getProvider: getCoin98WalletInjectedProvider,
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
            learnMoreUrl: "https://coin98.com/wallet",
            steps: [
              {
                description: "We recommend putting Coin98 Wallet on your home screen for faster access to your wallet.",
                step: "install",
                title: "Open the Coin98 Wallet app"
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
            learnMoreUrl: "https://coin98.com/wallet",
            steps: [
              {
                description: "Click at the top right of your browser and pin Coin98 Wallet for easy access.",
                step: "install",
                title: "Install the Coin98 Wallet extension"
              },
              {
                description: "Create a new wallet or import an existing one.",
                step: "create",
                title: "Create or Import a wallet"
              },
              {
                description: "Once you set up Coin98 Wallet, click below to refresh the browser and load up the extension.",
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
  coin98Wallet
};
