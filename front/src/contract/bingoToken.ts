import abi from '@zypher-game/bingo-periphery-v1/abi/ZypherGameToken.json'
import { ChainId, getContract, IContractName, zkBingo } from '@UI/src/'
import * as ethers from 'ethers'
import { Address, WalletClient } from 'wagmi'

const bingoToken = (chainId: ChainId, env: string, address?: Address, signer?: WalletClient): ethers.ethers.Contract => {
  return getContract({
    env: env,
    abi,
    address: address ?? zkBingo(chainId, IContractName.ZypherGameToken),
    signer,
    chainId
  })
}

export default bingoToken