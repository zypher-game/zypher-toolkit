import { JsonRpcProvider } from '@ethersproject/providers'
import RewardAbi from '@zypher-game/bingo-periphery/abi/Reward.json'
import { ChainId, getContract, getContractFromRpc } from '@UI/src/'
import abi from '@zypher-games/checkin/abi/ZgDailyCheckin.json'
import CONTRACTS from '@zypher-games/checkin/contracts.json'
import * as ethers from 'ethers'
import { WalletClient } from 'wagmi'

import { env } from '@/utils/config'

export const RewardContract = ({ chainId, signer }: { chainId: ChainId; signer?: WalletClient }): ethers.Contract | undefined => {
  try {
    const ADDRESS = CONTRACTS[chainId].Reward.address
    return getContract({
      env,
      abi: RewardAbi,
      address: ADDRESS,
      signer,
      chainId
    })
  } catch (e) {
    return undefined
  }
}
export const CheckInContract = ({ chainId, signer }: { chainId: ChainId; signer?: WalletClient }): ethers.Contract | undefined => {
  try {
    const ADDRESS = CONTRACTS[chainId].ZgDailyCheckin.address
    return getContract({
      env,
      abi,
      address: ADDRESS,
      signer,
      chainId
    })
  } catch (e) {
    return undefined
  }
}
