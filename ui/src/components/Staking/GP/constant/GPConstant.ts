import { ChainId } from '../../../../constant/constant';
import { Address } from 'viem';

export const GPAddress = {
  [ChainId.LineaMainnet]: {
    GP: '0x6ba3593101E32cEdBDE5AC9439e9187736B26A15',
    Store: '0xc93BD0Ac4C2Ec3721e24ceAFcF8a7C2ae572F553',
  },
  [ChainId.LineaSepolia]: {
    GP: '0x91D416d939baA3Aa822DD1B776fC5e9610b952C2',
    Store: '0xE877BACFd073A9E35C12F55C40ad89ad88Ed72b2',
  },
  [ChainId.ZytronLineaMain]: {
    GP: '0x9aa0e7639e385437236686797d4210d60C9b9E1E',
    Store: '0x5B0B09C52c5D7B22276253eE65779c8f6D81Fc76',
  },
  [ChainId.ZytronLineaSepoliaTestnet]: {
    GP: '0xF37D91f603F8E72648249b3D4D555cE26F8612C8',
    Store: '0xfA70A828461c5757CC74b97F056261D720739B10',
  },
  [ChainId.BaseSepolia]: {
    GP: '0xA1E3E8ec5731FDE73B574e784602C057AC64949b',
    Store: '0xe40690f41e437E63d4d72818856940C1A2A5807c',
  },
} as unknown as Record<ChainId, { GP: Address; Store: Address }>;
export const GPV2SupportChainId = Object.keys(
  GPAddress,
) as unknown as ChainId[];
