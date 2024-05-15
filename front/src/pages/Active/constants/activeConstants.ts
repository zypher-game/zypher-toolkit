import { ChainId, getCryptoImg, isPro } from '@ui/src'
import { Address } from 'wagmi'
export const TVL_API = 'https://tvl-backend-api.zypher.game'
export enum TVLChainId {
  Sepolia = ChainId.Sepolia,
  B2 = ChainId.B2,
  B2Testnet = ChainId.B2Testnet,
  LineaMainnet = ChainId.LineaMainnet,
  LineaTestnet = ChainId.LineaTestnet
}
export const defaultActiveChainId = TVLChainId.Sepolia as unknown as ChainId
export const TVLStakingSupportedChainId = (!isPro()
  ? // ? [TVLChainId.B2Testnet, TVLChainId.Sepolia, TVLChainId.LineaTestnet]
    [TVLChainId.B2Testnet, TVLChainId.LineaTestnet]
  : []) as unknown as ChainId[]

export type IToken = {
  address: Address
  symbol: string
  // name: string
  // decimal: number
  logoPath: string
  index: number
}
export type TVLToken = {
  USDT: IToken
  WETH: IToken
  // GP: IToken
}
export const activeTokenList: Record<ChainId, Record<string, Address>> = {
  [TVLChainId.Sepolia]: {
    Restaking: '0x8D082081b2FC4260425a1a8C45Cc0F8E8B06EB19',
    ZypherGameToken: '0xb78fC41280f671a63ce701925F05E3dA1Da9a2Cc',
    CRHero: '0x76E08f9D5f76590E12427F003325768290602De1'
  },
  [TVLChainId.LineaTestnet]: {
    Restaking: '0x3BbBe5929db5EAdF580537874bBA0a961F505E40',
    ZypherGameToken: '0x5275A8593ce6a967Ae6782a70F417135A44bCd27',
    CRHero: '0x76E08f9D5f76590E12427F003325768290602De1'
  },
  [TVLChainId.B2Testnet]: {
    Restaking: '0x159879B72B1bE7007aC56c4DcbbC31545F8D57bb',
    ZypherGameToken: '0x6F36BF53bE9be182599CD7E937E5F32152cEAf41',
    CRHero: '0x5f441d16bA9A5e3a824f4c287eDA8019F97418f6'
  }
} as unknown as Record<ChainId, Record<string, Address>>
const tvlTokenAddress: Record<ChainId, Record<string, Address>> = {
  [TVLChainId.Sepolia]: {
    WETH: '0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9'
  },
  [TVLChainId.LineaTestnet]: {
    WETH: '0x5131bc5Ed480a524932D2638922616fE968374FE',
    wstETH: '0xbd36B55DF798a2031A9E06A9e8a1AC0C625911dE',
    ezETH: '0xc2DEc928E445Bb1E491ad7Ac077672037D339a3E'
  },
  [TVLChainId.B2Testnet]: {
    WBTC: '0x9Cae525AdE710904FE81daF47fD26789608fe057',
    stBTC: '0x4AC1Ba5885929aFDdbf035bA03013836db27012C'
  }
} as unknown as Record<ChainId, Record<string, Address>>
export const tvlTokens = Object.fromEntries(
  TVLStakingSupportedChainId.map(chainId => [
    chainId,
    Object.fromEntries(
      Object.keys(tvlTokenAddress[chainId]).map(currency => [
        currency,
        {
          address: tvlTokenAddress[chainId][currency],
          symbol: currency,
          logoPath: getCryptoImg('token', currency, '.png'),
          index: 2
        }
      ])
    )
  ])
)
// [TVLChainId.Sepolia]:,
// [TVLChainId.LineaTestnet]: {
//   USDT: {
//     address: tvlTokenAddress[TVLChainId.LineaTestnet].USDT,
//     symbol: 'USDT',
//     logoPath: getCryptoImg('token', 'USDT', '.png'),
//     index: 2
//   },
//   WETH: {
//     address: tvlTokenAddress[TVLChainId.LineaTestnet].WETH,
//     symbol: 'WETH',
//     logoPath: getCryptoImg('token', 'WETH', '.png'),
//     index: 1
//   }
//   // GP: {
//   //   address: tvlTokenAddress[TVLChainId.LineaTestnet].ZypherGameToken,
//   //   symbol: 'GP',
//   //   logoPath: '',
//   //   index: 4
//   // }
// },
// [TVLChainId.B2Testnet]: {
//   USDT: {
//     address: tvlTokenAddress[TVLChainId.B2Testnet].USDT,
//     symbol: 'USDT',
//     logoPath: getCryptoImg('token', 'USDT', '.png'),
//     index: 2
//   },
//   WETH: {
//     address: tvlTokenAddress[TVLChainId.B2Testnet].WETH,
//     symbol: 'WETH',
//     logoPath: getCryptoImg('token', 'BTC'),
//     index: 1
//   }
//   // GP: {
//   //   address: tvlTokenAddress[TVLChainId.LineaTestnet].ZypherGameToken,
//   //   symbol: 'GP',
//   //   logoPath: '',
//   //   index: 4
//   // }
// }
// } as unknown as Record<ChainId, TVLToken>
type ILinkPre = {
  key: number
  label: string
  chainId: ChainId
}
export const LinkPre: Record<string, ILinkPre> = {
  // "E": {
  //   key: 0,
  // label: "E",
  // chainId: isPro() ? ChainId.
  // } ,
  L: {
    key: 1,
    label: 'L',
    chainId: (isPro() ? TVLChainId.LineaMainnet : TVLChainId.LineaTestnet) as unknown as ChainId
  },
  B: {
    key: 2,
    label: 'B',
    chainId: (isPro() ? TVLChainId.B2 : TVLChainId.B2Testnet) as unknown as ChainId
  }
}
export const getLinkPre = (chainId: ChainId): ILinkPre => {
  return Object.values(LinkPre).filter(v => v.chainId === chainId)[0]
}
export const CODELENGTH = 6
