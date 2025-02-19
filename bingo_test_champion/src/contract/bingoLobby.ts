import { JsonRpcProvider } from '@ethersproject/providers'
import { ChainId, getBingoConfig, IBingoVersion, IContractName } from '@ui/src'
import { getContract, getContractFromRpc } from '@ui/src'
import * as ethers from 'ethers'
import { Address } from 'wagmi'

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
  const [abi, address] = getBingoConfig({ contractName: IContractName.Lobby, bingoVersion, chainId })

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
  const [abi, address] = getBingoConfig({ contractName: IContractName.Lobby, bingoVersion, chainId })
  return getContractFromRpc({
    address,
    abi,
    library,
    account
  })
}
export default bingoLobby
