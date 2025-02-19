import { ChainId, getBingoConfig, getContract, IBingoVersion, IContractName } from '@ui/src'
import * as ethers from 'ethers'
import { Address } from 'wagmi'

const bingoCard = ({
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
  const [abi, address] = getBingoConfig({ contractName: IContractName.Card, bingoVersion, chainId })
  return getContract({
    env: env,
    abi,
    address: address,
    signer: walletClient,
    chainId
  })
}
export default bingoCard
