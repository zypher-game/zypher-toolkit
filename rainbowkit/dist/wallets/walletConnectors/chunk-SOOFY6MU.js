"use client";
import {
  getWalletConnectConnector,
  getWalletConnectUri
} from "./chunk-IY4T55P4.js";
import {
  isAndroid,
  isIOS
} from "./chunk-ZOLACFTK.js";

// src/wallets/walletConnectors/metaMaskWallet/metaMaskWallet.ts
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
function isMetaMask(ethereum) {
  if (!(ethereum == null ? void 0 : ethereum.isMetaMask)) {
    return false;
  }
  if (ethereum.isBraveWallet && !ethereum._events && !ethereum._state) {
    return false;
  }
  if (ethereum.isApexWallet) {
    return false;
  }
  if (ethereum.isAvalanche) {
    return false;
  }
  if (ethereum.isBackpack) {
    return false;
  }
  if (ethereum.isBifrost) {
    return false;
  }
  if (ethereum.isBitKeep) {
    return false;
  }
  if (ethereum.isBitski) {
    return false;
  }
  if (ethereum.isBlockWallet) {
    return false;
  }
  if (ethereum.isCoinbaseWallet) {
    return false;
  }
  if (ethereum.isDawn) {
    return false;
  }
  if (ethereum.isEnkrypt) {
    return false;
  }
  if (ethereum.isExodus) {
    return false;
  }
  if (ethereum.isFrame) {
    return false;
  }
  if (ethereum.isFrontier) {
    return false;
  }
  if (ethereum.isGamestop) {
    return false;
  }
  if (ethereum.isHyperPay) {
    return false;
  }
  if (ethereum.isImToken) {
    return false;
  }
  if (ethereum.isKuCoinWallet) {
    return false;
  }
  if (ethereum.isMathWallet) {
    return false;
  }
  if (ethereum.isOkxWallet || ethereum.isOKExWallet) {
    return false;
  }
  if (ethereum.isOneInchIOSWallet || ethereum.isOneInchAndroidWallet) {
    return false;
  }
  if (ethereum.isOpera) {
    return false;
  }
  if (ethereum.isPhantom) {
    return false;
  }
  if (ethereum.isPortal) {
    return false;
  }
  if (ethereum.isRabby) {
    return false;
  }
  if (ethereum.isRainbow) {
    return false;
  }
  if (ethereum.isStatus) {
    return false;
  }
  if (ethereum.isTalisman) {
    return false;
  }
  if (ethereum.isTally) {
    return false;
  }
  if (ethereum.isTokenPocket) {
    return false;
  }
  if (ethereum.isTokenary) {
    return false;
  }
  if (ethereum.isTrust || ethereum.isTrustWallet) {
    return false;
  }
  if (ethereum.isXDEFI) {
    return false;
  }
  if (ethereum.isZerion) {
    return false;
  }
  return true;
}
var metaMaskWallet = ({
  chains,
  projectId,
  walletConnectOptions,
  walletConnectVersion = "2",
  ...options
}) => {
  var _a, _b;
  const providers = typeof window !== "undefined" && ((_a = window.ethereum) == null ? void 0 : _a.providers);
  const isMetaMaskInjected = typeof window !== "undefined" && typeof window.ethereum !== "undefined" && (((_b = window.ethereum.providers) == null ? void 0 : _b.some(isMetaMask)) || window.ethereum.isMetaMask);
  const shouldUseWalletConnect = !isMetaMaskInjected;
  return {
    id: "metaMask",
    name: "MetaMask",
    iconUrl: async () => (await import("./matemask-HFEUF2XF.js")).default,
    iconAccent: "#f6851a",
    iconBackground: "transparent",
    installed: !shouldUseWalletConnect ? isMetaMaskInjected : void 0,
    downloadUrls: {
      android: "https://play.google.com/store/apps/details?id=io.metamask",
      ios: "https://apps.apple.com/us/app/metamask/id1438144202",
      mobile: "https://metamask.io/download",
      qrCode: "https://metamask.io/download",
      chrome: "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn",
      edge: "https://microsoftedge.microsoft.com/addons/detail/metamask/ejbalbakoplchlghecdalmeeeajnimhm",
      firefox: "https://addons.mozilla.org/firefox/addon/ether-metamask",
      opera: "https://addons.opera.com/extensions/details/metamask-10",
      browserExtension: "https://metamask.io/download"
    },
    createConnector: () => {
      const connector = shouldUseWalletConnect ? getWalletConnectConnector({
        projectId,
        chains,
        version: walletConnectVersion,
        options: walletConnectOptions
      }) : new MetaMaskConnector({
        chains,
        options: {
          getProvider: () => providers ? providers.find(isMetaMask) : typeof window !== "undefined" ? window.ethereum : void 0,
          ...options
        }
      });
      const getUri = async () => {
        const uri = await getWalletConnectUri(connector, walletConnectVersion);
        return isAndroid() ? uri : isIOS() ? `metamask://wc?uri=${encodeURIComponent(uri)}` : `https://metamask.app.link/wc?uri=${encodeURIComponent(uri)}`;
      };
      return {
        connector,
        mobile: {
          getUri: shouldUseWalletConnect ? getUri : void 0
        },
        qrCode: shouldUseWalletConnect ? {
          getUri,
          instructions: {
            learnMoreUrl: "https://metamask.io/faqs/",
            steps: [
              {
                description: "We recommend putting MetaMask on your home screen for quicker access.",
                step: "install",
                title: "Open the MetaMask app"
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
            learnMoreUrl: "https://metamask.io/faqs/",
            steps: [
              {
                description: "We recommend pinning MetaMask to your taskbar for quicker access to your wallet.",
                step: "install",
                title: "Install the MetaMask extension"
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
  metaMaskWallet
};
