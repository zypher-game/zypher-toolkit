import {
  ChainId,
  chainIdPre,
  divisorBigNumber,
  getFormattedTime,
  IContractName,
  isTestnet,
  MulticallContract,
  request,
  useActiveWeb3React
} from '@ui/src'
import { isEqual } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import { Address, Chain } from 'wagmi'

import TILE_REWARD_HELPER_ABI from '@/contract/abi/tile_reward_helper.json'
import NFT_ABI from '@/contract/abi/z2048SBT.json'
import z2048SBT from '@/contract/z2048SBT'
import { batchRequestContracts, batchRequestMulticall, IContractResponse } from '@/utils/batchRequestContracts'
import BigNumberJs from '@/utils/BigNumberJs'
export type I2048GameList = {
  chainId: ChainId
  tokenId: string
  tokenIdLink: string
  tokenIdStr: string
  moves: number
  time: number
  beginTime: number
  beginTimeStr: string
  result: string
  player: Address
  gameId: string
  maxTile: string
  reward: string
  tokenURL?: string
}
const MarketLinkPre: Record<ChainId, string> = {
  [ChainId.Bsc]: 'https://element.market/assets/bsc/',
  [ChainId.BscTestnet]: '',
  [ChainId.Arbitrum]: 'https://element.market/assets/arbitrum/',
  [ChainId.ArbitrumRinkeby]: '',
  [ChainId.LineaTestnet]: '',
  [ChainId.LineaMainnet]: 'https://element.market/assets/linea/',
  [ChainId.POLYGON_MUMBAI]: '',
  [ChainId.POLYGON_ZKEVM]: '',
  [ChainId.ArbitrumGoerli]: '',
  [ChainId.ScrollAlphaTestnet]: '',
  [ChainId.OPBNBTEST]: '',
  [ChainId.OPBNB]: 'https://element.market/assets/opbnb/',
  [ChainId.ScrollSepoliaTestnet]: '',
  [ChainId.MantaPacificMainnet]: 'https://element.market/assets/manta-pacific/',
  [ChainId.MantaPacificTestnet]: '',
  [ChainId.Combo]: '',
  [ChainId.ComboTestnet]: '',
  [ChainId.Mantle]: 'https://element.market/assets/mantle/',
  [ChainId.MantleTestnet]: '',
  [ChainId.Sepolia]: ''
}
export const z2048Constant: any = {
  [ChainId.LineaMainnet]: {
    marketLinkPre: MarketLinkPre[ChainId.LineaMainnet],
    graphql: 'https://linea-mainnet-graph.zypher.game/subgraphs/name/linea/game2048',
    Contracts: {
      ZkGame2048: '0x490d76B1e9418a78B5403740BD70dfD4F6007E0f',
      Z2048SBT: '0xA3ebaeF88Ef44b2B3D70FFd77E91cF002e5E72Ce',
      TILE_REWARD_HELPER_ADDRESS: '0x743281dB4c21f138a62BE1B8e9D3aa0aD167C7eE'
    }
  },
  [ChainId.OPBNB]: {
    marketLinkPre: MarketLinkPre[ChainId.OPBNB],
    graphql: 'https://opbnb-mainnet-graph.zypher.game/subgraphs/name/opbnb/game2048',
    Contracts: {
      ZkGame2048: '0x490d76B1e9418a78B5403740BD70dfD4F6007E0f',
      Z2048SBT: '0xA3ebaeF88Ef44b2B3D70FFd77E91cF002e5E72Ce',
      TILE_REWARD_HELPER_ADDRESS: '0x743281dB4c21f138a62BE1B8e9D3aa0aD167C7eE'
    }
  },
  [ChainId.OPBNBTEST]: {
    marketLinkPre: MarketLinkPre[ChainId.OPBNBTEST],
    graphql: 'https://opbnb-testnet-graph.zypher.game/subgraphs/name/opbnb/game2048',
    Contracts: {
      ZkGame2048: '0x1577507d2D3c82851ee17dA0d24feEBbdF1e4f32',
      Z2048SBT: '0x43d2aAAE4110a4887557c73C1BD74690AbaacF5B',
      TILE_REWARD_HELPER_ADDRESS: '0x4bfb9bf1F8ff5c79dc82c38711f8eb021a2c6C3e'
    }
  },
  [ChainId.ScrollSepoliaTestnet]: {
    marketLinkPre: MarketLinkPre[ChainId.ScrollSepoliaTestnet],
    graphql: 'https://scroll-sepolia-graph.zypher.game/subgraphs/name/scroll/game2048',
    Contracts: {
      ZkGame2048: '0x159879B72B1bE7007aC56c4DcbbC31545F8D57bb',
      Z2048SBT: '0xC3915d66C197d15b51C3ED26012eC5836915b3a6',
      TILE_REWARD_HELPER_ADDRESS: '0xc55A0c445A80C8598b4757A07d3784e6F7d2b661'
    }
  },
  [ChainId.LineaTestnet]: {
    marketLinkPre: MarketLinkPre[ChainId.LineaTestnet],
    graphql: 'https://linea-goerli-graph.zypher.game/subgraphs/name/linea/game2048',
    Contracts: {
      ZkGame2048: '0x8647178e0F1A130E1628D114e89988d558fbC734',
      Z2048SBT: '0xD5052D8a2C2ff9160d132fcc1af17f8b7e96F230',
      TILE_REWARD_HELPER_ADDRESS: '0x0a0BD82C5eB8213A24E37cC7297d4F0cD231e417'
    }
  },
  [ChainId.MantleTestnet]: {
    marketLinkPre: MarketLinkPre[ChainId.MantleTestnet],
    graphql: 'https://mantle-testnet-graph.zypher.game/subgraphs/name/mantle/game2048',
    Contracts: {
      ZkGame2048: '0x8647178e0F1A130E1628D114e89988d558fbC734',
      Z2048SBT: '0xD5052D8a2C2ff9160d132fcc1af17f8b7e96F230',
      TILE_REWARD_HELPER_ADDRESS: '0x0a0BD82C5eB8213A24E37cC7297d4F0cD231e417'
    }
  },
  [ChainId.Mantle]: {
    marketLinkPre: MarketLinkPre[ChainId.Mantle],
    graphql: 'https://mantle-mainnet-graph.zypher.game/subgraphs/name/mantle/game2048',
    Contracts: {
      ZkGame2048: '0x490d76B1e9418a78B5403740BD70dfD4F6007E0f',
      Z2048SBT: '0xA3ebaeF88Ef44b2B3D70FFd77E91cF002e5E72Ce',
      TILE_REWARD_HELPER_ADDRESS: '0x743281dB4c21f138a62BE1B8e9D3aa0aD167C7eE'
      // GPToken: '0x9CCC1463f90782c5Cb3F39E2Cb92c670e894c1EB' ,
    }
  },
  [ChainId.ComboTestnet]: {
    marketLinkPre: MarketLinkPre[ChainId.ComboTestnet],
    graphql: 'https://combo-testnet-graph.zypher.game/subgraphs/name/combo/game2048',
    Contracts: {
      ZkGame2048: '0x8A8B889B8120c339f23E835d2E440772ad79A6fd',
      Z2048SBT: '0x67DF9bD39c62F92b51a35b8c5df55846ddCb66B7',
      TILE_REWARD_HELPER_ADDRESS: '0xd69a32155A909298Dcec3A5AE05B2a610c300481'
    }
  },
  [ChainId.MantaPacificTestnet]: {
    marketLinkPre: MarketLinkPre[ChainId.MantaPacificTestnet],
    graphql: 'https://manta-testnet-graph.zypher.game/subgraphs/name/manta/game2048',
    Contracts: {
      ZkGame2048: '0x7b00c14c7D0087C3a0d37cAbbc6924566B4481E9',
      Z2048SBT: '0xD5052D8a2C2ff9160d132fcc1af17f8b7e96F230',
      TILE_REWARD_HELPER_ADDRESS: '0xAeb65CCDe3b88CA9095D7Cc1d8ACa82ae865AcA6'
    }
  },
  [ChainId.MantaPacificMainnet]: {
    marketLinkPre: MarketLinkPre[ChainId.MantaPacificMainnet],
    graphql: 'https://manta-mainnet-graph.zypher.game/subgraphs/name/combo/game2048',
    Contracts: {
      ZkGame2048: '0x490d76B1e9418a78B5403740BD70dfD4F6007E0f',
      Z2048SBT: '0xA3ebaeF88Ef44b2B3D70FFd77E91cF002e5E72Ce',
      TILE_REWARD_HELPER_ADDRESS: '0x743281dB4c21f138a62BE1B8e9D3aa0aD167C7eE'
    }
  },
  [ChainId.Combo]: {
    marketLinkPre: MarketLinkPre[ChainId.Combo],
    graphql: 'https://combo-mainnet-graph.zypher.game/subgraphs/name/combo/game2048',
    Contracts: {
      // Z2048SBT: '0xA3ebaeF88Ef44b2B3D70FFd77E91cF002e5E72Ce' ,
      Z2048SBT: '0x5Ce213F4021b95e6268f8ce058502E755eb00B57',
      ZkGame2048: '0x490d76B1e9418a78B5403740BD70dfD4F6007E0f',
      TILE_REWARD_HELPER_ADDRESS: '0x743281dB4c21f138a62BE1B8e9D3aa0aD167C7eE'
    }
  }
  // [taikoKatla.id]: {
  //   BASE_GF_URL: 'https://taiko-testnet-graph.zypher.game/subgraphs/name/taiko/game2048',
  //   Contracts: {
  //     Z2048SBT: '0x79aDd9Be54429A034B2F89E8C5C46CEC5F9a2359' ,
  //     ZkGame2048: '0x1a3Dc9af66997FA5142c18BB7A1dE89ae9E75a4c' ,
  //     ZkGame2048API: '0x218bFE1Ae8A6cE773d88127964f8b99Cb958E70A' ,
  //   },
  // },
}

