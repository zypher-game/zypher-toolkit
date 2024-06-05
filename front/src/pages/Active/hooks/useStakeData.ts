import { AddressZero } from '@ethersproject/constants'
import {
  activeTokenList,
  ChainId,
  Currency,
  divisorBigNumber,
  erc20Abi,
  TVLStakingSupportedChainId,
  tvlTokens,
  useActiveWeb3React,
  useRecoilState,
  useSetRecoilState
} from '@ui/src'
import { BigNumberJs } from '@ui/src'
import { ethers } from 'ethers'
import { useCallback, useEffect } from 'react'

import { crHeroAbi } from '@/contract/crHero'
import { TVLStakingABI } from '@/contract/tvlStaking'
import { batchRequestMulticall, batchRequestNativeContracts } from '@/utils/batchRequestContracts'
import { calculateSumByNumber } from '@/utils/calculateSum'

import {
  initData,
  IStakingDataState,
  isTvlDataLoadingState,
  ITVLStakingData,
  restakingDataState,
  tvlStakingDataState,
  tvlStakingDataV2Init
} from '../state/activeState'
import { useActiveData } from './useActiveData'
import { useStakingCall } from './useDataCall'

export const useStake = () => {
  const { activeData } = useActiveData()
  const { getStakingData } = useStakeData()
  const { id, accountAddress } = activeData
  const { account } = useActiveWeb3React()
  const [, setTvlStakingData] = useRecoilState(tvlStakingDataState)
  useEffect(() => {
    if (id) {
      // 读取数据
      getStakingData()
    }
  }, [id])
  useEffect(() => {
    if (account && accountAddress !== account) {
      setTvlStakingData(tvlStakingDataV2Init)
    }
  }, [account, accountAddress])
}
export const useStakeData = () => {
  const { account, chainId: nativeChainId } = useActiveWeb3React()
  const [isDataLoading, setIsDataLoading] = useRecoilState(isTvlDataLoadingState)
  const [, setTvlStakingData] = useRecoilState(tvlStakingDataState)
  // const { isRegistered } = tvlStakingData
  const { activeData, setActiveData } = useActiveData()
  const { id } = activeData
  const { getStaking } = useStakingCall()

  const setRestakingData = useSetRecoilState(restakingDataState)
  const getNative = useCallback(async (): Promise<string[][]> => {
    if (!id) {
      throw Error('getNative Error by no id')
    }
    const value = await batchRequestNativeContracts({
      chainIdList: TVLStakingSupportedChainId as unknown as ChainId[],
      address: account,
      nativeMethod: 'getBalance',
      defaultValue: new BigNumberJs('0')
    })
    return value.map(v => {
      if (v.response) {
        return [v.response.toString(), new BigNumberJs(v.response.toString()).dividedBy(divisorBigNumber).toFormat(2)] as string[]
      }
      return ['0', '0']
    })
  }, [account, id, nativeChainId])
  const getStakingData = useCallback(async () => {
    try {
      if (account && nativeChainId) {
        if (isDataLoading) {
          return
        }
        setIsDataLoading(true)
        // 获取token decimal、 approve 、 余额、stake值、  claim 量
        const nativeValue: string[][] = await getNative()

        const params = Object.fromEntries(
          TVLStakingSupportedChainId.map(chainId => {
            return [
              chainId,
              [
                ...Object.values(tvlTokens[chainId])
                  .filter((v: any) => v.address !== AddressZero)
                  .map((v: any) => {
                    return {
                      reference: 'allowance' + v.symbol,
                      contractAddress: v.address,
                      abi: erc20Abi,
                      calls: [
                        {
                          methodName: 'allowance',
                          reference: 'allowance' + v.symbol,
                          methodParameters: [account, activeTokenList[chainId].Staking]
                        }
                      ]
                    }
                  }),
                ...Object.values(tvlTokens[chainId])
                  .filter((v: any) => v.address !== AddressZero)
                  .map((v: any) => {
                    return {
                      reference: 'symbol' + v.symbol,
                      contractAddress: v.address,
                      abi: erc20Abi,
                      calls: [{ methodName: 'symbol', reference: 'symbol' + v.symbol }]
                    }
                  }),
                ...Object.values(tvlTokens[chainId])
                  .filter((v: any) => v.address !== AddressZero)
                  .map((v: any) => {
                    return {
                      reference: 'name' + v.symbol,
                      contractAddress: v.address,
                      abi: erc20Abi,
                      calls: [{ methodName: 'name', reference: 'name' + v.symbol }]
                    }
                  }),
                ...Object.values(tvlTokens[chainId])
                  .filter((v: any) => v.address !== AddressZero)
                  .map((v: any) => {
                    return {
                      reference: 'decimal' + v.symbol,
                      contractAddress: v.address,
                      abi: erc20Abi,
                      calls: [{ methodName: 'decimals', reference: 'decimal' + v.symbol }]
                    }
                  }),
                ...Object.values(tvlTokens[chainId])
                  .filter((v: any) => v.address !== AddressZero)
                  .map((v: any) => {
                    return {
                      reference: 'balanceOf' + v.symbol,
                      contractAddress: v.address,
                      abi: erc20Abi,
                      calls: [{ methodName: 'balanceOf', reference: 'balanceOf' + v.symbol, methodParameters: [account] }]
                    }
                  }),
                // 最少质押多少给 SBT
                {
                  reference: 'mintMinimum' + chainId, // 最少质押多少给 SBT
                  contractAddress: activeTokenList[chainId].Staking,
                  abi: TVLStakingABI,
                  calls: [
                    {
                      methodName: 'mintMinimum',
                      reference: 'mintMinimum' + chainId
                    }
                  ]
                },
                {
                  reference: 'END_TIME' + chainId, // 得到当前是第几周
                  contractAddress: activeTokenList[chainId].Staking,
                  abi: TVLStakingABI,
                  calls: [
                    {
                      methodName: 'END_TIME',
                      reference: 'END_TIME' + chainId
                    }
                  ]
                },
                {
                  reference: 'claimable' + chainId, // 得到当前是第几周
                  contractAddress: activeTokenList[chainId].Staking,
                  abi: TVLStakingABI,
                  calls: [
                    {
                      methodName: 'claimable',
                      reference: 'claimable' + chainId,
                      methodParameters: [account, Object.values(tvlTokens[chainId]).map((v: any) => v.address)]
                    }
                  ]
                },
                {
                  reference: 'sbtBalanceOf' + chainId, // 得到当前是第几周
                  contractAddress: activeTokenList[chainId].Soulbound,
                  abi: erc20Abi,
                  calls: [{ methodName: 'balanceOf', reference: 'sbtBalanceOf' + chainId, methodParameters: [account] }]
                },
                {
                  reference: 'getMinStake' + chainId, // Cr最少质押多少
                  contractAddress: activeTokenList[chainId].CRHero,
                  abi: crHeroAbi,
                  calls: [{ methodName: 'getMinStake', reference: 'getMinStake' + chainId }]
                },
                ...Object.values(tvlTokens[chainId])
                  .filter((v: any) => v.address !== AddressZero)
                  .map((v: any) => {
                    return {
                      reference: 'getMintAmount' + v.symbol,
                      contractAddress: activeTokenList[chainId].CRHero, // 拥有cr Hero的量
                      abi: crHeroAbi,
                      calls: [{ methodName: 'getMintAmount', reference: 'getMintAmount' + v.symbol, methodParameters: [v.address, account] }]
                    }
                  }),
                // 最后一位是getWeek  不要变
                {
                  reference: 'getWeek' + chainId, // 得到当前是第几周
                  contractAddress: activeTokenList[chainId].Staking,
                  abi: TVLStakingABI,
                  calls: [{ methodName: 'getWeek', reference: 'getWeek' + chainId }]
                }
              ]
            ]
          })
        )
        const res = await batchRequestMulticall({
          chainIdList: TVLStakingSupportedChainId as unknown as ChainId[],
          params
        })
        console.log({ params, res })
        const week = Object.fromEntries(res.map(v => [v.chainId, new BigNumberJs(v.response[v.response.length - 1][0].hex).toNumber()]))
        const nextParams = Object.fromEntries(
          TVLStakingSupportedChainId.map(chainId => {
            return [
              chainId,
              [
                ...Object.values(tvlTokens[chainId]).map((v: any) => {
                  return {
                    reference: 'getWeeklyWeight' + v.symbol,
                    contractAddress: activeTokenList[chainId].Staking,
                    abi: TVLStakingABI,
                    calls: [
                      {
                        methodName: 'getWeeklyWeight',
                        reference: 'getWeeklyWeight' + v.symbol,
                        methodParameters: [account, v.address, week[chainId]]
                      }
                    ]
                  }
                })
              ]
            ]
          })
        )
        const nextRes = await batchRequestMulticall({
          chainIdList: TVLStakingSupportedChainId as unknown as ChainId[],
          params: nextParams,
          defaultValue: 0
        })
        let stakeDataFromApi: any
        try {
          stakeDataFromApi = await Promise.all(TVLStakingSupportedChainId.map(v => getStaking({ userId: id, chainId: v })))
          setRestakingData(
            Object.fromEntries(TVLStakingSupportedChainId.map((vvv, index) => [vvv, stakeDataFromApi[index]])) as unknown as Record<
              ChainId,
              IStakingDataState
            >
          )
        } catch (stakeDataFromApiErr: any) {}
        console.log({ nextParams, nextRes, stakeDataFromApi })

        const userValue = Object.fromEntries(
          TVLStakingSupportedChainId.map(chain => [
            chain,
            {
              END_TIME: '0',
              mintMinimum: '0',
              sbtBalanceOf: '0',
              getMinStake: '0'
            }
          ])
        )
        const resMap = Object.fromEntries(
          res.map((v, chainIndex) => {
            const _chainId = v.chainId

            const nextMethodArr = nextRes[chainIndex].method.split(',')

            const methodArr = v.method.split(',')

            const mintMinimumIndex = methodArr.indexOf(`mintMinimum${_chainId}`)
            userValue[_chainId]['mintMinimum'] = new BigNumberJs(v.response[mintMinimumIndex][0].hex).toFixed()

            const getMinStakeIndex = methodArr.indexOf(`getMinStake${_chainId}`)
            console.log({ getMinStakeIndex })
            userValue[_chainId]['getMinStake'] =
              getMinStakeIndex === -1 ? '0' : new BigNumberJs(v.response[getMinStakeIndex][0].hex).dividedBy(divisorBigNumber).toFixed()
            console.log('Asdfsadf', userValue[_chainId]['getMinStake'])

            const claimableIndex = methodArr.indexOf(`claimable${_chainId}`)

            const END_TIMEIndex = methodArr.indexOf(`END_TIME${_chainId}`)
            userValue[_chainId]['END_TIME'] = new BigNumberJs(v.response[END_TIMEIndex][0].hex).toFixed()

            const sbtBalanceOfIndex = methodArr.indexOf(`sbtBalanceOf${_chainId}`)

            userValue[_chainId]['sbtBalanceOf'] = new BigNumberJs(v.response[sbtBalanceOfIndex][0].hex).toFixed()
            console.log({ sbtBalanceOf: userValue[_chainId]['sbtBalanceOf'] })
            const tvlObj: [string, ITVLStakingData][] = Object.values(tvlTokens[_chainId]).map((vv: any, index: number) => {
              const allowanceIndex = methodArr.indexOf(`allowance${vv.symbol}`)
              const symbolIndex = methodArr.indexOf(`symbol${vv.symbol}`)
              const nameIndex = methodArr.indexOf(`name${vv.symbol}`)
              const decimalIndex = methodArr.indexOf(`decimal${vv.symbol}`)
              const balanceOfIndex = methodArr.indexOf(`balanceOf${vv.symbol}`)
              const crHeroIndex = methodArr.indexOf(`getMintAmount${vv.symbol}`)

              const allowanceBig = v.response[allowanceIndex] ? new BigNumberJs(v.response[allowanceIndex][0].hex) : '0'
              const symbol = v.response[symbolIndex][0]
              const name = v.response[nameIndex][0]
              const decimal = v.response[decimalIndex][0]
              const balanceBig = new BigNumberJs(v.response[balanceOfIndex][0].hex)
              const earnGP = v.response[claimableIndex][index]
              const earnGPBig = new BigNumberJs(earnGP.hex)
              const crHero = new BigNumberJs(v.response[crHeroIndex][0].hex).toFixed()

              const getWeeklyWeightIndex = nextMethodArr.indexOf(`getWeeklyWeight${vv.symbol}`)

              const stake = nextRes[chainIndex].response[getWeeklyWeightIndex]
              const userStakeBig = new BigNumberJs(stake ? stake[0].hex : '0')
              const totalStakeBig = new BigNumberJs(stake ? stake[1].hex : '0')
              // let stakeDataFromApiItemI = '0'
              // if (stakeDataFromApiItem) {
              //   stakeDataFromApiItemI = stakeDataFromApiItem.records[vv.address.toLowerCase()].total
              // }
              // const totalStakeBig = new BigNumberJs(stakeDataFromApi[index])
              return [
                vv.symbol,
                {
                  ...initData,
                  ...vv,
                  crHeroAmount: crHero,
                  chainId: _chainId,
                  allowance: allowanceBig.toString(),
                  symbol: symbol,
                  name: name,
                  decimal: decimal,
                  balance: balanceBig.toFixed(),
                  balanceStr: balanceBig.dividedBy(new BigNumberJs('10').exponentiatedBy(decimal)).toFormat(2),
                  earnGP: earnGPBig.toFixed(),
                  earnGPStr: earnGPBig.dividedBy(divisorBigNumber).toFormat(2),
                  userStakedAmount: userStakeBig.toFixed(),
                  userStakedAmountStr: userStakeBig.dividedBy(divisorBigNumber).toFormat(2),
                  totalStakedAmount: totalStakeBig.toFixed(),
                  totalStakedAmountStr: totalStakeBig.dividedBy(divisorBigNumber).toFormat(2),
                  ratio: totalStakeBig.toFixed() !== '0' ? userStakeBig.dividedBy(totalStakeBig).times(100).toFixed(0) : '0',
                  END_TIME: userValue[_chainId]['END_TIME'],
                  getMinStake: userValue[_chainId]['getMinStake']
                } as ITVLStakingData
              ]
            })
            const WNative = tvlObj.filter(ddv => ddv[0] === 'W' + Currency[_chainId])[0]
            return [
              _chainId,
              Object.fromEntries([
                [
                  Currency[_chainId],
                  {
                    ...initData,
                    ...WNative[1],
                    address: AddressZero,
                    symbol: Currency[_chainId],
                    name: Currency[_chainId],
                    chainId: v.chainId,
                    allowance: '999999999999999999999999999999999999999999999',
                    balance: nativeValue[chainIndex][0],
                    balanceStr: nativeValue[chainIndex][1],
                    index: 0,
                    END_TIME: userValue[_chainId]['END_TIME'],
                    getMinStake: userValue[_chainId]['getMinStake']
                  }
                ],
                ...tvlObj
              ])
            ]
          })
        ) as unknown as Record<ChainId, Record<string, ITVLStakingData>>
        console.log({ resMap })
        setTvlStakingData(resMap)

        const stakingData = Object.values(resMap[nativeChainId]).filter(vs => vs.address !== AddressZero)
        const userStakedAmount = ethers.utils
          .formatEther(calculateSumByNumber(stakingData.map(({ userStakedAmount: user }) => (user === '' ? '0' : user))))
          .toString()
        const crHeroBoxAmount = calculateSumByNumber(stakingData.map(({ crHeroAmount }) => (crHeroAmount === '' ? '0' : crHeroAmount)))

        const gpAmount = calculateSumByNumber(
          stakingData.map(({ earnGP }) => (earnGP === '' ? '0' : new BigNumberJs(earnGP).dividedBy(divisorBigNumber).toFixed(2)))
        )
        console.log({ userValue })
        TVLStakingSupportedChainId.forEach(chain => {
          setActiveData(
            pre => ({
              ...pre,
              userStakedAmount: userStakedAmount,
              userStakedAmountStr: new BigNumberJs(userStakedAmount).toFormat(2),
              crHeroBoxAmount: crHeroBoxAmount,
              dollarGpRewords: gpAmount,
              dollarGpRewordsStr: new BigNumberJs(gpAmount).toFormat(2),
              mintMinimum: userValue[chain]['mintMinimum'],
              mintMinimumStr: new BigNumberJs(userValue[chain]['mintMinimum']).dividedBy(divisorBigNumber).toFormat(2),
              sbtAmount: userValue[chain]['sbtBalanceOf']
            }),
            chain
          )
        })
        setIsDataLoading(false)
      }
    } catch (e) {
      console.log('getStakingData Error', e)
    }
  }, [getNative])

  return {
    getStakingData: getStakingData
  }
}

