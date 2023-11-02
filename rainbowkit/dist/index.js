"use client";
import {
  darkTheme
} from "./chunk-YV6YBPXO.js";
import {
  midnightTheme
} from "./chunk-KWMHQFSF.js";
import {
  ConnectButton,
  DesktopOptions,
  MobileOptions,
  RainbowKitAuthenticationProvider,
  RainbowKitProvider,
  createAuthenticationAdapter,
  cssObjectFromTheme,
  cssStringFromTheme,
  dialogContent,
  dialogContentMobile,
  isAndroid,
  isHexString,
  isIOS,
  isMobile,
  useAccountModal,
  useAsyncImage,
  useChainId,
  useChainModal,
  useConnectModal,
  useTransactionStore,
  useWalletConnectors
} from "./chunk-RLICKRG3.js";
import {
  lightTheme
} from "./chunk-DAGN7GXN.js";
import "./chunk-SWKUKXRF.js";

// src/__private__/index.ts
var __private__ = {
  DesktopOptions,
  dialogContent,
  dialogContentMobile,
  MobileOptions
};

// src/transactions/useAddRecentTransaction.ts
import { useCallback } from "react";
import { useAccount } from "wagmi";
function useAddRecentTransaction() {
  const store = useTransactionStore();
  const { address } = useAccount();
  const chainId = useChainId();
  return useCallback(
    (transaction) => {
      if (!address || !chainId) {
        throw new Error("No address or chain ID found");
      }
      store.addTransaction(address, chainId, transaction);
    },
    [store, address, chainId]
  );
}

// src/wallets/connectorsForWallets.ts
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

// src/utils/omitUndefinedValues.ts
function omitUndefinedValues(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_key, value]) => value !== void 0)
  );
}

// src/wallets/connectorsForWallets.ts
var connectorsForWallets = (walletList) => {
  return () => {
    let index = -1;
    const connectors = [];
    const visibleWallets = [];
    const potentiallyHiddenWallets = [];
    const walletInstances = [];
    walletList.forEach(({ groupName, wallets }, groupIndex) => {
      wallets.forEach((wallet) => {
        index++;
        if ((wallet == null ? void 0 : wallet.iconAccent) && !isHexString(wallet == null ? void 0 : wallet.iconAccent)) {
          throw new Error(`Property \`iconAccent\` is not a hex value for wallet: ${wallet.name}`);
        }
        const walletListItem = {
          ...wallet,
          groupIndex,
          groupName,
          index
        };
        if (typeof wallet.hidden === "function") {
          potentiallyHiddenWallets.push(walletListItem);
        } else {
          visibleWallets.push(walletListItem);
        }
      });
    });
    const walletListItems = [...visibleWallets, ...potentiallyHiddenWallets];
    walletListItems.forEach(({ createConnector: createConnector2, groupIndex, groupName, hidden, index: index2, ...walletMeta }) => {
      if (typeof hidden === "function") {
        const isHidden = hidden({
          wallets: [
            ...walletInstances.map(({ connector: connector2, id, installed, name }) => ({
              connector: connector2,
              id,
              installed,
              name
            }))
          ]
        });
        if (isHidden) {
          return;
        }
      }
      const { connector, ...connectionMethods } = omitUndefinedValues(createConnector2());
      let walletConnectModalConnector;
      if (walletMeta.id === "walletConnect" && connectionMethods.qrCode && !isMobile()) {
        const { chains, options } = connector;
        walletConnectModalConnector = new WalletConnectConnector({
          chains,
          options: {
            ...options,
            showQrModal: true
          }
        });
        connectors.push(walletConnectModalConnector);
      }
      const walletInstance = {
        connector,
        groupIndex,
        groupName,
        index: index2,
        walletConnectModalConnector,
        ...walletMeta,
        ...connectionMethods
      };
      walletInstances.push(walletInstance);
      if (!connectors.includes(connector)) {
        connectors.push(connector);
        connector._wallets = [];
      }
      connector._wallets.push(walletInstance);
    });
    return connectors;
  };
};

