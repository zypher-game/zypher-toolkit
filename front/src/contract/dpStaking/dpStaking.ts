import { ChainId, getContract } from '@ui/src'
import * as ethers from 'ethers'
import { Address, WalletClient } from 'wagmi'

import DPABI from './abis/contracts/DP.sol/DP.json'
import StakingABI from './abis/contracts/Staking.sol/Staking.json'
import CONTRACTS from './contracts.json'
export enum IDPContract {
  DP = 'DP',
  ZypherGameToken = 'ZypherGameToken',
  Staking = 'Staking'
}
export const getDpStakingAddress = (chainId: ChainId, keyValue: IDPContract): string => {
  try {
    return CONTRACTS[chainId][keyValue]
  } catch (e) {
    throw e
  }
}
export const DPContract = ({
  chainId,
  env,
  signer
}: {
  chainId: ChainId
  env: string
  address?: Address
  signer?: WalletClient
}): ethers.ethers.Contract => {
  return getContract({
    env: env,
    abi: DPABI,
    address: getDpStakingAddress(chainId, IDPContract.DP),
    signer,
    chainId
  })
}

export const DPStakingContract = ({
  chainId,
  env,
  signer
}: {
  chainId: ChainId
  env: string
  address?: Address
  signer?: WalletClient
}): ethers.ethers.Contract => {
  return getContract({
    env: env,
    abi: StakingABI,
    address: getDpStakingAddress(chainId, IDPContract.Staking),
    signer,
    chainId
  })
}
