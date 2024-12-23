import { ChainId } from "../../../../constant/constant";

export enum ILocalPathUrl {
  COMBO = "COMBO",
  MANTA = "MANTA",
  BATE = "BATE",
  Hypr = "Hypr",
  MANTLE = "MANTLE",
  TaikoHeklaTestnet9 = "TaikoHeklaTestnet9",
  Saga = "Saga",
  B3 = "B3",
  EXP = "EXP",
}

export const getChainNameText = (
  chainId: ChainId,
  params?: { isLowcase: boolean }
): string => {
  const { isLowcase = false } = params || {};
  const localpath = localPathUrl(chainId);
  let text = "Beta";
  if (localpath === ILocalPathUrl.COMBO) {
    text = "Combo";
  } else if (localpath === ILocalPathUrl.MANTA) {
    text = "Manta";
  } else if (localpath === ILocalPathUrl.MANTLE) {
    text = "Mantle";
  } else if (localpath === ILocalPathUrl.Hypr) {
    text = "Hypr";
  } else if (localpath === ILocalPathUrl.TaikoHeklaTestnet9) {
    text = "TaikoHeklaTestnet";
  } else if (localpath === ILocalPathUrl.Saga) {
    text = "Diamond Points";
  } else if (localpath === ILocalPathUrl.B3) {
    text = "B3";
  } else if (localpath === ILocalPathUrl.EXP) {
    text = "EXP";
  }
  return isLowcase ? text.toLowerCase() : text;
};
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
  } else if (chainId === ChainId.B3Mainnet) {
    return ILocalPathUrl.B3;
  } else if (chainId === ChainId.EXPTestnet) {
    return ILocalPathUrl.EXP;
  } else if (window.IS_TELEGRAM) {
    return ILocalPathUrl.Saga;
  }
  return ILocalPathUrl.BATE;
};
