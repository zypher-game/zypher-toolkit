import {
  bitgetWallet,
  metaMaskWallet,
  okxWallet,
  tokenPocketWallet,
  walletConnectWallet,
  Chain,
  connectorsForWallets,
} from "@my/rainbowkit";
import { sample } from "../utils/lodash";
import { createPublicClient, fallback, http, PublicClient } from "viem";
import { configureChains, createConfig } from "wagmi";
import * as chainList from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

import {
  BlockExplorerUrls,
  ChainId,
  ChainName,
  ChainNetworkName,
  ChainRpcUrls,
  ChainRpcWebSocketUrls,
  Currency,
  isTestnet,
  supportedChainIds,
} from "../constant/constant";
const WagmiChainList = Object.values(chainList);
const getSupportedChainIdList = (env: string): Chain[] => {
  return supportedChainIds(env).map((chainId: ChainId) => {
    const chainFilter: Chain[] = WagmiChainList.filter((v) => v.id === chainId);
    if (chainFilter && chainFilter.length) {
      const chainLocal = chainFilter[0];
      return chainLocal;
    }
    return {
      id: chainId,
      name: ChainName[chainId],
      network: ChainNetworkName[chainId],
      nativeCurrency: {
        name: `${Currency[chainId]}`,
        symbol: `${Currency[chainId]}`,
        decimals: 18,
      },
      rpcUrls: {
        default: {
          http: ChainRpcUrls[chainId],
          webSocket: ChainRpcWebSocketUrls[chainId],
        },
        public: {
          http: ChainRpcUrls[chainId],
          webSocket: ChainRpcWebSocketUrls[chainId],
        },
      },

      blockExplorers: {
        default: {
          name: `${ChainName[chainId]} Explorer`,
          url: sample(BlockExplorerUrls[chainId]) ?? "",
        },
      },
      testnet: isTestnet[chainId],
    };
  });
};
// const { chains, publicClient, webSocketPublicClient } = configureChains(supportedChainIdList, [publicProvider()])

export const getConfigureChains = (env: string) => {
  const { chains, publicClient, webSocketPublicClient } = configureChains(
    getSupportedChainIdList(env),
    [publicProvider()]
  );
  return { chains, publicClient, webSocketPublicClient };
};
const projectId = "bc467c124a7a7a8ce06a41ef40b1b842";

// const { wallets } = getDefaultWallets({
//   appName: appInfo.appName,
//   projectId,
//   chains
// })

const getConnectors = (env: string) => {
  const { chains } = getConfigureChains(env);
  return connectorsForWallets([
    {
      groupName: "Recommended",
      wallets: [
        metaMaskWallet({ projectId, chains }),
        walletConnectWallet({ projectId, chains }),
      ],
    },
    {
      groupName: "More",
      wallets: [
        bitgetWallet({ projectId, chains }),
        okxWallet({ projectId, chains }),
        tokenPocketWallet({ projectId, chains }),
      ],
    },
  ]);
};
export const getWagmiConfig = (env: string) => {
  const connectors = getConnectors(env);
  const { publicClient, webSocketPublicClient } = getConfigureChains(env);
  return createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,
  });
};

// const transport = webSocket('wss://arbitrum-goerli.publicnode.com')

// const client = createPublicClient({
//   chain: chainList['arbitrumGoerli'],
//   transport
// })

export const viemClients = (env: string): Record<ChainId, PublicClient> => {
  const { chains } = getConfigureChains(env);
  return chains.reduce((prev, cur) => {
    return {
      ...prev,
      [cur.id]: createPublicClient({
        chain: cur,
        transport: fallback(
          (ChainRpcUrls[cur.id] as string[]).map((url) =>
            http(url, {
              timeout: 15_000,
            })
          ),
          {
            rank: false,
          }
        ),
        batch: {
          multicall: {
            batchSize: cur.id === ChainId.POLYGON_ZKEVM ? 128 : 1024 * 200,
          },
        },
      }),
    };
  }, {} as Record<ChainId, PublicClient>);
};

export const getViemClients = ({
  env,
  chainId,
}: {
  env: string;
  chainId: ChainId;
}): PublicClient => {
  return viemClients(env)[chainId];
};
