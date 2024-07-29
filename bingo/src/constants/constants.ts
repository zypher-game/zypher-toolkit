import { ChainId } from '@ui/src'
import { Chain } from 'viem'
import {
  arbitrum,
  arbitrumGoerli,
  bsc,
  bscTestnet,
  linea,
  lineaTestnet,
  mantle,
  opBNB,
  opBNBTestnet,
  polygonMumbai,
  polygonZkEvmTestnet,
  scrollSepolia,
  scrollTestnet
} from 'viem/chains'

import { env } from '@/utils/config'

import { combo } from './chains_definitions/combo'
import { comboTestnet } from './chains_definitions/comboTestnet'
import { manta } from './chains_definitions/manta'
import { mantaTestnet } from './chains_definitions/mantaTestnet'
import { mantleTestnet } from './chains_definitions/mantleTestnet'
import { sepolia } from './chains_definitions/sepolia'
import { TaikoHeklaTestnet9 } from './chains_definitions/TaikoHeklaTestnet9'

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
  [ChainId.Mainnet]: undefined,
  [ChainId.Testnet]: undefined,
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
  [ChainId.TaikoHeklaTestnet9]: '3000000000' // wei
}

export const AllChainInfo: Record<ChainId, Chain | undefined> = {
  [ChainId.Mainnet]: bsc,
  [ChainId.Testnet]: bscTestnet,
  [ChainId.Arbitrum]: arbitrum,
  [ChainId.ArbitrumGoerli]: arbitrumGoerli,
  [ChainId.ArbitrumRinkeby]: undefined,
  [ChainId.LineaTestnet]: lineaTestnet,
  [ChainId.LineaMainnet]: linea,
  [ChainId.POLYGON_MUMBAI]: polygonMumbai,
  [ChainId.POLYGON_ZKEVM]: polygonZkEvmTestnet,
  [ChainId.OPBNBTEST]: opBNBTestnet,
  [ChainId.OPBNB]: opBNB,
  [ChainId.ScrollAlphaTestnet]: scrollTestnet,
  [ChainId.ScrollSepoliaTestnet]: scrollSepolia,
  [ChainId.MantaPacificMainnet]: manta,
  [ChainId.MantaPacificTestnet]: mantaTestnet,
  [ChainId.ComboTestnet]: comboTestnet,
  [ChainId.Mantle]: mantle,
  [ChainId.MantleTestnet]: mantleTestnet,
  [ChainId.Combo]: combo,
  [ChainId.Sepolia]: sepolia,
  [ChainId.TaikoHeklaTestnet9]: TaikoHeklaTestnet9
}
