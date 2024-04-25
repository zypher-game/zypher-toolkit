import { ChainId, isPro, preStaticUrl } from '@UI/src/'
import { Address } from 'wagmi'
export const TVL_API = 'http://52.12.244.226:30223'

export type TVLChainId = Pick<ChainId, 11_155_111 | 59140>

export const defaultActiveChainId = TVLChainId.Sepolia as unknown as ChainId
export const TVLStakingSupportedChainId = (!isPro() ? [TVLChainId.Sepolia, TVLChainId.LineaTestnet] : []) as unknown as ChainId[]

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
export const tvlTokenAddress: Record<TVLChainId, Record<string, Address>> = {
  [TVLChainId.Sepolia]: {
    Restaking: '0x8D082081b2FC4260425a1a8C45Cc0F8E8B06EB19',
    USDT: '0x6d1688F7Ef43070E121a8DB4A92C00cd5130Cf30',
    WETH: '0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9',
    ZypherGameToken: '0xb78fC41280f671a63ce701925F05E3dA1Da9a2Cc'
  },
  [TVLChainId.LineaTestnet]: {
    ZypherGameToken: '0x5275A8593ce6a967Ae6782a70F417135A44bCd27',
    Restaking: '0x3BbBe5929db5EAdF580537874bBA0a961F505E40',
    WETH: '0x5131bc5Ed480a524932D2638922616fE968374FE',
    USDT: '0xec3D0EfFa4d763563e45186A563f1f416CBc6647'
  }
}
export const tvlTokens: Record<TVLChainId, TVLToken> = {
  [TVLChainId.Sepolia]: {
    USDT: {
      address: tvlTokenAddress[TVLChainId.Sepolia].USDT,
      symbol: 'USDT',
      logoPath: preStaticUrl + '/img/token/USDT.png',
      index: 2
    },
    WETH: {
      address: tvlTokenAddress[TVLChainId.Sepolia].WETH,
      symbol: 'WETH',
      logoPath: preStaticUrl + '/img/token/WETH.png',
      index: 1
    }
    // GP: {
    //   address: tvlTokenAddress[TVLChainId.Sepolia].ZypherGameToken,
    //   symbol: 'GP',
    //   logoPath: '',
    //   index: 4
    // }
  },
  [TVLChainId.LineaTestnet]: {
    USDT: {
      address: tvlTokenAddress[TVLChainId.LineaTestnet].USDT,
      symbol: 'USDT',
      logoPath: preStaticUrl + '/img/token/USDT.png',
      index: 2
    },
    WETH: {
      address: tvlTokenAddress[TVLChainId.LineaTestnet].WETH,
      symbol: 'WETH',
      logoPath: preStaticUrl + '/img/token/WETH.png',
      index: 1
    }
    // GP: {
    //   address: tvlTokenAddress[TVLChainId.LineaTestnet].ZypherGameToken,
    //   symbol: 'GP',
    //   logoPath: '',
    //   index: 4
    // }
  }
}

export const CODELENGTH = 5
