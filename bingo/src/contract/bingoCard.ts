import { ChainId, getContract, IContractName, zkBingo, zkBingoV0 } from '@ui/src'
import abiV0 from '@zypher-game/bingo-periphery/abi/ZkBingoCard.json'
import abiV1 from '@zypher-game/bingo-periphery-v1/abi/ZkBingoCard.json'
import * as ethers from 'ethers'
import { Address } from 'wagmi'

import { IBingoVersion } from '@/pages/state/state'

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
  const address = bingoVersion === IBingoVersion.v1 ? zkBingo(chainId, IContractName.Card) : zkBingoV0(chainId, IContractName.Card)
  const abi = bingoVersion === IBingoVersion.v1 ? abiV1 : abiV0
  return getContract({
    env: env,
    abi,
    address: address,
    signer: walletClient,
    chainId
  })
}
export default bingoCard
