import { AddressZero } from '@ethersproject/constants'
import {
  activeTokenList,
  ChainId,
  Currency,
  divisorBigNumber,
  erc20Abi,
  erc721Abi,
  formatMoney,
  getLocalTime,
  TVLStakingSupportedChainId,
  tvlTokens,
  useActiveWeb3React,
  useRecoilState,
  useRecoilValue,
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
  initStakingDataState,
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
  const { accountAddress } = activeData
  const { account, chainId } = useActiveWeb3React()
  const [, setTvlStakingData] = useRecoilState(tvlStakingDataState)

  useEffect(() => {
    if (account && chainId) {
      getStakingData()
    }
  }, [account, chainId])
  useEffect(() => {
    if (account && accountAddress !== account) {
      setTvlStakingData(tvlStakingDataV2Init)
    }
  }, [account, accountAddress])
}
export const useStakeData = () => {
  const { account } = useActiveWeb3React()
  const [isDataLoading, setIsDataLoading] = useRecoilState(isTvlDataLoadingState)
  const [, setTvlStakingData] = useRecoilState(tvlStakingDataState)
  // const { isRegistered } = tvlStakingData
  const { activeData, setActiveData } = useActiveData()
  const { id } = activeData
  const { getStaking } = useStakingCall()

  const setRestakingData = useSetRecoilState(restakingDataState)
  const getNative = useCallback(async (): Promise<string[][]> => {
    const value = await batchRequestNativeContracts({
      chainIdList: TVLStakingSupportedChainId as unknown as ChainId[],
      address: account,
      nativeMethod: 'getBalance',
      defaultValue: new BigNumberJs('0')
    })
    return value.map(v => {
      if (v.response) {
        return [v.response.toString(), formatMoney(new BigNumberJs(v.response.toString()).dividedBy(divisorBigNumber).toFixed(), 8)] as string[]
      }
      return ['0', '0']
    })
  }, [account, id])
  const getStakingData = useCallback(async () => {
    try {
      if (account) {
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
                {
                  reference: 'isApprovedForAll' + chainId,
                  contractAddress: activeTokenList[chainId].Soulbound,
                  abi: erc721Abi,
                  calls: [
                    {
                      methodName: 'isApprovedForAll',
                      reference: 'isApprovedForAll' + chainId,
                      methodParameters: [account, activeTokenList[chainId].Staking]
                    }
                  ]
                },

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
                // 用户的余额低于这个值，就需要把 sbt 授权给合约
                {
                  reference: 'burnMaximum' + chainId, // 最少质押多少给 SBT
                  contractAddress: activeTokenList[chainId].Staking,
                  abi: TVLStakingABI,
                  calls: [
                    {
                      methodName: 'burnMaximum',
                      reference: 'burnMaximum' + chainId
                    }
                  ]
                },
                {
                  reference: 'startTime' + chainId, // 得到当前是第几周
                  contractAddress: activeTokenList[chainId].Staking,
                  abi: TVLStakingABI,
                  calls: [
                    {
                      methodName: 'startTime',
                      reference: 'startTime' + chainId
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
                ...Object.values(tvlTokens[chainId])
                  .filter((v: any) => v.address !== AddressZero)
                  .map((v: any) => {
                    return {
                      reference: 'hasSBT' + v.symbol,
                      contractAddress: activeTokenList[chainId].Staking, // 是否有 sbt 的判断
                      abi: TVLStakingABI,
                      calls: [{ methodName: 'hasSBT', reference: 'hasSBT' + v.symbol, methodParameters: [account, v.address] }]
                    }
                  }),
                ...Object.values(tvlTokens[chainId])
                  .filter((v: any) => v.address !== AddressZero)
                  .map((v: any) => {
                    return {
                      reference: 'userInfo' + v.symbol,
                      contractAddress: activeTokenList[chainId].Staking, // 用户的质押量是
                      abi: TVLStakingABI,
                      calls: [{ methodName: 'userInfo', reference: 'userInfo' + v.symbol, methodParameters: [account, v.address] }]
                    }
                  }),
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
        } catch (stakeDataFromApiErr: any) {
          console.log('stakeDataFromApi Error: ', stakeDataFromApiErr)
        }

        const userValue = Object.fromEntries(
          TVLStakingSupportedChainId.map(chain => [
            chain,
            {
              END_TIME: '0',
              END_TIMEStr: '',
              startTime: '0',
              startTimeStr: '',
              mintMinimum: '0',
              burnMaximum: '0',
              sbtBalanceOf: '0',
              getMinStake: '0',
              hasSBT: ''
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

            const burnMaximumIndex = methodArr.indexOf(`burnMaximum${_chainId}`)
            userValue[_chainId]['burnMaximum'] = new BigNumberJs(v.response[burnMaximumIndex][0].hex).toFixed()

            const getMinStakeIndex = methodArr.indexOf(`getMinStake${_chainId}`)
            userValue[_chainId]['getMinStake'] =
              getMinStakeIndex === -1 ? '0' : new BigNumberJs(v.response[getMinStakeIndex][0].hex).dividedBy(divisorBigNumber).toFixed()

            const claimableIndex = methodArr.indexOf(`claimable${_chainId}`)

            const END_TIMEIndex = methodArr.indexOf(`END_TIME${_chainId}`)
            const END_TIME = new BigNumberJs(v.response[END_TIMEIndex][0].hex).toFixed()
            userValue[_chainId]['END_TIME'] = END_TIME
            userValue[_chainId]['END_TIMEStr'] = getLocalTime(END_TIME)
            const startTimeIndex = methodArr.indexOf(`startTime${_chainId}`)
            const startTime = new BigNumberJs(v.response[startTimeIndex][0].hex).toFixed()
            userValue[_chainId]['startTime'] = startTime
            userValue[_chainId]['startTimeStr'] = getLocalTime(startTime)

            const sbtBalanceOfIndex = methodArr.indexOf(`sbtBalanceOf${_chainId}`)

            userValue[_chainId]['sbtBalanceOf'] = new BigNumberJs(v.response[sbtBalanceOfIndex][0].hex).toFixed()
            const tvlObj: [string, ITVLStakingData][] = Object.values(tvlTokens[_chainId]).map((vv: any, index: number) => {
              const allowanceIndex = methodArr.indexOf(`allowance${vv.symbol}`)
              const allowanceNFTIndex = methodArr.indexOf(`isApprovedForAll${_chainId}`)
              const symbolIndex = methodArr.indexOf(`symbol${vv.symbol}`)
              const nameIndex = methodArr.indexOf(`name${vv.symbol}`)
              const decimalIndex = methodArr.indexOf(`decimal${vv.symbol}`)
              const balanceOfIndex = methodArr.indexOf(`balanceOf${vv.symbol}`)
              const crHeroIndex = methodArr.indexOf(`getMintAmount${vv.symbol}`)
              const hasSBTIndex = methodArr.indexOf(`hasSBT${vv.symbol}`)
              const userInfoIndex = methodArr.indexOf(`userInfo${vv.symbol}`)

              const allowanceBig = v.response[allowanceIndex] ? new BigNumberJs(v.response[allowanceIndex][0].hex) : '0'

              const allowanceNFT = v.response[allowanceNFTIndex][0]
              const symbol = v.response[symbolIndex][0]
              const name = v.response[nameIndex][0]
              const decimal = v.response[decimalIndex][0]
              const balanceBig = new BigNumberJs(v.response[balanceOfIndex][0].hex)
              const earnGP = v.response[claimableIndex][index]
              const earnGPBig = new BigNumberJs(earnGP.hex)
              const crHero = new BigNumberJs(v.response[crHeroIndex][0].hex).toFixed()
              const hasSBT = new BigNumberJs(v.response[hasSBTIndex][0].hex).toFixed()
              if (hasSBT !== '0') {
                userValue[_chainId]['hasSBT'] = userValue[_chainId]['hasSBT'] + hasSBT
              }

              const userInfo = v.response[userInfoIndex] // [unlockTime, amount]
              const unlockTime = new BigNumberJs(userInfo ? userInfo[0].hex : '0').toFixed()
              // 判断时间
              const withdrawAmountBig = new BigNumberJs(userInfo ? userInfo[1].hex : '0')
              const unlockTimeStr = getLocalTime(unlockTime)
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
                  allowanceNFT: allowanceNFT,
                  symbol: symbol,
                  name: name,
                  decimal: decimal,
                  balance: balanceBig.toFixed(),
                  balanceStr: formatMoney(balanceBig.dividedBy(new BigNumberJs('10').exponentiatedBy(decimal)).toFixed(), 2),
                  earnGP: earnGPBig.toFixed(),
                  earnGPStr: formatMoney(earnGPBig.dividedBy(divisorBigNumber).toFixed(), 8),
                  userStakedAmount: userStakeBig.toFixed(),
                  userStakedAmountStr: formatMoney(userStakeBig.dividedBy(divisorBigNumber).toFixed(), 8),
                  sbtId: hasSBT,
                  withdrawAmount: withdrawAmountBig.toFixed(),
                  withdrawAmountStr: formatMoney(withdrawAmountBig.dividedBy(divisorBigNumber).toFixed(), 8),
                  unlockTime: unlockTime,
                  unlockTimeStr: unlockTimeStr,
                  totalStakedAmount: totalStakeBig.toFixed(),
                  totalStakedAmountStr: formatMoney(totalStakeBig.dividedBy(divisorBigNumber).toFixed(), 8),
                  ratio: totalStakeBig.toFixed() !== '0' ? userStakeBig.dividedBy(totalStakeBig).times(100).toFixed(0) : '0',
                  END_TIME: userValue[_chainId]['END_TIME'],
                  startTime: userValue[_chainId]['startTime'],
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
                    startTime: userValue[_chainId]['startTime'],
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
        const reduceValue = Object.fromEntries(
          Object.keys(resMap).map(chainId => {
            const _chainId = chainId as unknown as ChainId
            const stakingData = Object.values(resMap[_chainId]).filter(vs => vs.address !== AddressZero)
            const userStakedAmount = ethers.utils
              .formatEther(calculateSumByNumber(stakingData.map(({ userStakedAmount: user }) => (user === '' ? '0' : user))))
              .toString()
            const crHeroBoxAmount = calculateSumByNumber(stakingData.map(({ crHeroAmount }) => (crHeroAmount === '' ? '0' : crHeroAmount)))
            const gpAmount = calculateSumByNumber(
              stakingData.map(({ earnGP }) => (earnGP === '' ? '0' : new BigNumberJs(earnGP).dividedBy(divisorBigNumber).toFixed(2)))
            )
            return [
              _chainId,
              {
                userStakedAmount,
                crHeroBoxAmount,
                gpAmount
              }
            ]
          })
        ) as unknown as Record<ChainId, { userStakedAmount: string; crHeroBoxAmount: string; gpAmount: string }>
        TVLStakingSupportedChainId.forEach(chainP => {
          const chain = chainP as ChainId
          setActiveData(
            pre => ({
              ...pre,
              userStakedAmount: reduceValue[chain]['userStakedAmount'],
              userStakedAmountStr: formatMoney(new BigNumberJs(reduceValue[chain]['userStakedAmount']).toFixed(), 8),
              crHeroBoxAmount: reduceValue[chain]['crHeroBoxAmount'],
              dollarGpRewords: reduceValue[chain]['gpAmount'],
              dollarGpRewordsStr: formatMoney(new BigNumberJs(reduceValue[chain]['gpAmount']).toFixed(), 8),
              mintMinimum: userValue[chain]['mintMinimum'],
              mintMinimumStr: formatMoney(new BigNumberJs(userValue[chain]['mintMinimum']).dividedBy(divisorBigNumber).toFixed(), 8),
              burnMaximum: userValue[chain]['burnMaximum'],
              burnMaximumStr: formatMoney(new BigNumberJs(userValue[chain]['burnMaximum']).dividedBy(divisorBigNumber).toFixed(), 8),
              sbtAmount: userValue[chain]['sbtBalanceOf'],
              hasSBT: userValue[chain]['hasSBT'],
              END_TIMEStr: userValue[chain]['END_TIMEStr'],
              startTimeStr: userValue[chain]['startTimeStr']
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
export const useAllStakingData = () => {
  const restakingData = useRecoilValue(restakingDataState)
  const setRestakingData = useSetRecoilState(restakingDataState)
  const getAllStakingData = useCallback(
    (chainId: ChainId) => {
      try {
        if (!restakingData[chainId]) {
          setRestakingData(
            Object.fromEntries(TVLStakingSupportedChainId.map((vvv, index) => [vvv, initStakingDataState])) as unknown as Record<
              ChainId,
              IStakingDataState
            >
          )
          return initStakingDataState
        }
        return restakingData[chainId]
      } catch (err) {
        return initStakingDataState
      }
    },
    [JSON.stringify(restakingData)]
  )
  return { getAllStakingData }
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
