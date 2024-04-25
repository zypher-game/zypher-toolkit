import { Address } from '@wagmi/core'
import {
  bingoBetaSupportedChainId,
  bingoSupportedChainId,
  bingoV1SupportedChainId,
  ChainId,
  erc20Contract,
  formatMoney,
  IContractName,
  IGameName,
  refreshBalanceState,
  useActiveWeb3React,
  useRecoilState,
  useRecoilValue,
  zkBingo,
  zkBingoV0
} from '@UI/src/'
import BigNumberjs from 'bignumber.js'
import { ethers } from 'ethers'
import { useCallback, useEffect } from 'react'

import bingoLobby from '@/contract/bingoLobby'
import bingoLobbyFee from '@/contract/bingoLobbyFee'
import bingoToken from '@/contract/bingoToken'
import zkGame2048 from '@/contract/zkGame2048'
import { usePrice } from '@/store/price/hooks'
import {
  batchRequestContracts,
  batchRequestGraph,
  batchRequestNativeContracts,
  batchRequestTransCountFromScan,
  IContractResponse
} from '@/utils/batchRequestContracts'
import { calculateSum, calculateSumByNumber, calculateSumWithKey } from '@/utils/calculateSum'
import { env } from '@/utils/config'

import { homeDateState, IData, IDataKey } from '../state/homeState'
import { z2048Constant, z2048SupportedChainIds } from './useRecentZ2048FromContract'