// export const z2048Constant = {
//   [ChainId.OPBNB]: {
//     marketLinkPre: 'https://element.market/assets/opbnb/',
//     graphql: 'https://opbnb-mainnet-graph.zypher.game/subgraphs/name/opbnb/game2048',
//     Contracts: {
//       ZkGame2048: '0x490d76B1e9418a78B5403740BD70dfD4F6007E0f',
//       Z2048SBT: '0xA3ebaeF88Ef44b2B3D70FFd77E91cF002e5E72Ce',
//       TILE_REWARD_HELPER_ADDRESS: '0x743281dB4c21f138a62BE1B8e9D3aa0aD167C7eE'
//     }
//   },
//   [ChainId.OPBNBTEST]: {
//     marketLinkPre: '',
//     graphql: 'https://opbnb-testnet-graph.zypher.game/subgraphs/name/opbnb/game2048',
//     Contracts: {
//       ZkGame2048: '0x1577507d2D3c82851ee17dA0d24feEBbdF1e4f32',
//       Z2048SBT: '0x43d2aAAE4110a4887557c73C1BD74690AbaacF5B',
//       TILE_REWARD_HELPER_ADDRESS: '0x4bfb9bf1F8ff5c79dc82c38711f8eb021a2c6C3e'
//     }
//   },
//   [ChainId.ScrollSepoliaTestnet]: {
//     marketLinkPre: '',
//     graphql: 'https://scroll-sepolia-graph.zypher.game/subgraphs/name/scroll/game2048',
//     Contracts: {
//       ZkGame2048: '0x159879B72B1bE7007aC56c4DcbbC31545F8D57bb',
//       Z2048SBT: '0xC3915d66C197d15b51C3ED26012eC5836915b3a6',
//       TILE_REWARD_HELPER_ADDRESS: '0xc55A0c445A80C8598b4757A07d3784e6F7d2b661'
//     }
//   },
//   [ChainId.LineaMainnet]: {
//     marketLinkPre: 'https://element.market/assets/linea/',
//     graphql: 'https://linea-mainnet-graph.zypher.game/subgraphs/name/linea/game2048',
//     Contracts: {
//       Z2048SBT: '0xA3ebaeF88Ef44b2B3D70FFd77E91cF002e5E72Ce',
//       ZkGame2048: '0x490d76B1e9418a78B5403740BD70dfD4F6007E0f',
//       TILE_REWARD_HELPER_ADDRESS: '0x743281dB4c21f138a62BE1B8e9D3aa0aD167C7eE'
//     }
//   },

