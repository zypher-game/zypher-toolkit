import { ChainId } from '@zypher-game/toolkit/ui'
import { getProvider } from '@zypher-game/toolkit/ui'

export default async (): Promise<number> => {
  const provider = await getProvider()
  const network = await provider.getNetwork()
  const isError = !Object.values(ChainId).includes(network.chainId)
  if (isError) {
    throw new Error('Network not supported')
  }
  return network.chainId
}