export const useDataInfo = () => {
  const { account } = useActiveWeb3React()
  const [data, setData] = useRecoilState<IData>(homeDateState)

  const chainNativePrice = usePrice()
  const fetchData = useCallback(() => {
    if (!chainNativePrice || !Object.keys(chainNativePrice).length) {
      return
    }
    batchRequestContracts({
      addressList: Object.fromEntries([
        ...bingoBetaSupportedChainId.map(v => [v, zkBingoV0(v, IContractName.Lobby)]),
        ...bingoV1SupportedChainId.map(v => [v, zkBingo(v, IContractName.Lobby)])
      ]),
      chainIdList: bingoSupportedChainId,
      contractFun: bingoLobby,
      contracts: {
        contractName: IContractName.Lobby,
        method: 'summary',
        account: account,
        params: []
      },
      defaultValue: [new BigNumberjs('0'), new BigNumberjs('0')]
    })
      .then(async (bingoSummary: IContractResponse[]) => {
        const z2048Info = await batchRequestGraph({
          graphList: z2048Constant,
          sql: `{
            gameOvers(orderBy: gameId, first: 1, orderDirection: desc) {
              gameId
            }
          }`
        })
        const z2048InfoVal = z2048Info
          .map(z2048 => {
            if (z2048.response) {
              if (z2048.response.gameOvers && z2048.response.gameOvers[0] && z2048.response.gameOvers[0].gameId) {
                return [z2048.chainId, z2048.response.gameOvers[0].gameId]
              }
            }
            return undefined
          })
          .filter(v => v != undefined) as [ChainId, string][]
        const z2048MaxGameId = Object.fromEntries(z2048InfoVal)
        let totalGame = calculateSumWithKey(bingoSummary, 0)
        totalGame = calculateSumByNumber([...Object.values(z2048MaxGameId), totalGame])
        // 一共多少玩家
        let totalPlayers = calculateSumWithKey(bingoSummary, 1)
        totalPlayers = calculateSumByNumber([...Object.values(z2048MaxGameId), totalPlayers])
        // 價值
        const value = await batchRequestNativeContracts({
          chainIdList: bingoV1SupportedChainId,
          contractName: IContractName.Points,
          nativeMethod: 'getBalance',
          defaultValue: new BigNumberjs('0')
        })
        const totalVault = calculateSum(value, true, chainNativePrice)
        // 交易数量
        const transactionCount = await batchRequestTransCountFromScan({
          contractName: IContractName.Lobby,
          defaultValue: new BigNumberjs('0')
        })
        let totalTransactionCount = calculateSum(transactionCount)
        totalTransactionCount = calculateSumByNumber([
          ...Object.values(z2048MaxGameId).map(v => new BigNumberjs(v).times(2).toString()),
          totalTransactionCount
        ])

        // 金币消耗数量
        const goldPointsTotal = await batchRequestContracts({
          chainIdList: bingoV1SupportedChainId,
          addressList: Object.fromEntries(bingoV1SupportedChainId.map(v => [v, zkBingo(v, IContractName.ZypherGameToken)])),
          contractFun: erc20Contract,
          contracts: {
            contractName: IContractName.ZypherGameToken,
            method: 'totalSupply',
            account: account,
            params: []
          },
          defaultValue: new BigNumberjs('0')
        })
        const totalPoint = calculateSum(goldPointsTotal)
        // 收取的手续fee
        const bingoPlatformRevenue = await batchRequestContracts({
          chainIdList: bingoV1SupportedChainId,
          addressList: Object.fromEntries(bingoV1SupportedChainId.map(v => [v, zkBingo(v, IContractName.Fee)])),
          contractFun: bingoLobbyFee,
          contracts: {
            contractName: IContractName.Fee,
            method: 'feeInfo',
            account: account,
            params: []
          },
          defaultValue: new BigNumberjs('0')
        })

        const chainIdList = z2048SupportedChainIds({ env })
        const z2048PlatformRevenue = await batchRequestContracts({
          contractFun: zkGame2048,
          contracts: {
            contractName: IContractName.ZkGame2048,
            method: 'platformFee',
            account: account,
            params: []
          },
          chainIdList,
          addressList: Object.fromEntries(chainIdList.map(chainId => [chainId, z2048Constant[chainId].Contracts.ZkGame2048])) as Record<
            ChainId,
            Address
          >,
          defaultValue: new BigNumberjs('0')
        })
        const bingoTotalPlatformRevenue = calculateSum(bingoPlatformRevenue)
        const z2048PlatformRevenueMap = Object.fromEntries(z2048PlatformRevenue.map(v => [v.chainId, v.response.toString()]))
        const z2048TotalPlatformRevenue = calculateSum(z2048PlatformRevenue)
        const totalPlatformRevenue = calculateSumByNumber([bingoTotalPlatformRevenue, z2048TotalPlatformRevenue])

        // 负债
        const debtObligation = await batchRequestContracts({
          chainIdList: bingoV1SupportedChainId,
          addressList: Object.fromEntries(bingoV1SupportedChainId.map(v => [v, zkBingo(v, IContractName.ZypherGameToken)])),
          contractFun: bingoToken,
          contracts: {
            contractName: IContractName.ZypherGameToken,
            method: 'getResidue',
            account: account,
            params: []
          },
          defaultValue: new BigNumberjs('0')
        })
        const totalDebtObligation = calculateSum(debtObligation)

        const gpBurned = await batchRequestContracts({
          chainIdList: bingoV1SupportedChainId,
          addressList: Object.fromEntries(bingoV1SupportedChainId.map(v => [v, zkBingo(v, IContractName.ZypherGameToken)])),
          contractFun: bingoToken,
          contracts: {
            contractName: IContractName.ZypherGameToken,
            method: 'getRepay',
            account: account,
            params: []
          },
          defaultValue: new BigNumberjs('0')
        })
        const totalGpBurned = calculateSum(gpBurned)
        setData({
          totalVault: Number(ethers.utils.formatEther(totalVault)),
          totalVaultDecimal: 2,
          totalTransactionVol: Number(totalTransactionCount),
          totalTransactionVolDecimal: 0,
          totalPlatformRevenue: Number(ethers.utils.formatEther(totalPlatformRevenue)),
          totalPlatformRevenueDecimal: 0,
          totalPoint: Number(ethers.utils.formatEther(totalPoint)),
          totalPointDecimal: 0,
          totalGame: new BigNumberjs(totalGame).toNumber(),
          totalGameDecimal: 0,
          totalPlayers: new BigNumberjs(totalPlayers).toNumber(),
          totalPlayersDecimal: 0,
          // 平台整体的负债
          totalDebtObligation: new BigNumberjs(ethers.utils.formatEther(totalDebtObligation)).toNumber(),
          totalDebtObligationDecimal: 0,
          // 已燃烧的GP总量
          totalGpBurned: new BigNumberjs(ethers.utils.formatEther(totalGpBurned)).toNumber(),
          totalGpBurnedDecimal: 0,
          total: {
            [IDataKey.totalGame]: Object.fromEntries(
              bingoSummary.map(v => [
                v.chainId,
                {
                  total: formatMoney(new BigNumberjs(v.response[0]).plus(new BigNumberjs(z2048MaxGameId?.[v.chainId] ?? '0')).toString(), 0),
                  item: {
                    [IGameName.zBingo]: new BigNumberjs(v.response[0]).toString(),
                    [IGameName.z2048]: new BigNumberjs(z2048MaxGameId?.[v.chainId] ?? '0').toString()
                  }
                }
              ])
            ),
            [IDataKey.totalPlayers]: Object.fromEntries(
              bingoSummary.map(v => [
                v.chainId,
                {
                  total: formatMoney(new BigNumberjs(v.response[1]).plus(new BigNumberjs(z2048MaxGameId?.[v.chainId] ?? '0')).toString(), 0),
                  item: {
                    [IGameName.zBingo]: new BigNumberjs(v.response[1]).toString(),
                    [IGameName.z2048]: new BigNumberjs(z2048MaxGameId?.[v.chainId] ?? '0').toString()
                  }
                }
              ])
            ),
            [IDataKey.totalVault]: Object.fromEntries(
              value.map(v => [
                v.chainId,
                {
                  total: formatMoney(Number(ethers.utils.formatEther(new BigNumberjs(v.response.toString()).toString())), 3)
                }
              ])
            ),
            [IDataKey.totalPoint]: Object.fromEntries(
              goldPointsTotal.map(v => [
                v.chainId,
                {
                  total: formatMoney(Number(ethers.utils.formatEther(new BigNumberjs(v.response.toString()).toString())))
                }
              ])
            ),

            [IDataKey.totalDebtObligation]: Object.fromEntries(
              debtObligation.map(v => [
                v.chainId,
                {
                  total: formatMoney(Number(ethers.utils.formatEther(new BigNumberjs(v.response.toString()).toString())), 0)
                }
              ])
            ),
            [IDataKey.totalGpBurned]: Object.fromEntries(
              gpBurned.map(v => [
                v.chainId,
                {
                  total: formatMoney(Number(ethers.utils.formatEther(new BigNumberjs(v.response.toString()).toString())), 0)
                }
              ])
            ),
            [IDataKey.totalPlatformRevenue]: Object.fromEntries(
              bingoPlatformRevenue.map(v => [
                v.chainId,
                {
                  total: formatMoney(
                    Number(
                      ethers.utils.formatEther(new BigNumberjs(v.response.toString()).plus(z2048PlatformRevenueMap?.[v.chainId] ?? '0').toString())
                    ),
                    0
                  ),
                  item: {
                    [IGameName.zBingo]: ethers.utils.formatEther(new BigNumberjs(v.response.toString()).toString()),
                    [IGameName.z2048]: ethers.utils.formatEther(new BigNumberjs(z2048PlatformRevenueMap?.[v.chainId] ?? '0').toString())
                  }
                }
              ])
            ),
            [IDataKey.totalTransactionVol]: Object.fromEntries(
              transactionCount.map(v => [
                v.chainId,
                {
                  total: formatMoney(
                    new BigNumberjs(v.response.toString()).plus(new BigNumberjs(z2048MaxGameId?.[v.chainId] ?? '0').times(2)).toString(),
                    0
                  ),
                  item: {
                    [IGameName.zBingo]: new BigNumberjs(v.response.toString()).toString(),
                    [IGameName.z2048]: new BigNumberjs(z2048MaxGameId?.[v.chainId] ?? '0').times(2).toString()
                  }
                }
              ])
            )
          }
        })
      })
      .catch(error => {
        console.error('An error occurred:', error)
      })
  }, [account, chainNativePrice])
  const refreshBalance = useRecoilValue(refreshBalanceState)
  useEffect(fetchData, [refreshBalance])
  return { data }
}
