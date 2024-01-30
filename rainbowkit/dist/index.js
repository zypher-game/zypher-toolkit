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
} from "./chunk-CHJ2R7KR.js";
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

// src/wallets/walletConnectors/argentWallet/argentWallet.ts
var argentWallet = ({
  chains,
  projectId,
  walletConnectOptions,
  walletConnectVersion = "2"
}) => ({
  id: "argent",
  name: "Argent",
  iconUrl: async () => (await import("./argentWallet-5OEFC7BD.js")).default,
  iconBackground: "#fff",
  downloadUrls: {
    android: "https://play.google.com/store/apps/details?id=im.argent.contractwalletclient",
    ios: "https://apps.apple.com/us/app/argent/id1358741926",
    mobile: "https://argent.xyz/download-argent",
    qrCode: "https://argent.link/app"
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
          return isAndroid() ? uri : `argent://app/wc?uri=${encodeURIComponent(uri)}`;
        }
      },
      qrCode: {
        getUri: async () => getWalletConnectUri(connector, walletConnectVersion),
        instructions: {
          learnMoreUrl: "https://argent.xyz/learn/what-is-a-crypto-wallet/",
          steps: [
            {
              description: "Put Argent on your home screen for faster access to your wallet.",
              step: "install",
              title: "Open the Argent app"
            },
            {
              description: "Create a wallet and username, or import an existing wallet.",
              step: "create",
              title: "Create or Import a Wallet"
            },
            {
              description: "After you scan, a connection prompt will appear for you to connect your wallet.",
              step: "scan",
              title: "Tap the Scan QR button"
            }
          ]
        }
      }
    };
  }
});

