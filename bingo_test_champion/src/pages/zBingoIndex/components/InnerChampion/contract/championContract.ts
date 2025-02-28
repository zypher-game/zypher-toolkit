import { ChainId, getContract, IContractName, zkBingoChampion } from '@ui/src'
import * as ethers from 'ethers'
import { Address } from 'wagmi'

import ChampionContractABI from './abi/championContract.json'
export { ChampionContractABI }
const ChampionContract = ({
  chainId,
  env,
  walletClient
}: {
  chainId: ChainId
  env: string
  address?: Address
  walletClient?: any
}): ethers.ethers.Contract => {
  const [abi, address] = [ChampionContractABI, zkBingoChampion(chainId, IContractName.ZypherBingoChampionship)]
  return getContract({
    env: env,
    abi,
    address: address,
    signer: walletClient,
    chainId
  })
}
export default ChampionContract
