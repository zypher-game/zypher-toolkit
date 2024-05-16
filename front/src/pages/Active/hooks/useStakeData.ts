import { AddressZero } from '@ethersproject/constants'
import { ChainId, Currency, divisorBigNumber, erc20Abi, useActiveWeb3React, useRecoilState, useSetRecoilState } from '@ui/src'
import { ethers } from 'ethers'
import { useCallback, useEffect } from 'react'

import { crHeroAbi } from '@/contract/crHero'
import { TVLStakingABI } from '@/contract/tvlStaking'
import { batchRequestMulticall, batchRequestNativeContracts } from '@/utils/batchRequestContracts'
import BigNumberJs from '@/utils/BigNumberJs'
import { calculateSumByNumber } from '@/utils/calculateSum'

import { activeTokenList, TVLStakingSupportedChainId, tvlTokens } from '../constants/activeConstants'
import {
  initData,
  IRestakingDataState,
  isTvlDataLoadingState,
  ITVLStakingData,
  restakingDataState,
  tvlStakingDataState,
  tvlStakingDataV2Init
} from '../state/activeState'
import { useActiveData } from './useActiveData'
import { useRestakingCall } from './useDataCall'

export const useStake = () => {
  const { activeData } = useActiveData()
  const { getStakingData } = useStakeData()
  const { id, accountAddress } = activeData
  const { account } = useActiveWeb3React()
  const [, setTvlStakingData] = useRecoilState(tvlStakingDataState)
  useEffect(() => {
    console.log('asdasdasa21')
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
  const { getRestaking } = useRestakingCall()
  const [isDataLoading, setIsDataLoading] = useRecoilState(isTvlDataLoadingState)
  const [, setTvlStakingData] = useRecoilState(tvlStakingDataState)
  const setRestakingData = useSetRecoilState(restakingDataState)
  // const { isRegistered } = tvlStakingData
  const { activeData, setActiveData } = useActiveData()
  const { id } = activeData
  console.log({ id })
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
        return [v.response.toString(), new BigNumberJs(v.response.toString()).dividedBy(divisorBigNumber).toFormat(3)] as string[]
      }
      return ['0', '0']
    })
  }, [account, id, nativeChainId])
  const getStake = useCallback(async () => {
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
                          methodParameters: [account, activeTokenList[chainId].Restaking]
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
                // {
                //   reference: 'mintMinimum' + chainId, // 得到当前是第几周
                //   contractAddress: activeTokenList[chainId].Restaking,
                //   abi: TVLStakingABI,
                //   calls: [
                //     {
                //       methodName: 'mintMinimum',
                //       reference: 'mintMinimum' + chainId
                //     }
                //   ]
                // },
                {
                  reference: 'END_TIME' + chainId, // 得到当前是第几周
                  contractAddress: activeTokenList[chainId].Restaking,
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
                  contractAddress: activeTokenList[chainId].Restaking,
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
                ...Object.values(tvlTokens[chainId])
                  .filter((v: any) => v.address !== AddressZero)
                  .map((v: any) => {
                    return {
                      reference: 'getMintAmount' + v.symbol,
                      contractAddress: activeTokenList[chainId].CRHero,
                      abi: crHeroAbi,
                      calls: [{ methodName: 'getMintAmount', reference: 'getMintAmount' + v.symbol, methodParameters: [v.address, account] }]
                    }
                  }),
                // 最后一位是getWeek  不要变
                {
                  reference: 'getWeek' + chainId, // 得到当前是第几周
                  contractAddress: activeTokenList[chainId].Restaking,
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
        console.log({ res, params })
        const week = Object.fromEntries(res.map(v => [v.chainId, new BigNumberJs(v.response[v.response.length - 1][0].hex).toNumber()]))
        const nextParams = Object.fromEntries(
          TVLStakingSupportedChainId.map(chainId => {
            return [
              chainId,
              [
                ...Object.values(tvlTokens[chainId]).map((v: any) => {
                  return {
                    reference: 'getWeeklyWeight' + v.symbol,
                    contractAddress: activeTokenList[chainId].Restaking,
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
        console.log({ nextRes, nextParams })
        let stakeDataFromApi: any
        try {
          stakeDataFromApi = await Promise.all(TVLStakingSupportedChainId.map(v => getRestaking({ userId: id, chainId: v })))
          setRestakingData(
            Object.fromEntries(TVLStakingSupportedChainId.map((vvv, index) => [vvv, stakeDataFromApi[index]])) as unknown as Record<
              ChainId,
              IRestakingDataState
            >
          )
        } catch (stakeDataFromApiErr: any) {
          console.log('stakeDataFromApi Error', stakeDataFromApiErr)
        }

        console.log({ stakeDataFromApi })
        let END_TIME = '0'
        // let mintMinimum = '0'
        let sbtBalanceOf = '0'
        const resMap = Object.fromEntries(
          res.map((v, chainIndex) => {
            // const stakeDataFromApiItem = stakeDataFromApi ? stakeDataFromApi[chainIndex] : undefined
            const _chainId = v.chainId as unknown as ChainId

            const nextMethodArr = nextRes[chainIndex].method.split(',')

            const tvlObj: [string, ITVLStakingData][] = Object.values(tvlTokens[_chainId]).map((vv: any, index: number) => {
              const methodArr = v.method.split(',')
              const allowanceIndex = methodArr.indexOf(`allowance${vv.symbol}`)
              const symbolIndex = methodArr.indexOf(`symbol${vv.symbol}`)
              const nameIndex = methodArr.indexOf(`name${vv.symbol}`)
              const decimalIndex = methodArr.indexOf(`decimal${vv.symbol}`)
              const balanceOfIndex = methodArr.indexOf(`balanceOf${vv.symbol}`)
              const crHeroIndex = methodArr.indexOf(`getMintAmount${vv.symbol}`)

              const claimableIndex = methodArr.indexOf(`claimable${_chainId}`)
              const END_TIMEIndex = methodArr.indexOf(`END_TIME${_chainId}`)
              // const mintMinimumIndex = methodArr.indexOf(`mintMinimum${_chainId}`)
              const sbtBalanceOfIndex = methodArr.indexOf(`sbtBalanceOf${_chainId}`)
              console.log({ _chainId, claimableIndex, aaa: v.response[claimableIndex].map((cv: any) => new BigNumberJs(cv.hex).toFixed()) })

              const allowanceBig = v.response[allowanceIndex] ? new BigNumberJs(v.response[allowanceIndex][0].hex) : '0'
              const symbol = v.response[symbolIndex][0]
              const name = v.response[nameIndex][0]
              const decimal = v.response[decimalIndex][0]
              const balanceBig = new BigNumberJs(v.response[balanceOfIndex][0].hex)
              const earnGP = v.response[claimableIndex][index]
              const crHero = new BigNumberJs(v.response[crHeroIndex][0].hex).toFixed()
              console.log({ crHero })

              END_TIME = new BigNumberJs(v.response[END_TIMEIndex][0].hex).toFixed()
              // mintMinimum = new BigNumberJs(v.response[mintMinimumIndex][0].hex).toFixed()
              console.log({ sbtBalanceOfIndex, sbtBalanceOf: v.response[sbtBalanceOfIndex] })
              sbtBalanceOf = new BigNumberJs(v.response[sbtBalanceOfIndex][0].hex).toFixed()
              const getWeeklyWeightIndex = nextMethodArr.indexOf(`getWeeklyWeight${vv.symbol}`)

              const stake = nextRes[chainIndex].response[getWeeklyWeightIndex]
              const userStakeBig = new BigNumberJs(stake ? stake[0].hex : '0')
              const totalStakeBig = new BigNumberJs(stake ? stake[1].hex : '0')
              // let stakeDataFromApiItemI = '0'
              // if (stakeDataFromApiItem) {
              //   stakeDataFromApiItemI = stakeDataFromApiItem.records[vv.address.toLowerCase()].total
              //   console.log({ stakeDataFromApiItem, stakeDataFromApiItemI, vv: vv.address.toLowerCase() })
              // }
              // const totalStakeBig = new BigNumberJs(stakeDataFromApi[index])
              const earnGPBig = new BigNumberJs(earnGP.hex)
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
                  balanceStr: balanceBig.dividedBy(new BigNumberJs('10').exponentiatedBy(decimal)).toFormat(3),
                  earnGP: earnGPBig.toFixed(),
                  earnGPStr: earnGPBig.dividedBy(divisorBigNumber).toFormat(3),
                  userStakedAmount: userStakeBig.toFixed(),
                  userStakedAmountStr: userStakeBig.dividedBy(divisorBigNumber).toFormat(3),
                  totalStakedAmount: totalStakeBig.toFixed(),
                  totalStakedAmountStr: totalStakeBig.dividedBy(divisorBigNumber).toFormat(3),
                  ratio: totalStakeBig.toFixed() !== '0' ? userStakeBig.dividedBy(totalStakeBig).times(100).toFixed(0) : '0',
                  END_TIME: END_TIME
                } as ITVLStakingData
              ]
            })
            return [
              _chainId,
              Object.fromEntries([
                [
                  Currency[_chainId],
                  {
                    ...initData,
                    symbol: Currency[_chainId],
                    name: Currency[_chainId],
                    chainId: v.chainId,
                    allowance: '999999999999999999999999999999999999999999999',
                    balance: nativeValue[chainIndex][0],
                    balanceStr: nativeValue[chainIndex][1],
                    index: 0,
                    END_TIME: END_TIME
                  }
                ],
                ...tvlObj
              ])
            ]
          })
        ) as unknown as Record<ChainId, Record<string, ITVLStakingData>>
        setTvlStakingData(resMap)
        console.log({ ass: resMap[nativeChainId] })
        const userStakedAmount = ethers.utils
          .formatEther(calculateSumByNumber(Object.values(resMap[nativeChainId]).map(({ userStakedAmount: user }) => (user === '' ? '0' : user))))
          .toString()
        const crHeroBoxAmount = calculateSumByNumber(
          Object.values(resMap[nativeChainId]).map(({ crHeroAmount }) => (crHeroAmount === '' ? '0' : crHeroAmount))
        )

        const gpAmount = calculateSumByNumber(
          Object.values(resMap[nativeChainId]).map(({ earnGP }) =>
            earnGP === '' ? '0' : new BigNumberJs(earnGP).dividedBy(divisorBigNumber).toFixed(2)
          )
        )
        console.log({ gpAmount })
        setActiveData(pre => ({
          ...pre,
          userStakedAmount: userStakedAmount,
          userStakedAmountStr: new BigNumberJs(userStakedAmount).toFormat(),
          crHeroBoxAmount: crHeroBoxAmount,
          dollarGpRewords: gpAmount,
          // mintMinimum: mintMinimum,
          sbtAmount: sbtBalanceOf
        }))
        setIsDataLoading(false)
      }
    } catch (e) {
      console.log('eeeeeeee', e)
    }
  }, [getNative])

  const getStakingData = useCallback(() => {
    // if (isRegistered) {
    // 获取stake合约
    getStake()
    // }
  }, [getStake, id])

  return {
    getStakingData: getStakingData
  }
}

// export const useStakeDataFromApi = () => {
//   const { account } = useActiveWeb3React()
//   const { activeData } = useActiveData()
//   const getDataFromApi = useCallback(
//     async (chainId: ChainId): Promise<IRestakingDataState | undefined> => {
//       if (canNext(account, chainId)) {
//         const res = await getRestaking({ userId: activeData.id, chainId: chainId })
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
//               } as unknown as IRestakingItem
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
//     [account, getRestaking, JSON.stringify(activeData)]
//   )
//   return getDataFromApi
// }