//   [ChainId.LineaTestnet]: {
//     marketLinkPre: '',
//     graphql: 'https://linea-goerli-graph.zypher.game/subgraphs/name/linea/game2048',
//     Contracts: {
//       ZkGame2048: '0x8647178e0F1A130E1628D114e89988d558fbC734',
//       Z2048SBT: '0xD5052D8a2C2ff9160d132fcc1af17f8b7e96F230',
//       TILE_REWARD_HELPER_ADDRESS: '0x0a0BD82C5eB8213A24E37cC7297d4F0cD231e417'
//     }
//   },
//   [ChainId.MantleTestnet]: {
//     marketLinkPre: '',
//     graphql: 'https://mantle-testnet-graph.zypher.game/subgraphs/name/mantle/game2048',
//     Contracts: {
//       ZkGame2048: '0x8647178e0F1A130E1628D114e89988d558fbC734',
//       Z2048SBT: '0xD5052D8a2C2ff9160d132fcc1af17f8b7e96F230',
//       TILE_REWARD_HELPER_ADDRESS: '0x0a0BD82C5eB8213A24E37cC7297d4F0cD231e417'
//     }
//   },
//   [ChainId.Combo]: {
//     marketLinkPre: '',
//     graphql: 'https://combo-mainnet-graph.zypher.game/subgraphs/name/combo/game2048',
//     Contracts: {
//       ZkGame2048: '0x490d76B1e9418a78B5403740BD70dfD4F6007E0f',
//       Z2048SBT: '0x5Ce213F4021b95e6268f8ce058502E755eb00B57',
//       TILE_REWARD_HELPER_ADDRESS: '0x743281dB4c21f138a62BE1B8e9D3aa0aD167C7eE'
//     }
//   },
//   [ChainId.ComboTestnet]: {
//     marketLinkPre: '',
//     graphql: 'https://combo-testnet-graph.zypher.game/subgraphs/name/combo/game2048',
//     Contracts: {
//       ZkGame2048: '0x036dBaF45357e713e494Ab7fb182642315Af271F',
//       Z2048SBT: '0xD5052D8a2C2ff9160d132fcc1af17f8b7e96F230',
//       TILE_REWARD_HELPER_ADDRESS: '0xAeb65CCDe3b88CA9095D7Cc1d8ACa82ae865AcA6'
//     }
//   },
//   [ChainId.MantaPacificMainnet]: {
//     marketLinkPre: '',
//     graphql: 'https://manta-mainnet-graph.zypher.game/subgraphs/name/combo/game2048',
//     Contracts: {
//       ZkGame2048: '0x7b00c14c7D0087C3a0d37cAbbc6924566B4481E9',
//       Z2048SBT: '0xD5052D8a2C2ff9160d132fcc1af17f8b7e96F230',
//       TILE_REWARD_HELPER_ADDRESS: '0xAeb65CCDe3b88CA9095D7Cc1d8ACa82ae865AcA6'
//     }
//   },
//   [ChainId.MantaPacificTestnet]: {
//     marketLinkPre: '',
//     graphql: 'https://manta-testnet-graph.zypher.game/subgraphs/name/manta/game2048',
//     Contracts: {
//       ZkGame2048: '0x7b00c14c7D0087C3a0d37cAbbc6924566B4481E9',
//       Z2048SBT: '0xD5052D8a2C2ff9160d132fcc1af17f8b7e96F230',
//       TILE_REWARD_HELPER_ADDRESS: '0xAeb65CCDe3b88CA9095D7Cc1d8ACa82ae865AcA6'
//     }
//   }
// }
export const z2048SupportedChainIds = ({ env }: { env: string }): ChainId[] => {
  const allChain = Object.keys(z2048Constant)
  if (env === 'develop') {
    return allChain.map(v => Number(v) as ChainId)
  }
  return allChain.filter(v => !isTestnet[Number(v) as ChainId]).map(v => Number(v) as ChainId)
}

