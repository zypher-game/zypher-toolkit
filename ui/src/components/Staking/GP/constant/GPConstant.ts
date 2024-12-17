import { ChainId } from "../../../../constant/constant";
import { Address } from "viem";

export const GPAddress = {
  [ChainId.LineaSepolia]: {
    GP: "0x91D416d939baA3Aa822DD1B776fC5e9610b952C2",
    Store: "0xE877BACFd073A9E35C12F55C40ad89ad88Ed72b2",
  },
  [ChainId.ZytronLineaSepoliaTestnet]: {
    GP: "0xF37D91f603F8E72648249b3D4D555cE26F8612C8",
    Store: "0xfA70A828461c5757CC74b97F056261D720739B10",
  },
} as unknown as Record<ChainId, { GP: Address; Store: Address }>;
export const GPV2SupportChainId = Object.keys(
  GPAddress
) as unknown as ChainId[];
