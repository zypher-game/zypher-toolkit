import { defineChain } from 'viem'
export const TaikoHeklaTestnet9 = defineChain({
  id: 167009,
  name: 'Taiko Hekla L2',
  network: 'Taiko Hekla L2',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: { default: { http: ['https://rpc.hekla.taiko.xyz'] }, public: { http: ['https://rpc.hekla.taiko.xyz'] } },
  blockExplorers: { default: { name: 'blockscout', url: 'https://hekla.taikoscan.network' } },
  contracts: { multicall3: { address: '0xcA11bde05977b3631167028862bE2a173976CA11', blockCreated: 180570 } },
  testnet: true
})
