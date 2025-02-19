import { ChainId, getContract, IContractName } from '@ui/src'
import * as ethers from 'ethers'

const bingoLobbyFee = ({
  chainId,
  env,
  bingoVersion,
  signer
}: {
  chainId: ChainId
  env: string
  bingoVersion: 'v1'
  signer?: any
}): ethers.ethers.Contract => {
  const [abi, address] = getBingoConfig({ contractName: IContractName.Fee, bingoVersion, chainId })
  return getContract({
    env,
    abi,
    address: address,
    signer,
    chainId
  })
}

export default bingoLobbyFee
