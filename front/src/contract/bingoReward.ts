import { ChainId, getContract, IContractName, zkBingo } from '@UI/src/'
import abi from '@zypher-game/bingo-periphery/abi/Reward.json'
import * as ethers from 'ethers'
import { Address, WalletClient } from 'wagmi'

const bingoReward = (chainId: ChainId, env: string, address?: Address, signer?: WalletClient): Promise<ethers.ethers.Contract> => {
  return getContract({
    env,
    abi,
    address: address ?? zkBingo(chainId, IContractName.Reward),
    signer,
    chainId
  })
}
export default bingoReward
