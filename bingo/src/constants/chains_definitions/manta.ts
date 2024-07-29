import { defineChain } from 'viem'

export const manta = defineChain({
  id: 169,
  name: 'Manta Pacific Mainnet',
  network: 'manta',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH'
  },
  rpcUrls: {
    default: { http: ['https://pacific-rpc.manta.network/http'] },
    public: {
      http: ['https://pacific-rpc.manta.network/http'],
      webSocket: undefined
    }
  },
  blockExplorers: {
    default: {
      name: 'Manta Explorer',
      url: 'https://pacific-explorer.manta.network',
      apiUrl: 'https://pacific-explorer.manta.network/api'
    }
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 332890
    }
  }
})