// src/wallets/walletConnectors/braveWallet/braveWallet.ts
import { InjectedConnector } from "wagmi/connectors/injected";
var braveWallet = ({
  chains,
  ...options
}) => {
  var _a;
  return {
    id: "brave",
    name: "Brave Wallet",
    iconUrl: async () => (await import("./braveWallet-BTBH4MDN.js")).default,
    iconBackground: "#fff",
    installed: typeof window !== "undefined" && ((_a = window.ethereum) == null ? void 0 : _a.isBraveWallet) === true,
    downloadUrls: {},
    createConnector: () => ({
      connector: new InjectedConnector({
        chains,
        options
      })
    })
  };
};

// src/wallets/walletConnectors/coinbaseWallet/coinbaseWallet.ts
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
var coinbaseWallet = ({
  appName,
  chains,
  ...options
}) => {
  var _a;
  const isCoinbaseWalletInjected = typeof window !== "undefined" && ((_a = window.ethereum) == null ? void 0 : _a.isCoinbaseWallet) === true;
  return {
    id: "coinbase",
    name: "Coinbase Wallet",
    shortName: "Coinbase",
    iconUrl: async () => (await import("./coinbaseWallet-2OUR5TUP.js")).default,
    iconAccent: "#2c5ff6",
    iconBackground: "#2c5ff6",
    installed: isCoinbaseWalletInjected || void 0,
    downloadUrls: {
      android: "https://play.google.com/store/apps/details?id=org.toshi",
      ios: "https://apps.apple.com/us/app/coinbase-wallet-store-crypto/id1278383455",
      mobile: "https://coinbase.com/wallet/downloads",
      qrCode: "https://coinbase-wallet.onelink.me/q5Sx/fdb9b250",
      chrome: "https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad",
      browserExtension: "https://coinbase.com/wallet"
    },
    createConnector: () => {
      const ios = isIOS();
      const connector = new CoinbaseWalletConnector({
        chains,
        options: {
          appName,
          headlessMode: true,
          ...options
        }
      });
      const getUri = async () => (await connector.getProvider()).qrUrl;
      return {
        connector,
        ...ios ? {} : {
          qrCode: {
            getUri,
            instructions: {
              learnMoreUrl: "https://coinbase.com/wallet/articles/getting-started-mobile",
              steps: [
                {
                  description: "We recommend putting Coinbase Wallet on your home screen for quicker access.",
                  step: "install",
                  title: "Open the Coinbase Wallet app"
                },
                {
                  description: "You can easily backup your wallet using the cloud backup feature.",
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
          },
          extension: {
            instructions: {
              learnMoreUrl: "https://coinbase.com/wallet/articles/getting-started-extension",
              steps: [
                {
                  description: "We recommend pinning Coinbase Wallet to your taskbar for quicker access to your wallet.",
                  step: "install",
                  title: "Install the Coinbase Wallet extension"
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
        }
      };
    }
  };
};

// src/wallets/walletConnectors/injectedWallet/injectedWallet.ts
import { InjectedConnector as InjectedConnector2 } from "wagmi/connectors/injected";
var injectedWallet = ({
  chains,
  ...options
}) => ({
  id: "injected",
  name: "Browser Wallet",
  iconUrl: async () => (await import("./injectedWallet-EUKDEAIU.js")).default,
  iconBackground: "#fff",
  hidden: ({ wallets }) => wallets.some(
    (wallet) => wallet.installed && wallet.name === wallet.connector.name && (wallet.connector instanceof InjectedConnector2 || wallet.id === "coinbase")
  ),
  createConnector: () => ({
    connector: new InjectedConnector2({
      chains,
      options
    })
  })
});

// src/wallets/walletConnectors/metaMaskWallet/metaMaskWallet.ts
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

// src/utils/getWalletConnectUri.ts
async function getWalletConnectUri(connector, version) {
  const provider = await connector.getProvider();
  return version === "2" ? new Promise((resolve) => provider.once("display_uri", resolve)) : provider.connector.uri;
}

// src/wallets/getWalletConnectConnector.ts
import { WalletConnectConnector as WalletConnectConnector2 } from "wagmi/connectors/walletConnect";
import { WalletConnectLegacyConnector } from "wagmi/connectors/walletConnectLegacy";
var sharedConnectors = /* @__PURE__ */ new Map();
function createConnector(version, config) {
  const connector = version === "1" ? new WalletConnectLegacyConnector(config) : new WalletConnectConnector2(config);
  sharedConnectors.set(JSON.stringify(config), connector);
  return connector;
}
function getWalletConnectConnector({
  chains,
  options = {},
  projectId,
  version = "2"
}) {
  const exampleProjectId = "21fef48091f12692cad574a6f7753643";
  if (version === "2") {
    if (!projectId || projectId === "") {
      throw new Error(
        "No projectId found. Every dApp must now provide a WalletConnect Cloud projectId to enable WalletConnect v2 https://www.rainbowkit.com/docs/installation#configure"
      );
    } else if (projectId === "YOUR_PROJECT_ID" || projectId === exampleProjectId) {
      console.warn(
        "Invalid projectId. Please create a unique WalletConnect Cloud projectId for your dApp https://www.rainbowkit.com/docs/installation#configure"
      );
    }
  }
  const config = {
    chains,
    options: version === "1" ? {
      qrcode: false,
      ...options
    } : {
      projectId: projectId === "YOUR_PROJECT_ID" ? exampleProjectId : projectId,
      showQrModal: false,
      ...options
    }
  };
  const serializedConfig = JSON.stringify(config);
  const sharedConnector = sharedConnectors.get(serializedConfig);
  return sharedConnector != null ? sharedConnector : createConnector(version, config);
}

// src/wallets/walletConnectors/metaMaskWallet/metaMaskWallet.ts
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

// src/wallets/getInjectedConnector.ts
import { InjectedConnector as InjectedConnector3 } from "wagmi/connectors/injected";
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
  return new InjectedConnector3({
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

// src/wallets/walletConnectors/safeWallet/safeWallet.ts
import { SafeConnector } from "wagmi/connectors/safe";
var safeWallet = ({
  chains,
  ...options
}) => ({
  id: "safe",
  name: "Safe",
  iconAccent: "#12ff80",
  iconBackground: "#fff",
  iconUrl: async () => (await import("./safeWallet-DFMLSLCR.js")).default,
  installed: !(typeof window === "undefined") && (window == null ? void 0 : window.parent) !== window,
  downloadUrls: {},
  createConnector: () => ({
    connector: new SafeConnector({ chains, options })
  })
});

// src/wallets/walletConnectors/walletConnectWallet/walletConnectWallet.ts
var walletConnectWallet = ({
  chains,
  options,
  projectId,
  version = "2"
}) => ({
  id: "walletConnect",
  name: "WalletConnect",
  iconUrl: async () => (await import("./walletConnectWallet-D6ZADJM7.js")).default,
  iconBackground: "#3b99fc",
  createConnector: () => {
    const ios = isIOS();
    const connector = version === "1" ? getWalletConnectConnector({
      version: "1",
      chains,
      options: {
        qrcode: ios,
        ...options
      }
    }) : getWalletConnectConnector({
      version: "2",
      chains,
      projectId,
      options: {
        showQrModal: ios,
        ...options
      }
    });
    const getUri = async () => getWalletConnectUri(connector, version);
    return {
      connector,
      ...ios ? {} : {
        mobile: { getUri },
        qrCode: { getUri }
      }
    };
  }
});

// src/wallets/getDefaultWallets.ts
var getDefaultWallets = ({
  appName,
  chains,
  projectId
}) => {
  const wallets = [
    {
      groupName: "Popular",
      wallets: [
        injectedWallet({ chains }),
        safeWallet({ chains }),
        rainbowWallet({ chains, projectId }),
        coinbaseWallet({ appName, chains }),
        metaMaskWallet({ chains, projectId }),
        walletConnectWallet({ chains, projectId }),
        braveWallet({ chains })
      ]
    }
  ];
  return {
    connectors: connectorsForWallets(wallets),
    wallets
  };
};
export {
  ConnectButton,
  RainbowKitAuthenticationProvider,
  RainbowKitProvider,
  __private__,
  connectorsForWallets,
  createAuthenticationAdapter,
  cssObjectFromTheme,
  cssStringFromTheme,
  darkTheme,
  getDefaultWallets,
  getWalletConnectConnector,
  lightTheme,
  midnightTheme,
  useAccountModal,
  useAddRecentTransaction,
  useAsyncImage,
  useChainId,
  useChainModal,
  useConnectModal,
  useWalletConnectors
};
