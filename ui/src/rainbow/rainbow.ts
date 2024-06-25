import { sample } from "../utils/lodash";
import { createPublicClient, fallback, http, PublicClient } from "viem";
import { configureChains, createConfig } from "wagmi";
import * as chainList from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { particleWallet } from "@particle-network/rainbowkit-ext";
import { ParticleNetwork } from "@particle-network/auth";
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
import { Chain } from "../rainbowkit/src/components/RainbowKitProvider/RainbowKitChainContext";
import { connectorsForWallets } from "../rainbowkit/src/wallets/connectorsForWallets";
import { metaMaskWallet } from "../rainbowkit/src/wallets/walletConnectors/metaMaskWallet/metaMaskWallet";
import { walletConnectWallet } from "../rainbowkit/src/wallets/walletConnectors/walletConnectWallet/walletConnectWallet";
import { bitgetWallet } from "../rainbowkit/src/wallets/walletConnectors/bitgetWallet/bitgetWallet";
import { okxWallet } from "../rainbowkit/src/wallets/walletConnectors/okxWallet/okxWallet";
import { tokenPocketWallet } from "../rainbowkit/src/wallets/walletConnectors/tokenPocketWallet/tokenPocketWallet";
const WagmiChainList = Object.values(chainList);
const getSupportedChainIdList = (
  env: string,
  chainIdList?: ChainId[]
): Chain[] => {
  return supportedChainIds(env, chainIdList).map((chainId: ChainId) => {
    const chainFilter: Chain[] = WagmiChainList.filter(
      (v) => `${v.id}` === chainId
    );
    if (chainFilter && chainFilter.length) {
      const chainLocal = chainFilter[0];
      return chainLocal;
    }
    return {
      id: parseInt(chainId, 10),
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

// eslint-disable-next-line no-new
new ParticleNetwork({
  appId: "a2ecac32-b520-477a-abf6-4fa8cdfcc046",
  clientKey: "clITVBUqxtJzy2ymp8z4SQOUFWIc5qPUUHPks8ap",
  projectId: "763e083a-deb5-4fe9-8b7a-2a9c56659199",
});

export const getConfigureChains = (env: string, chainIdList?: ChainId[]) => {
  const { chains, publicClient, webSocketPublicClient } = configureChains(
    getSupportedChainIdList(env, chainIdList),
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

const getConnectors = (env: string, chainIdList?: ChainId[]) => {
  const { chains } = getConfigureChains(env, chainIdList);
  return connectorsForWallets([
    {
      groupName: "Recommended",
      wallets: [
        metaMaskWallet({ projectId, chains }),
        particleWallet({ chains }),
        walletConnectWallet({ projectId, chains }),
      ],
    },
    {
      groupName: "More",
      wallets: [
        bitgetWallet({ projectId, chains }),
        okxWallet({ projectId, chains }),
        tokenPocketWallet({ projectId, chains }),
        ...[
          particleWallet({ chains, authType: "google" }),
          particleWallet({ chains, authType: "facebook" }),
          particleWallet({ chains, authType: "apple" }),
        ],
      ],
    },
  ]);
};
export const getWagmiConfig = (env: string, chainIdList?: ChainId[]) => {
  const connectors = getConnectors(env, chainIdList);
  const { publicClient, webSocketPublicClient } = getConfigureChains(
    env,
    chainIdList
  );
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
            batchSize: `${cur.id}` === ChainId.POLYGON_ZKEVM ? 128 : 1024 * 200,
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
