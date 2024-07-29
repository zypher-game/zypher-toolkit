import { defineChain } from 'viem'
export const sepolia = defineChain({
  id: 9980,
  name: 'Sepolia',
  network: 'Sepolia',
  nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://endpoints.omniatech.io/v1/eth/sepolia/public', 'https://ethereum-sepolia-rpc.publicnode.com']
    },
    public: { http: ['https://ethereum-sepolia-rpc.publicnode.com'] }
  },
  blockExplorers: {
    default: { name: 'Nodereal', url: 'https://sepolia.etherscan.io' },
    nodereal: { name: 'Nodereal', url: 'https://sepolia.etherscan.io' }
  },
  contracts: { multicall3: { address: '0xca11bde05977b3631167028862be2a173976ca11', blockCreated: 2415743 } }
})