function getMaxTile(b: bigint): BigNumberJs {
  let m = 0n
  for (let i = 0; i < 16; i++) {
    const value = b & 31n
    b >>= 5n
    if (value > m) {
      m = value
    }
  }
  return new BigNumberJs(m.toString())
}

export const useRecentZ2048FromContract = ({
  env
}: {
  env: string
}): {
  list: Map<ChainId, I2048GameList[]> | undefined
  hasError: boolean
} => {
  const [list, setList] = useState<Map<ChainId, I2048GameList[]>>()
  const [hasError, setHasError] = useState(false)
  const fetch2048GameInfos = useCallback(async () => {
    try {
      const chainIdList = z2048SupportedChainIds({ env })
      const lastTokenIdListRes = await batchRequestContracts({
        contractFun: z2048SBT,
        contracts: {
          contractName: IContractName.Z2048SBT,
          method: '_tokenId',
          params: []
        },
        defaultValue: new BigNumberJs('0'),
        chainIdList,
        addressList: Object.fromEntries(chainIdList.map(chainId => [chainId, z2048Constant[chainId].Contracts.Z2048SBT])) as Record<ChainId, Address>
      })
      const tokenIdList = Object.fromEntries(
        lastTokenIdListRes.map(v => {
          let arr = new Array(20).fill(0)
          arr = arr.map((_, index) => new BigNumberJs(v.response).minus(index).toFixed())
          return [v.chainId, arr.filter(vv => new BigNumberJs(vv).gt(0)).map(vv => ({ tokenId: vv }))]
        })
      ) as Record<ChainId, { tokenId: string }[]>
      const { metadataList, rewardParamsListRes, maxTileList } = await fecth2048({
        chainIdList: chainIdList,
        tokenIdList: tokenIdList
      })
      const map = new Map()
      chainIdList.map((chainId, index) => {
        const result = metadataList[chainId].map((v: any) => {
          const maxTileIndex = maxTileList[chainId].indexOf(v.maxTile)
          const reward = rewardParamsListRes[index].response
            ? new BigNumberJs(rewardParamsListRes[index].response[maxTileIndex][0].hex).dividedBy(divisorBigNumber).toFixed()
            : '-'
          return {
            ...v,
            chainId: chainId,
            reward: reward
          }
        })
        map.set(chainId, result)
      })
      setList(map)
    } catch (e) {
      console.error('useRecentZ2048FromContract error: ', e)
      setHasError(true)
    }
  }, [])
  useEffect(() => {
    fetch2048GameInfos()
  }, [])
  return {
    list: list,
    hasError: hasError
  }
}

