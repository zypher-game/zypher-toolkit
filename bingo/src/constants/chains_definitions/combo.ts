import { defineChain } from 'viem'
export const combo = defineChain({
  id: 9980,
  name: 'Combo',
  network: 'Combo',
  nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
  rpcUrls: {
    default: {
      http: [
        'https://combo-mainnet.nodereal.io/v1/a8d873f8ca3f481e825920241e610cc1',
        'https://combo-mainnet.nodereal.io/v1/0caf221faccb46e59c65e618779914e3',
        'https://combo-mainnet.nodereal.io/v1/e36b7be476d84006acd740b7cebdcdac'
      ]
    },
    public: { http: ['https://rpc.combonetwork.io'] }
  },
  blockExplorers: {
    default: { name: 'Nodereal', url: 'https://combotrace.nodereal.io' },
    nodereal: { name: 'Nodereal', url: 'https://combotrace.nodereal.io' }
  },
  contracts: { multicall3: { address: '0x67c369D697C7A3B5BAE1cA9AEF0bA32F6d4d815a', blockCreated: 2415743 } }
})
