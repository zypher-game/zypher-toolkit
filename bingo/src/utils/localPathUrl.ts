import { ChainId } from "@ui/src";

export enum ILocalPathUrl {
  COMBO = "COMBO",
  MANTA = "MANTA",
  BATE = "BATE",
  Hypr = "Hypr",
  MANTLE = "MANTLE",
  TaikoHeklaTestnet9 = "TaikoHeklaTestnet9",
}
export const localPathUrl = (chainId: ChainId): ILocalPathUrl => {
  if (chainId === ChainId.Combo || chainId === ChainId.ComboTestnet) {
    return ILocalPathUrl.COMBO;
  } else if (
    chainId === ChainId.MantaPacificMainnet ||
    chainId === ChainId.MantaPacificTestnet
  ) {
    return ILocalPathUrl.MANTA;
  } else if (chainId === ChainId.Mantle || chainId === ChainId.MantleTestnet) {
    return ILocalPathUrl.MANTLE;
  } else if (chainId === ChainId.TaikoHeklaTestnet9) {
    return ILocalPathUrl.TaikoHeklaTestnet9;
  }
  return ILocalPathUrl.BATE;
};
