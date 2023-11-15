import { ChainId } from "../../../../constant/constant";

export enum ILocalPathUrl {
  COMBO = "COMBO",
  MANTA = "MANTA",
  BATE = "BATE",
  MANTLE = "MANTLE",
}

export const getChainNameText = (chainId: ChainId): string[] => {
  let text = "Beta";
  if (chainId === ChainId.ComboTestnet) {
    text = "Combo";
  } else if (
    chainId === ChainId.MantaPacificMainnet ||
    chainId === ChainId.MantaPacificTestnet
  ) {
    text = "Manta";
  } else if (chainId === ChainId.Mantle || chainId === ChainId.MantleTestnet) {
    text = "Mantle";
  }
  return [text.toLowerCase(), text];
};
export const localPathUrl = (): ILocalPathUrl => {
  const localpath = window.location.hostname;
  if (localpath.indexOf("combo") > -1) {
    return ILocalPathUrl.COMBO;
  } else if (localpath.indexOf("manta") > -1) {
    return ILocalPathUrl.MANTA;
  } else if (localpath.indexOf("mantle") > -1) {
    return ILocalPathUrl.MANTLE;
  } else if (localpath.indexOf("beta") > -1) {
    return ILocalPathUrl.BATE;
  }
  return ILocalPathUrl.MANTLE;
};
