import { JsonRpcProvider } from '@ethersproject/providers'
import { ChainId, IContractName, zkBingo, zkBingoV0 } from '@ui/src'
import { getContract, getContractFromRpc } from '@ui/src'
import abiV0 from '@zypher-game/bingo-periphery/abi/ZkBingoLobby.json'
import abiV1 from '@zypher-game/bingo-periphery-v1/abi/ZkBingoLobby.json'
import * as ethers from 'ethers'
import { Address, WalletClient } from 'wagmi'

import { IBingoVersion } from '@/pages/state/state'

export const getBingoLobbyAbi = ({ bingoVersion }: { bingoVersion: IBingoVersion }): any => {
  if (bingoVersion === IBingoVersion.v1) {
    return abiV1
  }
  return abiV0
}
export const getBingoLobbyAddress = ({ bingoVersion, chainId }: { bingoVersion: IBingoVersion; chainId: ChainId }) => {
  return bingoVersion === IBingoVersion.v1 ? zkBingo(chainId, IContractName.Lobby) : zkBingoV0(chainId, IContractName.Lobby)
}

const bingoLobby = ({
  chainId,
  env,
  bingoVersion,
  walletClient
}: {
  chainId: ChainId
  env: string
  bingoVersion: IBingoVersion
  address?: Address
  walletClient?: any
}): ethers.ethers.Contract => {
  const address = getBingoLobbyAddress({
    bingoVersion,
    chainId
  })
  const abi = getBingoLobbyAbi({ bingoVersion })
  return getContract({
    env,
    abi: abi,
    address: address,
    signer: walletClient,
    chainId
  })
}
export const bingoLobbyFromRpc = ({
  chainId,
  bingoVersion,
  library,
  account
}: {
  chainId: ChainId
  bingoVersion: IBingoVersion
  library: JsonRpcProvider
  account?: string | null | undefined
}): Promise<ethers.Contract> => {
  const address = getBingoLobbyAddress({
    bingoVersion,
    chainId
  })
  const abi = getBingoLobbyAbi({ bingoVersion })
  return getContractFromRpc({
    address,
    abi,
    library,
    account
  })
}
export default bingoLobby
