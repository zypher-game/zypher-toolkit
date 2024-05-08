import { ChainId, getContract, IContractName, zkBingo } from '@ui/src'
import abi from '@zypher-game/bingo-periphery/abi/ZkBingoCard.json'
import * as ethers from 'ethers'
import { Address, WalletClient } from 'wagmi'

import { env } from '../utils/config'

const bingoCard = (chainId: ChainId, address?: Address, signer?: WalletClient): ethers.ethers.Contract => {
  return getContract({
    env: env,
    abi,
    address: address ?? zkBingo(chainId, IContractName.Card),
    signer,
    chainId
  })
}
export default bingoCard
