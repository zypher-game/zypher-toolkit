import { defineChain } from 'viem'

export const comboTestnet = defineChain({
  id: 91715,
  name: 'Combo Testnet',
  network: 'Combo Testnet',
  nativeCurrency: { name: 'Ether', symbol: 'tcBNB', decimals: 18 },
  rpcUrls: {
    default: {
      http: [
        'https://combo-testnet.nodereal.io/v1/0caf221faccb46e59c65e618779914e3',
        'https://combo-testnet.nodereal.io/v1/e36b7be476d84006acd740b7cebdcdac',
        'https://combo-testnet.nodereal.io/v1/a8d873f8ca3f481e825920241e610cc1'
      ]
    },
    public: {
      http: [
        'https://combo-testnet.nodereal.io/v1/0caf221faccb46e59c65e618779914e3',
        'https://combo-testnet.nodereal.io/v1/e36b7be476d84006acd740b7cebdcdac',
        'https://combo-testnet.nodereal.io/v1/a8d873f8ca3f481e825920241e610cc1'
      ]
    }
  },
  blockExplorers: {
    default: { name: 'Nodereal', url: 'https://combotrace-testnet.nodereal.io' },
    nodereal: { name: 'Nodereal', url: 'https://combotrace-testnet.nodereal.io' }
  },
  contracts: { multicall3: { address: '0x4961661f732e995133fDAa7881481BB10e424f78', blockCreated: 16142835 } },
  testnet: true
})