export const useZ2048AccountFromGraph = ({
  z2048HistoryList,
  setZ2048HistoryList
}: {
  z2048HistoryList: I2048GameList[]
  setZ2048HistoryList: React.Dispatch<React.SetStateAction<I2048GameList[]>>
}): { z2048GamesLoading: boolean } => {
  const [z2048GamesLoading, setZ2048GamesLoading] = useState<boolean>(false)
  const { chainId, account } = useActiveWeb3React()
  // const { chainId, account } = {
  //   chainId: ChainId.MantaPacificTestnet,
  //   account: '0x29110cf8514365e7cc4649a5a975984a917765d9'
  // }
  const getPlayedGames = useCallback(async () => {
    setZ2048HistoryList([])
    try {
      if (chainId && account) {
        setZ2048GamesLoading(true)
        const api = z2048Constant?.[chainId]?.graphql
        if (api) {
          const result = await request(api, {
            method: 'POST',
            data: JSON.stringify({
              query: `{
                transfers(where: {from: "0x0000000000000000000000000000000000000000", to: "${account}"}, orderBy: tokenId) {
                    tokenId
                }
            }`,
              variables: {},
              operationName: 'MyQuery'
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          if (result.data && result.data.data && result.data.data.transfers && result.data.data.transfers.length) {
            const tokenIdList = result.data.data.transfers.map((v: any) => v['tokenId'])
            const chainIdList = [chainId]
            const { metadataList, rewardParamsListRes, maxTileList } = await fecth2048({
              chainIdList: chainIdList,
              tokenIdList: {
                [chainId]: tokenIdList.map((v: any) => ({ tokenId: v }))
              }
            })
            const map = new Map()
            chainIdList.map((_chainId, index) => {
              const contractResult = metadataList[_chainId].map((v: any) => {
                const maxTileIndex = maxTileList[_chainId].indexOf(v.maxTile)
                const reward = rewardParamsListRes[index].response
                  ? new BigNumberJs(rewardParamsListRes[index].response[maxTileIndex][0].hex).dividedBy(divisorBigNumber).toFixed()
                  : '-'
                return {
                  ...v,
                  chainId: _chainId,
                  reward: reward
                }
              })
              map.set(_chainId, contractResult)
            })
            if ((map.size && map.get(chainId).length) || !isEqual(z2048HistoryList, map.get(chainId))) {
              const histroy = map.get(chainId) as I2048GameList[]
              // 获取link
              const imgLink = await getTokenUrl({ tokenIdList, chainId })
              if (imgLink) {
                const imgLinkMap = new Map(imgLink)
                const data = histroy.map(v => ({
                  ...v,
                  tokenURL: imgLinkMap.get(v.tokenId)
                }))
                setZ2048HistoryList(data)
              }
              setZ2048GamesLoading(false)
            }
          } else {
            setZ2048GamesLoading(false)
            setZ2048HistoryList([])
          }
        } else {
          setZ2048GamesLoading(false)
        }
      }
    } catch (e) {
      console.error('useZ2048AccountFromGraph: ', e)
    }
  }, [chainId, account])
  useEffect(() => {
    if (chainId && account) {
      getPlayedGames()
    }
  }, [chainId, account])
  return {
    z2048GamesLoading
  }
}
const getTokenUrl = async ({ tokenIdList, chainId }: { tokenIdList: string[]; chainId: ChainId }): Promise<[string, string][] | undefined> => {
  const tokenIdListParams = tokenIdList.map(v => ({
    reference: 'tokenId' + v,
    contractAddress: z2048Constant[chainId].Contracts.Z2048SBT,
    abi: NFT_ABI,
    calls: [{ methodName: 'tokenURI', reference: 'tokenURI' + v, methodParameters: [v] }]
  }))
  const multicall = await MulticallContract(chainId)
  if (multicall) {
    const { results } = await multicall.call(tokenIdListParams)
    if (results) {
      const imagePath: [string, string][] = tokenIdList.map(v => {
        const base64 = results[`tokenId${v}`]['callsReturnContext'][0]['returnValues'][0].replace('data:application/json;base64,', '')
        const decodedData = atob(base64)
        const json = JSON.parse(decodedData)
        return [v, json['image']]
      })
      return imagePath
    }
  }
  return undefined
}
const fecth2048 = async ({
  chainIdList,
  tokenIdList
}: {
  chainIdList: ChainId[]
  tokenIdList:
    | Partial<
        Record<
          ChainId,
          {
            tokenId: string
          }[]
        >
      >
    | any
}): Promise<{ metadataList: { [k: string]: any }; rewardParamsListRes: IContractResponse[]; maxTileList: { [k: string]: unknown[] } }> => {
  const params = Object.fromEntries(
    chainIdList.map(chainId => {
      return [
        chainId,
        [
          ...(tokenIdList[chainId] ?? []).map(({ tokenId }: any) => {
            return {
              reference: 'metadata' + tokenId,
              contractAddress: z2048Constant[chainId].Contracts.Z2048SBT,
              abi: NFT_ABI,
              calls: [{ methodName: 'metadata', reference: 'metadata' + tokenId, methodParameters: [Number(tokenId)] }]
            }
          })
        ]
      ]
    })
  )
  const metadataListRes = await batchRequestMulticall({
    chainIdList: chainIdList,
    params
  })
  const metadataList = Object.fromEntries(
    metadataListRes.map(v => {
      const chainId = v.chainId as unknown as ChainId
      const ress = (v.response ?? []).map((vv: any, index: number) => {
        const [moves, time, beginTime, resultBig, player, gameIdBig] = vv ?? []
        const maxTile = new BigNumberJs(2).exponentiatedBy(getMaxTile(BigInt(Math.trunc(new BigNumberJs(resultBig.hex).toNumber()))))
        const tokenId = tokenIdList[chainId][index].tokenId
        return {
          tokenId: tokenId,
          tokenIdLink: z2048Constant[chainId].marketLinkPre + z2048Constant[chainId].Contracts.Z2048SBT + '/' + tokenId,
          tokenIdStr: chainIdPre[chainId] + '#' + tokenId,
          moves,
          time,
          beginTime,
          beginTimeStr: getFormattedTime(Number(beginTime)),
          result: new BigNumberJs(resultBig.hex).toFixed(),
          player,
          gameId: new BigNumberJs(gameIdBig.hex).toFixed(),
          maxTile: maxTile.toString()
        }
      })
      return [chainId, ress]
    })
  )
  const maxTileList = Object.fromEntries(chainIdList.map(chainId => [chainId, [...new Set(metadataList[chainId].map((v: any) => v.maxTile))]]))
  // reward
  const rewardParams = Object.fromEntries(
    chainIdList.map(chainId => [
      chainId,
      [
        ...maxTileList[chainId].map(maxTile => ({
          reference: 'tokenRewards' + maxTile,
          contractAddress: z2048Constant[chainId].Contracts.TILE_REWARD_HELPER_ADDRESS,
          abi: TILE_REWARD_HELPER_ABI,
          calls: [{ methodName: 'tokenRewards', reference: 'tokenRewards' + maxTile, methodParameters: [maxTile] }]
        }))
      ]
    ])
  )
  const rewardParamsListRes = await batchRequestMulticall({
    chainIdList: chainIdList,
    params: rewardParams
  })
  return { metadataList, rewardParamsListRes, maxTileList }
}
