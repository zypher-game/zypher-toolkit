import { defineChain } from 'viem'
export const mantleTestnet = /*#__PURE__*/ defineChain({
  id: 5001,
  name: 'Mantle Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'MNT',
    symbol: 'MNT'
  },
  rpcUrls: {
    default: { http: ['https://rpc.testnet.mantle.xyz'] },
    public: {
      http: ['https://rpc.testnet.mantle.xyz'],
      webSocket: undefined
    }
  },
  blockExplorers: {
    etherscan: {
      name: 'Mantle Testnet Explorer',
      url: 'https://explorer.testnet.mantle.xyz'
    },
    default: {
      name: 'Mantle Testnet Explorer',
      url: 'https://explorer.testnet.mantle.xyz'
    }
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 561333
    }
  },
  testnet: true,
  network: ''
})
