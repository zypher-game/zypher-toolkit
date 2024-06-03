import { ChainId, getContract, IContractName, zkBingo } from '@ui/src'
import abi from '@zypher-game/bingo-periphery-v1/abi/ZkBingoFee.json'
import * as ethers from 'ethers'
import { Address, WalletClient } from 'wagmi'

const bingoLobbyFee = (chainId: ChainId, env: string, address?: Address, signer?: WalletClient): ethers.ethers.Contract => {
  return getContract({
    env,
    abi,
    address: address ?? zkBingo(chainId, IContractName.Fee),
    signer,
    chainId
  })
}

export default bingoLobbyFee