// src/wallets/walletConnectors/bifrostWallet/bifrostWallet.ts
import { InjectedConnector as InjectedConnector4 } from "wagmi/connectors/injected";
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
      }) : new InjectedConnector4({
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

// src/wallets/walletConnectors/bitgetWallet/bitgetWallet.ts
import { InjectedConnector as InjectedConnector5 } from "wagmi/connectors/injected";
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
      }) : new InjectedConnector5({
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

// src/wallets/walletConnectors/bitKeepWallet/bitKeepWallet.ts
import { InjectedConnector as InjectedConnector6 } from "wagmi/connectors/injected";
var bitKeepWallet = ({
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
    name: "BitGet",
    iconUrl: async () => (await import("./bitgetWallet-4U4ZQY2I.js")).default,
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
      }) : new InjectedConnector6({
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

// src/wallets/walletConnectors/bitskiWallet/bitskiWallet.ts
import { InjectedConnector as InjectedConnector7 } from "wagmi/connectors/injected";
var bitskiWallet = ({ chains, ...options }) => {
  var _a;
  return {
    id: "bitski",
    name: "Bitski",
    installed: typeof window !== "undefined" && typeof window.ethereum !== "undefined" && (window.ethereum.isBitski === true || !!((_a = window.ethereum.providers) == null ? void 0 : _a.find((p) => p.isBitski === true))),
    iconUrl: async () => (await import("./bitskiWallet-Y4QTLQPQ.js")).default,
    iconBackground: "#fff",
    downloadUrls: {
      chrome: "https://chrome.google.com/webstore/detail/bitski/feejiigddaafeojfddjjlmfkabimkell",
      browserExtension: "https://bitski.com"
    },
    createConnector: () => ({
      connector: new InjectedConnector7({
        chains,
        options
      }),
      extension: {
        instructions: {
          learnMoreUrl: "https://bitski.zendesk.com/hc/articles/12803972818836-How-to-install-the-Bitski-browser-extension",
          steps: [
            {
              description: "We recommend pinning Bitski to your taskbar for quicker access to your wallet.",
              step: "install",
              title: "Install the Bitski extension"
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
    })
  };
};

// src/wallets/walletConnectors/coin98Wallet/coin98Wallet.ts
import { InjectedConnector as InjectedConnector8 } from "wagmi/connectors/injected";
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
      }) : new InjectedConnector8({
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

// src/wallets/walletConnectors/coreWallet/coreWallet.ts
import { InjectedConnector as InjectedConnector9 } from "wagmi/connectors/injected";
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
      }) : new InjectedConnector9({
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

// src/wallets/walletConnectors/dawnWallet/dawnWallet.ts
import { InjectedConnector as InjectedConnector10 } from "wagmi/connectors/injected";
var dawnWallet = ({
  chains,
  ...options
}) => ({
  id: "dawn",
  name: "Dawn",
  iconUrl: async () => (await import("./dawnWallet-MN7QMTX3.js")).default,
  iconBackground: "#000000",
  installed: typeof window !== "undefined" && typeof window.ethereum !== "undefined" && window.ethereum.isDawn,
  hidden: () => !isIOS(),
  downloadUrls: {
    ios: "https://apps.apple.com/us/app/dawn-ethereum-wallet/id1673143782",
    mobile: "https://dawnwallet.xyz"
  },
  createConnector: () => ({
    connector: new InjectedConnector10({
      chains,
      options
    })
  })
});

// src/wallets/walletConnectors/enkryptWallet/enkryptWallet.ts
import { InjectedConnector as InjectedConnector11 } from "wagmi/connectors/injected";
var enkryptWallet = ({
  chains,
  ...options
}) => {
  var _a, _b;
  const isEnkryptInjected = typeof window !== "undefined" && typeof window.enkrypt !== "undefined" && ((_b = (_a = window == null ? void 0 : window.enkrypt) == null ? void 0 : _a.providers) == null ? void 0 : _b.ethereum);
  return {
    id: "enkrypt",
    name: "Enkrypt Wallet",
    installed: isEnkryptInjected ? true : void 0,
    iconUrl: async () => (await import("./enkryptWallet-LVMJVNXI.js")).default,
    iconBackground: "#FFFFFF",
    downloadUrls: {
      qrCode: "https://www.enkrypt.com",
      chrome: "https://chrome.google.com/webstore/detail/enkrypt-ethereum-polkadot/kkpllkodjeloidieedojogacfhpaihoh",
      browserExtension: "https://www.enkrypt.com/",
      edge: "https://microsoftedge.microsoft.com/addons/detail/enkrypt-ethereum-polkad/gfenajajnjjmmdojhdjmnngomkhlnfjl",
      firefox: "https://addons.mozilla.org/en-US/firefox/addon/enkrypt/",
      opera: "https://addons.opera.com/en/extensions/details/enkrypt/",
      safari: "https://apps.apple.com/app/enkrypt-web3-wallet/id1640164309"
    },
    createConnector: () => {
      return {
        connector: new InjectedConnector11({
          chains,
          options: {
            getProvider: () => {
              var _a2, _b2;
              return isEnkryptInjected ? (_b2 = (_a2 = window == null ? void 0 : window.enkrypt) == null ? void 0 : _a2.providers) == null ? void 0 : _b2.ethereum : void 0;
            },
            ...options
          }
        }),
        extension: {
          instructions: {
            learnMoreUrl: "https://blog.enkrypt.com/what-is-a-web3-wallet/",
            steps: [
              {
                description: "We recommend pinning Enkrypt Wallet to your taskbar for quicker access to your wallet.",
                step: "install",
                title: "Install the Enkrypt Wallet extension"
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

// src/wallets/walletConnectors/foxWallet/foxWallet.ts
import { InjectedConnector as InjectedConnector12 } from "wagmi/connectors/injected";
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
      }) : new InjectedConnector12({
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

// src/wallets/walletConnectors/frameWallet/frameWallet.ts
import { InjectedConnector as InjectedConnector13 } from "wagmi/connectors/injected";
var frameWallet = ({
  chains,
  ...options
}) => {
  var _a;
  return {
    id: "frame",
    name: "Frame",
    installed: typeof window !== "undefined" && typeof window.ethereum !== "undefined" && (window.ethereum.isFrame === true || !!((_a = window.ethereum.providers) == null ? void 0 : _a.find((p) => p.isFrame === true))),
    iconUrl: async () => (await import("./frameWallet-J2WUL2NQ.js")).default,
    iconBackground: "#121C20",
    downloadUrls: {
      browserExtension: "https://frame.sh/"
    },
    createConnector: () => ({
      connector: new InjectedConnector13({
        chains,
        options
      }),
      extension: {
        instructions: {
          learnMoreUrl: "https://docs.frame.sh/docs/Getting%20Started/Installation/",
          steps: [
            {
              description: "We recommend pinning Frame to your taskbar for quicker access to your wallet.",
              step: "install",
              title: "Install Frame & the companion extension"
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
    })
  };
};

// src/wallets/walletConnectors/frontierWallet/frontierWallet.ts
import { InjectedConnector as InjectedConnector14 } from "wagmi/connectors/injected";
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
      }) : new InjectedConnector14({ chains });
      const getUri = async () => {
        const uri = await getWalletConnectUri(connector, walletConnectVersion);
        return isAndroid() ? `frontier://wc?uri=${encodeURIComponent(uri)}` : uri;
      };
      return {
        connector: new InjectedConnector14({
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

// src/wallets/walletConnectors/ledgerWallet/ledgerWallet.ts
var ledgerWallet = ({
  chains,
  projectId,
  walletConnectOptions,
  walletConnectVersion = "2"
}) => ({
  id: "ledger",
  iconBackground: "#000",
  name: "Ledger Live",
  iconUrl: async () => (await import("./ledgerWallet-DIS4VM6H.js")).default,
  downloadUrls: {
    android: "https://play.google.com/store/apps/details?id=com.ledger.live",
    ios: "https://apps.apple.com/us/app/ledger-live-web3-wallet/id1361671700",
    mobile: "https://www.ledger.com/ledger-live",
    qrCode: "https://ledger.com/ledger-live"
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
          return isAndroid() ? uri : `ledgerlive://wc?uri=${encodeURIComponent(uri)}`;
        }
      },
      desktop: {
        getUri: async () => {
          const uri = await getWalletConnectUri(
            connector,
            walletConnectVersion
          );
          return `ledgerlive://wc?uri=${encodeURIComponent(uri)}`;
        }
      }
    };
  }
});

// src/wallets/walletConnectors/mewWallet/mewWallet.ts
import { InjectedConnector as InjectedConnector15 } from "wagmi/connectors/injected";
var mewWallet = ({
  chains,
  ...options
}) => {
  var _a;
  const isMewWalletInjected = typeof window !== "undefined" && Boolean(
    (_a = window.ethereum) == null ? void 0 : _a.isMEWwallet
  );
  return {
    id: "mew",
    name: "MEW wallet",
    iconUrl: async () => (await import("./mewWallet-4ZVF6HCJ.js")).default,
    iconBackground: "#fff",
    installed: isMewWalletInjected,
    downloadUrls: {
      android: "https://play.google.com/store/apps/details?id=com.myetherwallet.mewwallet&referrer=utm_source%3Drainbow",
      ios: "https://apps.apple.com/app/apple-store/id1464614025?pt=118781877&mt=8&ct=rainbow",
      mobile: "https://mewwallet.com",
      qrCode: "https://mewwallet.com"
    },
    createConnector: () => {
      return {
        connector: new InjectedConnector15({
          chains,
          options
        })
      };
    }
  };
};

// src/wallets/walletConnectors/okxWallet/okxWallet.ts
import { InjectedConnector as InjectedConnector16 } from "wagmi/connectors/injected";
var okxWallet = ({
  chains,
  projectId,
  walletConnectOptions,
  walletConnectVersion = "2",
  ...options
}) => {
  const isOKXInjected = typeof window !== "undefined" && typeof window.okxwallet !== "undefined";
  const shouldUseWalletConnect = !isOKXInjected;
  return {
    id: "okx",
    name: "OKX Wallet",
    iconUrl: async () => (await import("./okxWallet-GKYMI2XW.js")).default,
    iconAccent: "#000",
    iconBackground: "#000",
    downloadUrls: {
      android: "https://play.google.com/store/apps/details?id=com.okinc.okex.gp",
      ios: "https://itunes.apple.com/app/id1327268470?mt=8",
      mobile: "https://okx.com/download",
      qrCode: "https://okx.com/download",
      chrome: "https://chrome.google.com/webstore/detail/okx-wallet/mcohilncbfahbmgdjkbpemcciiolgcge",
      edge: "https://microsoftedge.microsoft.com/addons/detail/okx-wallet/pbpjkcldjiffchgbbndmhojiacbgflha",
      firefox: "https://addons.mozilla.org/firefox/addon/okexwallet/",
      browserExtension: "https://okx.com/download"
    },
    createConnector: () => {
      const connector = shouldUseWalletConnect ? getWalletConnectConnector({
        projectId,
        chains,
        version: walletConnectVersion,
        options: walletConnectOptions
      }) : new InjectedConnector16({
        chains,
        options: {
          getProvider: () => window.okxwallet,
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
            return isAndroid() ? uri : `okex://main/wc?uri=${encodeURIComponent(uri)}`;
          } : void 0
        },
        qrCode: shouldUseWalletConnect ? {
          getUri: async () => getWalletConnectUri(connector, walletConnectVersion),
          instructions: {
            learnMoreUrl: "https://okx.com/web3/",
            steps: [
              {
                description: "We recommend putting OKX Wallet on your home screen for quicker access.",
                step: "install",
                title: "Open the OKX Wallet app"
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
            learnMoreUrl: "https://okx.com/web3/",
            steps: [
              {
                description: "We recommend pinning OKX Wallet to your taskbar for quicker access to your wallet.",
                step: "install",
                title: "Install the OKX Wallet extension"
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

// src/wallets/walletConnectors/omniWallet/omniWallet.ts
var omniWallet = ({
  chains,
  projectId,
  walletConnectOptions,
  walletConnectVersion = "2"
}) => ({
  id: "omni",
  name: "Omni",
  iconUrl: async () => (await import("./omniWallet-VF54LPLK.js")).default,
  iconBackground: "#000",
  downloadUrls: {
    android: "https://play.google.com/store/apps/details?id=fi.steakwallet.app",
    ios: "https://itunes.apple.com/us/app/id1569375204",
    mobile: "https://omniwallet.app.link",
    qrCode: "https://omniwallet.app.link"
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
          return isAndroid() ? uri : `omni://wc?uri=${encodeURIComponent(uri)}`;
        }
      },
      qrCode: {
        getUri: async () => getWalletConnectUri(connector, walletConnectVersion),
        instructions: {
          learnMoreUrl: "https://omni.app/support",
          steps: [
            {
              description: "Add Omni to your home screen for faster access to your wallet.",
              step: "install",
              title: "Open the Omni app"
            },
            {
              description: "Create a new wallet or import an existing one.",
              step: "create",
              title: "Create or Import a Wallet"
            },
            {
              description: "Tap the QR icon on your homescreen, scan the code and confirm the prompt to connect.",
              step: "scan",
              title: "Tap the QR icon and scan"
            }
          ]
        }
      }
    };
  }
});

// src/wallets/walletConnectors/oneKeyWallet/oneKeyWallet.ts
import { InjectedConnector as InjectedConnector17 } from "wagmi/connectors/injected";
var oneKeyWallet = ({ chains }) => {
  var _a;
  const provider = typeof window !== "undefined" && ((_a = window["$onekey"]) == null ? void 0 : _a.ethereum);
  const isOnekeyInjected = Boolean(provider);
  return {
    createConnector: () => {
      const connector = new InjectedConnector17({
        chains,
        options: {
          getProvider: () => provider
        }
      });
      return {
        connector,
        extension: {
          instructions: {
            learnMoreUrl: "https://help.onekey.so/hc/en-us/categories/360000170236",
            steps: [
              {
                description: "We recommend pinning OneKey Wallet to your taskbar for quicker access to your wallet.",
                step: "install",
                title: "Install the OneKey Wallet extension"
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
    },
    downloadUrls: {
      android: "https://play.google.com/store/apps/details?id=so.onekey.app.wallet",
      browserExtension: "https://www.onekey.so/download/",
      chrome: "https://chrome.google.com/webstore/detail/onekey/jnmbobjmhlngoefaiojfljckilhhlhcj",
      edge: "https://microsoftedge.microsoft.com/addons/detail/onekey/obffkkagpmohennipjokmpllocnlndac",
      ios: "https://apps.apple.com/us/app/onekey-open-source-wallet/id1609559473",
      mobile: "https://www.onekey.so/download/",
      qrCode: "https://www.onekey.so/download/"
    },
    iconAccent: "#00B812",
    iconBackground: "#fff",
    iconUrl: async () => (await import("./oneKeyWallet-FEYKOAOJ.js")).default,
    id: "onekey",
    installed: isOnekeyInjected,
    name: "OneKey"
  };
};

// src/wallets/walletConnectors/phantomWallet/phantomWallet.ts
import { InjectedConnector as InjectedConnector18 } from "wagmi/connectors/injected";
var phantomWallet = ({
  chains,
  ...options
}) => {
  var _a;
  return {
    id: "phantom",
    name: "Phantom",
    iconUrl: async () => (await import("./phantomWallet-OLG36S4X.js")).default,
    iconBackground: "#9A8AEE",
    installed: typeof window !== "undefined" && !!((_a = window.phantom) == null ? void 0 : _a.ethereum) || void 0,
    downloadUrls: {
      android: "https://play.google.com/store/apps/details?id=app.phantom",
      ios: "https://apps.apple.com/app/phantom-solana-wallet/1598432977",
      mobile: "https://phantom.app/download",
      qrCode: "https://phantom.app/download",
      chrome: "https://chrome.google.com/webstore/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa",
      firefox: "https://addons.mozilla.org/firefox/addon/phantom-app/",
      browserExtension: "https://phantom.app/download"
    },
    createConnector: () => {
      const getProvider = () => {
        var _a2;
        return typeof window !== "undefined" ? (_a2 = window.phantom) == null ? void 0 : _a2.ethereum : void 0;
      };
      const connector = new InjectedConnector18({
        chains,
        options: { getProvider, ...options }
      });
      return {
        connector,
        extension: {
          instructions: {
            steps: [
              {
                description: "We recommend pinning Phantom to your taskbar for easier access to your wallet.",
                step: "install",
                title: "Install the Phantom extension"
              },
              {
                description: "Be sure to back up your wallet using a secure method. Never share your secret recovery phrase with anyone.",
                step: "create",
                title: "Create or Import a Wallet"
              },
              {
                description: "Once you set up your wallet, click below to refresh the browser and load up the extension.",
                step: "refresh",
                title: "Refresh your browser"
              }
            ],
            learnMoreUrl: "https://help.phantom.app"
          }
        }
      };
    }
  };
};

// src/wallets/walletConnectors/rabbyWallet/rabbyWallet.ts
import { InjectedConnector as InjectedConnector19 } from "wagmi/connectors/injected";
var rabbyWallet = ({
  chains,
  ...options
}) => ({
  id: "rabby",
  name: "Rabby Wallet",
  iconUrl: async () => (await import("./rabbyWallet-22VWIFCE.js")).default,
  iconBackground: "#8697FF",
  installed: typeof window !== "undefined" && typeof window.ethereum !== "undefined" && window.ethereum.isRabby === true,
  downloadUrls: {
    chrome: "https://chrome.google.com/webstore/detail/rabby-wallet/acmacodkjbdgmoleebolmdjonilkdbch",
    browserExtension: "https://rabby.io"
  },
  createConnector: () => ({
    connector: new InjectedConnector19({
      chains,
      options
    }),
    extension: {
      instructions: {
        learnMoreUrl: "https://rabby.io/",
        steps: [
          {
            description: "We recommend pinning Rabby to your taskbar for quicker access to your wallet.",
            step: "install",
            title: "Install the Rabby extension"
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
  })
});

// src/wallets/walletConnectors/safeheronWallet/safeheronWallet.ts
import { InjectedConnector as InjectedConnector20 } from "wagmi/connectors/injected";
var safeheronWallet = ({
  chains,
  ...options
}) => ({
  id: "safeheron",
  name: "Safeheron",
  installed: typeof window !== "undefined" && typeof window.safeheron !== "undefined" && window.safeheron.isSafeheron === true,
  iconUrl: async () => (await import("./safeheronWallet-YBMFXEUH.js")).default,
  iconBackground: "#fff",
  downloadUrls: {
    chrome: "https://chrome.google.com/webstore/detail/safeheron/aiaghdjafpiofpainifbgfgjfpclngoh",
    browserExtension: "https://www.safeheron.com/"
  },
  createConnector: () => ({
    connector: new InjectedConnector20({
      chains,
      options: {
        getProvider: () => typeof window !== "undefined" ? window.safeheron : void 0,
        ...options
      }
    }),
    extension: {
      instructions: {
        learnMoreUrl: "https://www.safeheron.com/",
        steps: [
          {
            description: "We recommend pinning Safeheron to your taskbar for quicker access to your wallet.",
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
  })
});

// src/wallets/walletConnectors/tahoWallet/tahoWallet.ts
import { InjectedConnector as InjectedConnector21 } from "wagmi/connectors/injected";
var tahoWallet = ({
  chains,
  ...options
}) => ({
  id: "taho",
  name: "Taho",
  iconBackground: "#d08d57",
  iconUrl: async () => (await import("./tahoWallet-BYONWLHD.js")).default,
  downloadUrls: {
    chrome: "https://chrome.google.com/webstore/detail/taho/eajafomhmkipbjmfmhebemolkcicgfmd",
    browserExtension: "https://taho.xyz"
  },
  installed: typeof window !== "undefined" && typeof window.tally !== "undefined" && window["tally"] ? true : void 0,
  createConnector: () => {
    return {
      connector: new InjectedConnector21({
        chains,
        options: {
          getProvider: () => {
            const getTaho = (tally) => (tally == null ? void 0 : tally.isTally) ? tally : void 0;
            if (typeof window === "undefined")
              return;
            return getTaho(window.tally);
          },
          ...options
        }
      }),
      extension: {
        instructions: {
          learnMoreUrl: "https://tahowallet.notion.site/Taho-Knowledge-Base-4d95ed5439c64d6db3d3d27abf1fdae5",
          steps: [
            {
              description: "We recommend pinning Taho to your taskbar for quicker access to your wallet.",
              step: "install",
              title: "Install the Taho extension"
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
});

// src/wallets/walletConnectors/talismanWallet/talismanWallet.ts
import { InjectedConnector as InjectedConnector22 } from "wagmi/connectors/injected";
var talismanWallet = ({
  chains,
  ...options
}) => ({
  id: "talisman",
  name: "Talisman",
  iconUrl: async () => (await import("./talismanWallet-W5EQ26N7.js")).default,
  iconBackground: "#fff",
  installed: typeof window !== "undefined" && typeof window.talismanEth !== "undefined" && window.talismanEth.isTalisman === true,
  downloadUrls: {
    chrome: "https://chrome.google.com/webstore/detail/talisman-polkadot-wallet/fijngjgcjhjmmpcmkeiomlglpeiijkld",
    firefox: "https://addons.mozilla.org/en-US/firefox/addon/talisman-wallet-extension/",
    browserExtension: "https://talisman.xyz/download"
  },
  createConnector: () => ({
    connector: new InjectedConnector22({
      chains,
      options: {
        getProvider: () => {
          if (typeof window === "undefined")
            return;
          return window.talismanEth;
        },
        ...options
      }
    }),
    extension: {
      instructions: {
        learnMoreUrl: "https://talisman.xyz/",
        steps: [
          {
            description: "We recommend pinning Talisman to your taskbar for quicker access to your wallet.",
            step: "install",
            title: "Install the Talisman extension"
          },
          {
            description: "Be sure to back up your wallet using a secure method. Never share your recovery phrase with anyone.",
            step: "create",
            title: "Create or Import an Ethereum Wallet"
          },
          {
            description: "Once you set up your wallet, click below to refresh the browser and load up the extension.",
            step: "refresh",
            title: "Refresh your browser"
          }
        ]
      }
    }
  })
});

// src/wallets/walletConnectors/tokenPocketWallet/tokenPocketWallet.ts
import { InjectedConnector as InjectedConnector23 } from "wagmi/connectors/injected";
var tokenPocketWallet = ({
  chains,
  projectId,
  walletConnectOptions,
  walletConnectVersion = "2"
}) => {
  var _a;
  const isTokenPocketInjected = typeof window !== "undefined" && ((_a = window.ethereum) == null ? void 0 : _a.isTokenPocket) === true;
  const shouldUseWalletConnect = !isTokenPocketInjected;
  return {
    id: "tokenPocket",
    name: "TokenPocket",
    iconUrl: async () => (await import("./tokenPocketWallet-UYD66DEM.js")).default,
    iconBackground: "#2980FE",
    installed: !shouldUseWalletConnect ? isTokenPocketInjected : void 0,
    downloadUrls: {
      chrome: "https://chrome.google.com/webstore/detail/tokenpocket/mfgccjchihfkkindfppnaooecgfneiii",
      browserExtension: "https://extension.tokenpocket.pro/",
      android: "https://play.google.com/store/apps/details?id=vip.mytokenpocket",
      ios: "https://apps.apple.com/us/app/tp-global-wallet/id6444625622",
      qrCode: "https://tokenpocket.pro/en/download/app",
      mobile: "https://tokenpocket.pro/en/download/app"
    },
    createConnector: () => {
      const connector = shouldUseWalletConnect ? getWalletConnectConnector({
        chains,
        projectId,
        options: walletConnectOptions,
        version: walletConnectVersion
      }) : new InjectedConnector23({ chains });
      const getUri = async () => {
        const uri = await getWalletConnectUri(connector, walletConnectVersion);
        return isMobile() ? `tpoutside://wc?uri=${encodeURIComponent(uri)}` : uri;
      };
      return {
        connector,
        mobile: {
          getUri: shouldUseWalletConnect ? getUri : void 0
        },
        qrCode: shouldUseWalletConnect ? {
          getUri,
          instructions: {
            learnMoreUrl: "https://help.tokenpocket.pro/en/",
            steps: [
              {
                description: "We recommend putting TokenPocket on your home screen for quicker access.",
                step: "install",
                title: "Open the TokenPocket app"
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
            learnMoreUrl: "https://help.tokenpocket.pro/en/extension-wallet/faq/installation-tutorial",
            steps: [
              {
                description: "We recommend pinning TokenPocket to your taskbar for quicker access to your wallet.",
                step: "install",
                title: "Install the TokenPocket extension"
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

// src/wallets/walletConnectors/trustWallet/trustWallet.ts
import { InjectedConnector as InjectedConnector24 } from "wagmi/connectors/injected";
function getTrustWalletInjectedProvider() {
  var _a;
  const isTrustWallet = (ethereum) => {
    const trustWallet2 = !!ethereum.isTrust;
    return trustWallet2;
  };
  const injectedProviderExist = typeof window !== "undefined" && typeof window.ethereum !== "undefined";
  if (!injectedProviderExist) {
    return;
  }
  if (window["trustwallet"]) {
    return window["trustwallet"];
  }
  if (isTrustWallet(window.ethereum)) {
    return window.ethereum;
  }
  if ((_a = window.ethereum) == null ? void 0 : _a.providers) {
    return window.ethereum.providers.find(isTrustWallet);
  }
}
var trustWallet = ({
  chains,
  projectId,
  walletConnectOptions,
  walletConnectVersion = "2",
  ...options
}) => {
  const isTrustWalletInjected = Boolean(getTrustWalletInjectedProvider());
  const shouldUseWalletConnect = !isTrustWalletInjected;
  return {
    id: "trust",
    name: "Trust Wallet",
    iconUrl: async () => (await import("./trustWallet-XIQD5AVI.js")).default,
    installed: isTrustWalletInjected || void 0,
    iconAccent: "#3375BB",
    iconBackground: "#fff",
    downloadUrls: {
      android: "https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp",
      ios: "https://apps.apple.com/us/app/trust-crypto-bitcoin-wallet/id1288339409",
      mobile: "https://trustwallet.com/download",
      qrCode: "https://trustwallet.com/download",
      chrome: "https://chrome.google.com/webstore/detail/trust-wallet/egjidjbpglichdcondbcbdnbeeppgdph",
      browserExtension: "https://trustwallet.com/browser-extension"
    },
    createConnector: () => {
      const getUriMobile = async () => {
        const uri = await getWalletConnectUri(connector, walletConnectVersion);
        return `trust://wc?uri=${encodeURIComponent(uri)}`;
      };
      const getUriQR = async () => {
        const uri = await getWalletConnectUri(connector, walletConnectVersion);
        return uri;
      };
      const connector = shouldUseWalletConnect ? getWalletConnectConnector({
        projectId,
        chains,
        version: walletConnectVersion,
        options: walletConnectOptions
      }) : new InjectedConnector24({
        chains,
        options: {
          getProvider: getTrustWalletInjectedProvider,
          ...options
        }
      });
      const mobileConnector = {
        getUri: shouldUseWalletConnect ? getUriMobile : void 0
      };
      let qrConnector = void 0;
      if (shouldUseWalletConnect) {
        qrConnector = {
          getUri: getUriQR,
          instructions: {
            learnMoreUrl: "https://trustwallet.com/",
            steps: [
              {
                description: "Put Trust Wallet on your home screen for faster access to your wallet.",
                step: "install",
                title: "Open the Trust Wallet app"
              },
              {
                description: "Create a new wallet or import an existing one.",
                step: "create",
                title: "Create or Import a Wallet"
              },
              {
                description: "Choose New Connection, then scan the QR code and confirm the prompt to connect.",
                step: "scan",
                title: "Tap WalletConnect in Settings"
              }
            ]
          }
        };
      }
      const extensionConnector = {
        instructions: {
          learnMoreUrl: "https://trustwallet.com/browser-extension",
          steps: [
            {
              description: "Click at the top right of your browser and pin Trust Wallet for easy access.",
              step: "install",
              title: "Install the Trust Wallet extension"
            },
            {
              description: "Create a new wallet or import an existing one.",
              step: "create",
              title: "Create or Import a wallet"
            },
            {
              description: "Once you set up Trust Wallet, click below to refresh the browser and load up the extension.",
              step: "refresh",
              title: "Refresh your browser"
            }
          ]
        }
      };
      return {
        connector,
        mobile: mobileConnector,
        qrCode: qrConnector,
        extension: extensionConnector
      };
    }
  };
};

// src/wallets/walletConnectors/uniswapWallet/uniswapWallet.ts
var uniswapWallet = ({
  chains,
  projectId,
  walletConnectOptions,
  walletConnectVersion = "2"
}) => ({
  id: "uniswap",
  name: "Uniswap Wallet",
  iconUrl: async () => (await import("./uniswapWallet-JYAMZDQK.js")).default,
  iconBackground: "#FFD8EA",
  downloadUrls: {
    ios: "https://apps.apple.com/app/apple-store/id6443944476",
    mobile: "https://wallet.uniswap.org/",
    qrCode: "https://wallet.uniswap.org/"
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
          return `uniswap://wc?uri=${encodeURIComponent(uri)}`;
        }
      },
      qrCode: {
        getUri: async () => getWalletConnectUri(connector, walletConnectVersion),
        instructions: {
          learnMoreUrl: "https://wallet.uniswap.org/",
          steps: [
            {
              description: "Add Uniswap Wallet to your home screen for faster access to your wallet.",
              step: "install",
              title: "Open the Uniswap app"
            },
            {
              description: "Create a new wallet or import an existing one.",
              step: "create",
              title: "Create or Import a Wallet"
            },
            {
              description: "Tap the QR icon on your homescreen, scan the code and confirm the prompt to connect.",
              step: "scan",
              title: "Tap the QR icon and scan"
            }
          ]
        }
      }
    };
  }
});

// src/wallets/walletConnectors/xdefiWallet/xdefiWallet.ts
import { InjectedConnector as InjectedConnector25 } from "wagmi/connectors/injected";
var xdefiWallet = ({
  chains,
  ...options
}) => {
  const isInstalled = typeof window !== "undefined" && typeof (window == null ? void 0 : window.xfi) !== "undefined";
  return {
    id: "xdefi",
    name: "XDEFI Wallet",
    installed: isInstalled,
    iconUrl: async () => (await import("./xdefiWallet-YKADIIDU.js")).default,
    iconBackground: "#fff",
    downloadUrls: {
      chrome: "https://chrome.google.com/webstore/detail/xdefi-wallet/hmeobnfnfcmdkdcmlblgagmfpfboieaf",
      browserExtension: "https://xdefi.io"
    },
    createConnector: () => ({
      connector: new InjectedConnector25({
        chains,
        options: {
          getProvider: () => {
            var _a;
            return isInstalled ? (_a = window.xfi) == null ? void 0 : _a.ethereum : void 0;
          },
          ...options
        }
      }),
      extension: {
        instructions: {
          learnMoreUrl: "https://xdefi.io/support-categories/xdefi-wallet/",
          steps: [
            {
              description: "We recommend pinning XDEFI Wallet to your taskbar for quicker access to your wallet.",
              step: "install",
              title: "Install the XDEFI Wallet extension"
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
    })
  };
};

// src/wallets/walletConnectors/zerionWallet/zerionWallet.ts
import { InjectedConnector as InjectedConnector26 } from "wagmi/connectors/injected";
var zerionWallet = ({
  chains,
  projectId,
  walletConnectOptions,
  walletConnectVersion = "2",
  ...options
}) => {
  const isZerionInjected = typeof window !== "undefined" && (typeof window.ethereum !== "undefined" && window.ethereum.isZerion || typeof window.zerionWallet !== "undefined");
  const shouldUseWalletConnect = !isZerionInjected;
  return {
    id: "zerion",
    name: "Zerion",
    iconUrl: async () => (await import("./zerionWallet-35GMAYN4.js")).default,
    iconAccent: "#2962ef",
    iconBackground: "#2962ef",
    installed: !shouldUseWalletConnect ? isZerionInjected : void 0,
    downloadUrls: {
      android: "https://play.google.com/store/apps/details?id=io.zerion.android",
      ios: "https://apps.apple.com/app/apple-store/id1456732565",
      mobile: "https://link.zerion.io/pt3gdRP0njb",
      qrCode: "https://link.zerion.io/pt3gdRP0njb",
      chrome: "https://chrome.google.com/webstore/detail/klghhnkeealcohjjanjjdaeeggmfmlpl",
      browserExtension: "https://zerion.io/extension"
    },
    createConnector: () => {
      const connector = shouldUseWalletConnect ? getWalletConnectConnector({
        projectId,
        chains,
        version: walletConnectVersion,
        options: walletConnectOptions
      }) : new InjectedConnector26({
        chains,
        options: {
          getProvider: () => typeof window !== "undefined" ? window.zerionWallet || window.ethereum : void 0,
          ...options
        }
      });
      const getUri = async () => {
        const uri = await getWalletConnectUri(connector, walletConnectVersion);
        return isIOS() ? `zerion://wc?uri=${encodeURIComponent(uri)}` : uri;
      };
      return {
        connector,
        mobile: {
          getUri: shouldUseWalletConnect ? getUri : void 0
        },
        qrCode: shouldUseWalletConnect ? {
          getUri,
          instructions: {
            learnMoreUrl: "https://zerion.io/blog/announcing-the-zerion-smart-wallet/",
            steps: [
              {
                description: "We recommend putting Zerion on your home screen for quicker access.",
                step: "install",
                title: "Open the Zerion app"
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
            learnMoreUrl: "https://help.zerion.io/en/",
            steps: [
              {
                description: "We recommend pinning Zerion to your taskbar for quicker access to your wallet.",
                step: "install",
                title: "Install the Zerion extension"
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
  ConnectButton,
  RainbowKitAuthenticationProvider,
  RainbowKitProvider,
  __private__,
  argentWallet,
  bifrostWallet,
  bitKeepWallet,
  bitgetWallet,
  bitskiWallet,
  braveWallet,
  coin98Wallet,
  coinbaseWallet,
  connectorsForWallets,
  coreWallet,
  createAuthenticationAdapter,
  cssObjectFromTheme,
  cssStringFromTheme,
  darkTheme,
  dawnWallet,
  enkryptWallet,
  foxWallet,
  frameWallet,
  frontierWallet,
  getDefaultWallets,
  getWalletConnectConnector,
  imTokenWallet,
  injectedWallet,
  ledgerWallet,
  lightTheme,
  metaMaskWallet,
  mewWallet,
  midnightTheme,
  okxWallet,
  omniWallet,
  oneKeyWallet,
  phantomWallet,
  rabbyWallet,
  rainbowWallet,
  safeWallet,
  safeheronWallet,
  tahoWallet,
  talismanWallet,
  tokenPocketWallet,
  trustWallet,
  uniswapWallet,
  useAccountModal,
  useAddRecentTransaction,
  useAsyncImage,
  useChainId,
  useChainModal,
  useConnectModal,
  useWalletConnectors,
  walletConnectWallet,
  xdefiWallet,
  zerionWallet
};
