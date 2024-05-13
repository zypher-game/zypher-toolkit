import { ChainId } from '@ui/src'

import { env } from '@/utils/config'
export const TransactionsCount: Record<ChainId, string> = {
  // v1 59140 0x7Ac84BB3e1bf4ffdbb86b3f9A41F99d255809Da6
  // v0 59140 0xb29cAa2cB1fEb7f4cCaa9Dd9B8Ad2022EaCa6EC3
  // https://explorer.goerli.linea.build/address/0x7Ac84BB3e1bf4ffdbb86b3f9A41F99d255809Da6 59
  // https://explorer.goerli.linea.build/address/0xb29cAa2cB1fEb7f4cCaa9Dd9B8Ad2022EaCa6EC3 30
  [ChainId.LineaTestnet]: 59 + 39 + '',
  // v1 59144 0xb5eE5a405eE2B27810Ca8d13eD80F16798208327
  // v0 59144 0xb29cAa2cB1fEb7f4cCaa9Dd9B8Ad2022EaCa6EC3
  // https://lineascan.build/address/0xb5eE5a405eE2B27810Ca8d13eD80F16798208327  180
  // https://lineascan.build/address/0xb29cAa2cB1fEb7f4cCaa9Dd9B8Ad2022EaCa6EC3 16696
  [ChainId.LineaMainnet]: 16696 + 284 + '',
  // v0 42161 0x2e6190c90ca9aFc4D39c02b1E680Fb7183fA4a83
  // https://arbiscan.io/address/0x2e6190c90ca9aFc4D39c02b1E680Fb7183fA4a83
  [ChainId.Arbitrum]: '3340',
  // v0 421613 0xD414aCC27888A46E2D4C2467A673D7297d160205
  // https://goerli.arbiscan.io/address/0xD414aCC27888A46E2D4C2467A673D7297d160205
  [ChainId.ArbitrumGoerli]: '0',
  // v1 5611 0x20e3Da5AEbBb818D4cDE6C04433734aA4AA9984E
  // https://opbnb-testnet.bscscan.com/address/0x20e3Da5AEbBb818D4cDE6C04433734aA4AA9984E
  [ChainId.OPBNBTEST]: '1955',
  // v1 204 0x1C5ca38772118b3ca0F9893D4d7a5eb8acECdC79
  // https://opbnbscan.com/address/0x1C5ca38772118b3ca0F9893D4d7a5eb8acECdC79
  // v0 18,619 0xEEcaAE0E7C68bCc0e232c8229310991A0106f1C4
  // https://opbnbscan.com/address/0xEEcaAE0E7C68bCc0e232c8229310991A0106f1C4
  [ChainId.OPBNB]: 18619 + 164 + '',
  // v0 169 0x98BbCd1cA421A6d07707b1818586441dD79a625a
  // https://pacific-explorer.manta.network/address/0x98BbCd1cA421A6d07707b1818586441dD79a625a
  [ChainId.MantaPacificMainnet]: '23532',
  // v0 3441005 0xb964DD78Ba7FD6d0A57fA1ad70CDDFD14EA3fED2
  // https://manta-testnet.calderaexplorer.xyz/address/0xb964DD78Ba7FD6d0A57fA1ad70CDDFD14EA3fED2
  [ChainId.MantaPacificTestnet]: '160',

  // v0 534351 0x4122E927d082247b51d73D27EdF836051c905EC9
  // https://sepolia-blockscout.scroll.io/address/0x4122E927d082247b51d73D27EdF836051c905EC9
  [ChainId.ScrollSepoliaTestnet]: '382',
  // v0 534353 0x3a7B56735270aB30E486573211E786475A1bF9B5
  // https://alpha-blockscout.scroll.io/address/0x3a7B56735270aB30E486573211E786475A1bF9B5
  [ChainId.ScrollAlphaTestnet]: '0',
  [ChainId.Bsc]: '0',
  [ChainId.BscTestnet]: '0',
  [ChainId.ArbitrumRinkeby]: '0',
  [ChainId.POLYGON_MUMBAI]: '0',
  [ChainId.POLYGON_ZKEVM]: '0',
  // v0 91715 0x6e15826f295A9d2939dbc625594E61141fBFB51A
  // https://combotrace-testnet.nodereal.io/address/0x6e15826f295A9d2939dbc625594E61141fBFB51A
  [ChainId.ComboTestnet]: '7',
  // v0 5000 0x8a3114017856ADa46316E497775BdF9bAb32FF8b
  // https://explorer.mantle.xyz/address/0x8a3114017856ADa46316E497775BdF9bAb32FF8b
  [ChainId.Mantle]: '1890',
  // 0x086fd126fd9Cd41F362FCe38e09f76f481c2Af92
  // https://explorer.testnet.mantle.xyz/address/0x086fd126fd9Cd41F362FCe38e09f76f481c2Af92
  [ChainId.MantleTestnet]: '153',
  [ChainId.Combo]: '0',
  [ChainId.Sepolia]: '0',
  [ChainId.B2]: '0',
  [ChainId.B2Testnet]: '0'
}
export const graphqlApiUrl: Partial<Record<ChainId, string>> = {
  [ChainId.LineaMainnet]: 'https://linea-mainnet-graph.zypher.game/subgraphs/name/linea/bingo',
  [ChainId.LineaTestnet]: 'https://linea-goerli-graph.zypher.game/subgraphs/name/linea/goerli',
  [ChainId.OPBNB]: 'https://opbnb-mainnet-graph.zypher.game/subgraphs/name/opbnb/bingo',
  [ChainId.OPBNBTEST]: 'https://opbnb-testnet-graph.zypher.game/subgraphs/name/opbnb/bingo',
  [ChainId.ArbitrumGoerli]: 'https://arb-goerli-graph.zypher.game/subgraphs/name/arb/bingo'
}

export const monsterGraphqlApiUrl: Partial<Record<ChainId, string>> = {
  [ChainId.LineaMainnet]: 'https://linea-mainnet-graph.zypher.game/subgraphs/name/linea/bingo',
  [ChainId.LineaTestnet]: 'https://linea-goerli-graph.zypher.game/subgraphs/name/linea/goerli',
  [ChainId.OPBNB]: 'https://opbnb-mainnet-graph.zypher.game/subgraphs/name/opbnb/bingo',
  [ChainId.OPBNBTEST]: 'https://opbnb-testnet-graph.zypher.game/subgraphs/name/zypher-events/monster-2023',
  [ChainId.ArbitrumGoerli]: 'https://arb-goerli-graph.zypher.game/subgraphs/name/arb/bingo'
}

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
export const defaultLocalChainId = env === 'develop' ? ChainId.OPBNBTEST : ChainId.OPBNB

export const GlobalVar = {
  dispatch: (arg: any) => null as any
}
