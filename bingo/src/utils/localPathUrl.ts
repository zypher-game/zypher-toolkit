import { ChainId } from '@ui/src'

export enum ILocalPathUrl {
  COMBO = 'COMBO',
  MANTA = 'MANTA',
  BATE = 'BATE',
  Hypr = 'Hypr',
  MANTLE = 'MANTLE',
  TaikoHeklaTestnet9 = 'TaikoHeklaTestnet9',
  Saga = 'Saga'
}
export const localPathUrl = (chainId: ChainId): ILocalPathUrl => {
  if (chainId === ChainId.Combo || chainId === ChainId.ComboTestnet) {
    return ILocalPathUrl.COMBO
  } else if (chainId === ChainId.MantaPacificMainnet || chainId === ChainId.MantaPacificTestnet) {
    return ILocalPathUrl.MANTA
  } else if (chainId === ChainId.Mantle || chainId === ChainId.MantleTestnet) {
    return ILocalPathUrl.MANTLE
  } else if (window.IS_TELEGRAM) {
    return ILocalPathUrl.Saga
  }
  return ILocalPathUrl.BATE
}
