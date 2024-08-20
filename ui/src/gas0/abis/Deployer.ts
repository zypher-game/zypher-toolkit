export const DeployerAbi = [
  { type: 'receive', stateMutability: 'payable' },
  {
    type: 'function',
    name: 'deployContract',
    inputs: [
      { name: 'salt', type: 'bytes32', internalType: 'bytes32' },
      { name: 'bytecode', type: 'bytes', internalType: 'bytes' },
      { name: 'controller', type: 'address', internalType: 'address' },
      { name: 'v', type: 'uint8', internalType: 'uint8' },
      { name: 'r', type: 'bytes32', internalType: 'bytes32' },
      { name: 's', type: 'bytes32', internalType: 'bytes32' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  { type: 'event', name: 'WalletDeployed', inputs: [{ name: 'walletAddress', type: 'address', indexed: true, internalType: 'address' }], anonymous: false },
  { type: 'error', name: 'Create2EmptyBytecode', inputs: [] },
  { type: 'error', name: 'FailedDeployment', inputs: [] },
  {
    type: 'error',
    name: 'InsufficientBalance',
    inputs: [
      { name: 'balance', type: 'uint256', internalType: 'uint256' },
      { name: 'needed', type: 'uint256', internalType: 'uint256' },
    ],
  },
] as const;
