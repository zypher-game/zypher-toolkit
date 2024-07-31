import { BlockExplorerUrls, Chain, ChainId, ChainName, ChainNetworkName, ChainRpcUrls, Currency, CurrencyContract, isTestnet } from '@ui/src'
import { defineChain } from 'viem'

export const ChainDefinitions = (chainId: ChainId): Chain =>
  defineChain({
    id: Number(chainId),
    name: ChainNetworkName[chainId],
    network: ChainName[chainId],
    nativeCurrency: { name: Currency[chainId], symbol: Currency[chainId], decimals: 18 },
    rpcUrls: {
      default: {
        http: ChainRpcUrls[chainId]
      },
      public: {
        http: ChainRpcUrls[chainId]
      }
    },
    blockExplorers: {
      default: { name: 'Nodereal', url: BlockExplorerUrls[chainId][0] },
      nodereal: { name: 'Nodereal', url: BlockExplorerUrls[chainId][0] }
    },
    contracts: { multicall3: { address: CurrencyContract[chainId].multicall[0] } },
    testnet: isTestnet[chainId]
  })
