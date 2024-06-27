import { JsonRpcProvider, JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import { ChainId, IContractName, useActiveWeb3React, zkBingo } from '@ui/src'
import { getContract, getContractFromRpc } from '@ui/src'
import abi from '@zypher-game/bingo-periphery-v1/abi/ZkBingoLobby.json'
import * as ethers from 'ethers'
import { Address, WalletClient } from 'wagmi'

import { useContract } from '../hooks/useContract'

const bingoLobby = (chainId: ChainId, env: string, address?: Address, signer?: WalletClient): ethers.ethers.Contract => {
  return getContract({
    env,
    abi,
    address: address ?? zkBingo(chainId, IContractName.Lobby),
    signer,
    chainId
  })
}
export const bingoLobbyFromRpc = ({
  address,
  library,
  account
}: {
  address: Address
  library: JsonRpcProvider
  account?: string | null | undefined
}): Promise<ethers.Contract> => {
  return getContractFromRpc({
    address,
    abi,
    library,
    account
  })
}
export function useBingoLobby(): ethers.ethers.Contract | null {
  const { chainId } = useActiveWeb3React()

  return chainId ? useContract(zkBingo(chainId, IContractName.Lobby), abi) : null
}
export default bingoLobby
