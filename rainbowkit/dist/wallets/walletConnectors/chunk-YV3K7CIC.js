"use client";
import {
  getWalletConnectConnector,
  getWalletConnectUri
} from "./chunk-IY4T55P4.js";
import {
  isAndroid,
  isIOS
} from "./chunk-ZOLACFTK.js";

// src/wallets/getInjectedConnector.ts
import { InjectedConnector } from "wagmi/connectors/injected";
function getExplicitInjectedProvider(flag) {
  if (typeof window === "undefined" || typeof window.ethereum === "undefined")
    return;
  const providers = window.ethereum.providers;
  return providers ? providers.find((provider) => provider[flag]) : window.ethereum[flag] ? window.ethereum : void 0;
}
function hasInjectedProvider(flag) {
  return Boolean(getExplicitInjectedProvider(flag));
}
function getInjectedProvider(flag) {
  if (typeof window === "undefined" || typeof window.ethereum === "undefined")
    return;
  const providers = window.ethereum.providers;
  const provider = getExplicitInjectedProvider(flag);
  if (provider)
    return provider;
  else if (typeof providers !== "undefined" && providers.length > 0)
    return providers[0];
  else
    return window.ethereum;
}
function getInjectedConnector({
  chains,
  flag,
  options
}) {
  return new InjectedConnector({
    chains,
    options: {
      getProvider: () => getInjectedProvider(flag),
      ...options
    }
  });
}

// src/wallets/walletConnectors/rainbowWallet/rainbowWallet.ts
var rainbowWallet = ({
  chains,
  projectId,
  walletConnectOptions,
  walletConnectVersion = "2",
  ...options
}) => {
  const isRainbowInjected = hasInjectedProvider("isRainbow");
  const shouldUseWalletConnect = !isRainbowInjected;
  return {
    id: "rainbow",
    name: "Rainbow",
    iconUrl: async () => (await import("./rainbowWallet-GGU64QEI.js")).default,
    iconBackground: "#0c2f78",
    installed: !shouldUseWalletConnect ? isRainbowInjected : void 0,
    downloadUrls: {
      android: "https://play.google.com/store/apps/details?id=me.rainbow&referrer=utm_source%3Drainbowkit&utm_source=rainbowkit",
      ios: "https://apps.apple.com/app/apple-store/id1457119021?pt=119997837&ct=rainbowkit&mt=8",
      mobile: "https://rainbow.download?utm_source=rainbowkit",
      qrCode: "https://rainbow.download?utm_source=rainbowkit&utm_medium=qrcode",
      browserExtension: "https://rainbow.me/extension?utm_source=rainbowkit"
    },
    createConnector: () => {
      const connector = shouldUseWalletConnect ? getWalletConnectConnector({
        projectId,
        chains,
        version: walletConnectVersion,
        options: walletConnectOptions
      }) : getInjectedConnector({ flag: "isRainbow", chains, options });
      const getUri = async () => {
        const uri = await getWalletConnectUri(connector, walletConnectVersion);
        return isAndroid() ? uri : isIOS() ? `rainbow://wc?uri=${encodeURIComponent(uri)}&connector=rainbowkit` : `https://rnbwapp.com/wc?uri=${encodeURIComponent(uri)}&connector=rainbowkit`;
      };
      return {
        connector,
        mobile: { getUri: shouldUseWalletConnect ? getUri : void 0 },
        qrCode: shouldUseWalletConnect ? {
          getUri,
          instructions: {
            learnMoreUrl: "https://learn.rainbow.me/connect-to-a-website-or-app?utm_source=rainbowkit&utm_medium=connector&utm_campaign=learnmore",
            steps: [
              {
                description: "We recommend putting Rainbow on your home screen for faster access to your wallet.",
                step: "install",
                title: "Open the Rainbow app"
              },
              {
                description: "You can easily backup your wallet using our backup feature on your phone.",
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
  rainbowWallet
};
