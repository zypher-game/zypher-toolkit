import { AddressZero } from '@ethersproject/constants'
import { ChainId, ChainRpcUrls, getProvider, IContractName, MulticallContract, request, supportedChainIds, zkBingo } from '@UI/src/'
import BigNumberjs from 'bignumber.js'
import { ethers } from 'ethers'
import sample from 'lodash/sample'
import { Address, WalletClient } from 'wagmi'

import { TransactionsCount } from '@/constants/constants'

import { env } from './config'
import sleep from './sleep'
export interface IContractRequest {
  contractName: IContractName
  method: string
  account?: string | null | undefined
  params: any[] | ((chainid: ChainId) => any[])
}

export interface IContractResponse {
  method: string
  chainId: number
  response: any
  chainIdList?: ChainId[]
}

export async function batchRequestNativeContracts({
  address,
  contractName,
  nativeMethod,
  defaultValue,
  chainIdList
}: {
  address?: Address // address 和 contractName 必有一个
  contractName?: IContractName
  nativeMethod: 'getBalance'
  defaultValue: any
  chainIdList: ChainId[]
}): Promise<IContractResponse[]> {
  const requests = chainIdList.map(async (contractRequest: ChainId) => {
    try {
      const contractsAddress = address ? address : contractName ? zkBingo(contractRequest, contractName) : undefined
      if (contractsAddress) {
        const provider = await getProvider(sample(ChainRpcUrls[contractRequest]))
        const balance = await provider[nativeMethod](contractsAddress)
        return {
          contractAddress: contractsAddress,
          method: nativeMethod,
          chainId: contractRequest,
          response: balance
        }
      } else {
        throw Error('No contractsAddress')
      }
    } catch (err) {
      return {
        contractAddress: undefined,
        method: nativeMethod,
        chainId: contractRequest,
        response: defaultValue
      }
    }
  })

  return Promise.all(requests)
}

export async function batchRequestTransCountFromScan({
  contractName,
  defaultValue
}: {
  contractName: IContractName
  defaultValue: any
}): Promise<IContractResponse[]> {
  const requests = supportedChainIds(env).map(async (contractRequest: ChainId) => {
    try {
      const res = TransactionsCount[contractRequest]
      return {
        contractAddress: undefined,
        method: 'nr_getTransactionByAddressCount',
        chainId: contractRequest,
        response: new BigNumberjs(res)
      }
    } catch (err) {
      // console.log({ err })
      return {
        contractAddress: undefined,
        method: 'nr_getTransactionByAddressCount',
        chainId: contractRequest,
        response: defaultValue
      }
    }
  })

  return Promise.all(requests)
}
export async function batchRequestContracts({
  contractFun,
  contracts,
  defaultValue,
  chainIdList,
  addressList
}: {
  contractFun: (chainId: ChainId, env: string, address?: Address, signer?: WalletClient) => ethers.Contract
  contracts: IContractRequest
  defaultValue: any
  chainIdList: ChainId[]
  addressList: Partial<Record<ChainId, Address>>
}): Promise<IContractResponse[]> {
  await sleep(0.11)
  const requests = chainIdList.map(async (chainId: ChainId) => {
    try {
      const address = addressList[chainId]
      if (address === AddressZero) {
        throw new Error(`No address: ${chainId}, ${contracts.contractName}`)
      }
      const contract = await contractFun(chainId, env, address)
      let params: any
      if (typeof contracts.params === 'function') {
        params = contracts.params(chainId)
      } else if (Array.isArray(contracts.params)) {
        params = contracts.params
      }
      let response = await contract.read[contracts.method](params)
      if (contracts.method === 'feeInfo') {
        response = response[0]
      }

      return {
        method: contracts.method,
        chainId: chainId,
        response
      }
    } catch (err) {
      // if (contracts.method === 'getResidue') {
      //   const address = zkBingo(chainId, contracts.contractName)
      //   console.error('batchRequestContracts: ', address, chainId, contracts.contractName, err)
      // }
      return {
        method: contracts.method,
        chainId: chainId,
        response: defaultValue
      }
    }
  })
  return Promise.all(requests)
}
export async function batchRequestMulticall({
  chainIdList,
  params,
  defaultValue
}: {
  chainIdList: ChainId[]
  params: Partial<Record<ChainId, any>>
  defaultValue?: any
}): Promise<IContractResponse[]> {
  const requests = chainIdList.map(async (chainId: ChainId) => {
    await sleep(0.1)
    // console.log({ params })
    try {
      const multicall = await MulticallContract(chainId)
      if (multicall) {
        if (params[chainId].length) {
          const res = await multicall.call(params[chainId])
          const { results } = res
          if (results) {
            const gameInfo = Object.values(results).map((v: any) => {
              return v['callsReturnContext'][0]['returnValues']
            })
            return {
              response: gameInfo,
              chainIdList,
              method: params[chainId].map((v: any) => v.reference).join(','),
              chainId: chainId
            }
          } else {
            throw new Error('results not')
          }
        } else {
          throw new Error('params length is zero')
        }
      } else {
        throw new Error('multicall not')
      }
    } catch (err) {
      // console.log({ err })
      return {
        response: defaultValue,
        chainIdList,
        method: params[chainId].map((v: any) => v.reference).join(','),
        chainId: chainId
      }
    }
  })
  return Promise.all(requests)
}
export async function batchRequestGraph({
  graphList,
  sql
}: {
  graphList: Partial<Record<ChainId, { graphql: string }>>
  sql: string
}): Promise<IContractResponse[]> {
  const chainIdList = Object.keys(graphList).map(v => Number(v)) as ChainId[]
  const requests = chainIdList.map(async (chainId: ChainId) => {
    try {
      const api = graphList?.[chainId]?.graphql
      if (api) {
        const result = await request(api, {
          method: 'POST',
          data: JSON.stringify({
            query: sql,
            variables: {},
            operationName: 'MyQuery'
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if (result.data && result.data.data) {
          return {
            response: result.data.data,
            method: sql,
            chainId: chainId
          }
        }
      }
      throw new Error('error')
    } catch (err) {
      return {
        response: undefined,
        method: sql,
        chainId: chainId
      }
    }
  })
  return Promise.all(requests)
}