// export const useStakeDataFromApi = () => {
//   const { account } = useActiveWeb3React()
//   const { activeData } = useActiveData()
//   const getDataFromApi = useCallback(
//     async (chainId: ChainId): Promise<IStakingDataState | undefined> => {
//       if (canNext(account, chainId)) {
//         const res = await getStaking({ userId: activeData.id, chainId: chainId })
//         const records = Object.fromEntries(
//           res.records.map((v: any) => {
//             const tokenAddressBig = new BigNumberJs(v.tokenAddress)
//             const userStakeTotalBig = new BigNumberJs(v.userStakeTotal)
//             return [
//               v.tokenAddress,
//               {
//                 tokenAddress: v.tokenAddress,
//                 userStakeTotal: v.userStakeTotal,
//                 total: v.total,
//                 totalStr: '0',
//                 ratio: '0'
//               } as unknown as IStakingItem
//             ]
//           })
//         )
//         const { stakingAirdrop, stakingGrowthCoefficient, restakingAirdrop, restakingGrowthCoefficient } = res.statistics
//         const statistics = {
//           stakingAirdrop: stakingAirdrop,
//           stakingAirdropStr: '0',
//           stakingGrowthCoefficient: stakingGrowthCoefficient,
//           restakingAirdrop: restakingAirdrop,
//           restakingAirdropStr: '0',
//           restakingGrowthCoefficient: restakingGrowthCoefficient
//         }
//         return {
//           records: records,
//           statistics: statistics
//         }
//       }
//     },
//     [account, getStaking, JSON.stringify(activeData)]
//   )
//   return getDataFromApi
// }
