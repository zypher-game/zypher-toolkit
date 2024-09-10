import { ChainId } from '@ui/src'

export enum ILocalPathUrl {
  COMBO = 'COMBO',
  MANTA = 'MANTA',
  BATE = 'BATE',
  Hypr = 'Hypr',
  MANTLE = 'MANTLE',
  TaikoHeklaTestnet9 = 'TaikoHeklaTestnet9',
  Saga = 'Saga',
  B3 = 'B3'
}
export const localPathUrl = (chainId: ChainId): ILocalPathUrl => {
  if (chainId === ChainId.Combo || chainId === ChainId.ComboTestnet) {
    return ILocalPathUrl.COMBO
  } else if (chainId === ChainId.MantaPacificMainnet || chainId === ChainId.MantaPacificTestnet) {
    return ILocalPathUrl.MANTA
  } else if (chainId === ChainId.Mantle || chainId === ChainId.MantleTestnet) {
    return ILocalPathUrl.MANTLE
  } else if (chainId === ChainId.B3Mainnet) {
    return ILocalPathUrl.B3
  } else if (window.IS_TELEGRAM) {
    return ILocalPathUrl.Saga
  }
  return ILocalPathUrl.BATE
}
