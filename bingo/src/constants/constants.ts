import { ChainId } from '@ui/src'
import { Chain } from 'viem'

import { env } from '@/utils/config'

import { ChainDefinitions } from './chains_definitions/chains_definitions'
export const graphqlApiUrl: Partial<Record<ChainId, string>> = {
  [ChainId.LineaMainnet]: 'https://linea-mainnet-graph.zypher.game/subgraphs/name/linea/bingo',
  [ChainId.LineaTestnet]: 'https://linea-goerli-graph.zypher.game/subgraphs/name/linea/goerli',
  [ChainId.OPBNB]: 'https://opbnb-mainnet-graph.zypher.game/subgraphs/name/opbnb/bingo',
  [ChainId.OPBNBTEST]: 'https://opbnb-testnet-graph.zypher.game/subgraphs/name/opbnb/bingo',
  [ChainId.ArbitrumGoerli]: 'https://arb-goerli-graph.zypher.game/subgraphs/name/arb/bingo'
}
export const defaultChainId = ChainId.LineaMainnet

export const gradeData = [
  {
    betSize: 5000000000000000000000n,
    laber: '5,000',
    minWinCounts: 0,
    level: 1
  },
  {
    betSize: 10000000000000000000000n,
    laber: '10,000',
    minWinCounts: 10,
    level: 2
  },
  {
    betSize: 20000000000000000000000n,
    laber: '20,000',
    minWinCounts: 25,
    level: 3
  }
]
export const defaultRankChainId = ChainId.ArbitrumGoerli
export const defaultLocalChainId = env === 'develop' ? ChainId.OPBNBTEST : defaultChainId

export const gasPrice: Record<ChainId, string | undefined> = {
  [ChainId.Arbitrum]: undefined,
  [ChainId.ArbitrumGoerli]: undefined,
  [ChainId.ArbitrumRinkeby]: undefined,
  [ChainId.LineaTestnet]: undefined,
  [ChainId.LineaMainnet]: undefined,
  [ChainId.POLYGON_MUMBAI]: undefined,
  [ChainId.POLYGON_ZKEVM]: undefined,
  [ChainId.OPBNBTEST]: undefined,
  [ChainId.OPBNB]: undefined,
  [ChainId.ScrollAlphaTestnet]: undefined,
  [ChainId.ScrollSepoliaTestnet]: undefined,
  [ChainId.MantaPacificMainnet]: '100000',
  [ChainId.MantaPacificTestnet]: '100000',
  [ChainId.ComboTestnet]: undefined,
  [ChainId.Mantle]: undefined,
  [ChainId.MantleTestnet]: undefined,
  [ChainId.Combo]: undefined,
  [ChainId.Sepolia]: undefined,
  [ChainId.Bsc]: undefined,
  [ChainId.BscTestnet]: undefined,
  [ChainId.B2]: undefined,
  [ChainId.B2Testnet]: undefined,
  [ChainId.ZytronLineaSepoliaTestnet]: undefined,
  [ChainId.ZytronB2Testnet]: undefined,
  [ChainId.Taiko]: undefined,
  [ChainId.SagaMainnet]: undefined
}

export const AllChainInfo: Record<ChainId, Chain | undefined> = Object.fromEntries(
  (Object.values(ChainId) as ChainId[]).map(v => [v, ChainDefinitions(v)])
) as Record<ChainId, Chain>
