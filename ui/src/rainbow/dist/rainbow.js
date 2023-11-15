"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
exports.__esModule = true;
exports.wagmiConfig =
  exports.chains =
  exports.getViemClients =
  exports.viemClients =
    void 0;
var rainbowkit_1 = require("@zypher-game/toolkit/rainbowkit");
var wallets_1 = require("@zypher-game/toolkit/rainbowkit/wallets");
var lodash_1 = require("lodash");
var viem_1 = require("viem");
var wagmi_1 = require("wagmi");
var chainList = require("wagmi/chains");
var public_1 = require("wagmi/providers/public");
var constant_1 = require("../constant/constant");
var WagmiChainList = Object.values(chainList);
var supportedChainIdList = constant_1.supportedChainIds.map(function (chainId) {
  var _a;
  var chainFilter = WagmiChainList.filter(function (v) {
    return v.id === chainId;
  });
  if (chainFilter && chainFilter.length) {
    var chainLocal = chainFilter[0];
    return chainLocal;
  }
  return {
    id: chainId,
    name: constant_1.ChainName[chainId],
    network: constant_1.ChainNetworkName[chainId],
    nativeCurrency: {
      name: "" + constant_1.Currency[chainId],
      symbol: "" + constant_1.Currency[chainId],
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: constant_1.ChainRpcUrls[chainId],
        webSocket: constant_1.ChainRpcWebSocketUrls[chainId],
      },
      public: {
        http: constant_1.ChainRpcUrls[chainId],
        webSocket: constant_1.ChainRpcWebSocketUrls[chainId],
      },
    },
    blockExplorers: {
      default: {
        name: constant_1.ChainName[chainId] + " Explorer",
        url:
          (_a = lodash_1.sample(constant_1.BlockExplorerUrls[chainId])) !==
            null && _a !== void 0
            ? _a
            : "",
      },
    },
    testnet: constant_1.isTestnet[chainId],
  };
});
// const { chains, publicClient, webSocketPublicClient } = configureChains(supportedChainIdList, [publicProvider()])
var _a = wagmi_1.configureChains(supportedChainIdList, [
    public_1.publicProvider(),
  ]),
  chains = _a.chains,
  publicClient = _a.publicClient,
  webSocketPublicClient = _a.webSocketPublicClient;
exports.chains = chains;
var projectId = "bc467c124a7a7a8ce06a41ef40b1b842";
// const { wallets } = getDefaultWallets({
//   appName: appInfo.appName,
//   projectId,
//   chains
// })
var connectors = rainbowkit_1.connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      wallets_1.metaMaskWallet({ projectId: projectId, chains: chains }),
      wallets_1.walletConnectWallet({ projectId: projectId, chains: chains }),
    ],
  },
  {
    groupName: "More",
    wallets: [
      wallets_1.bitgetWallet({ projectId: projectId, chains: chains }),
      wallets_1.okxWallet({ projectId: projectId, chains: chains }),
      wallets_1.tokenPocketWallet({ projectId: projectId, chains: chains }),
    ],
  },
]);
var wagmiConfig = wagmi_1.createConfig({
  autoConnect: true,
  connectors: connectors,
  publicClient: publicClient,
  webSocketPublicClient: webSocketPublicClient,
});
exports.wagmiConfig = wagmiConfig;
// const transport = webSocket('wss://arbitrum-goerli.publicnode.com')
// const client = createPublicClient({
//   chain: chainList['arbitrumGoerli'],
//   transport
// })
exports.viemClients = chains.reduce(function (prev, cur) {
  var _a;
  return __assign(
    __assign({}, prev),
    ((_a = {}),
    (_a[cur.id] = viem_1.createPublicClient({
      chain: cur,
      transport: viem_1.fallback(
        constant_1.ChainRpcUrls[cur.id].map(function (url) {
          return viem_1.http(url, {
            timeout: 15000,
          });
        }),
        {
          rank: false,
        }
      ),
      batch: {
        multicall: {
          batchSize:
            cur.id === constant_1.ChainId.POLYGON_ZKEVM ? 128 : 1024 * 200,
        },
      },
    })),
    _a)
  );
}, {});
exports.getViemClients = function (_a) {
  var chainId = _a.chainId;
  return exports.viemClients[chainId];
};
