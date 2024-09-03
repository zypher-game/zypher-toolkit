import { Address } from "wagmi";

export const ZytronSignTypedData = (chainId: number) => {
  return {
    domain: {
      name: "Zytron",
      // version: '1',
      chainId,
      // verifyingContract,
    },
    types: {
      Message: [
        { name: "tip", type: "string" },
        { name: "nonce", type: "uint256" },
        { name: "from", type: "address" },
        { name: "to", type: "address" },
        { name: "value", type: "uint256" },
        { name: "data", type: "bytes" },
      ],
    },
    primaryType: "Message",
  } as const;
};

export const ZytronSetAdminTypedData = (chainId: number) => {
  return {
    domain: { name: "Zytron", chainId },
    types: {
      Message: [
        { name: "controller", type: "address" },
        { name: "isAllow", type: "bool" },
        { name: "nonce", type: "uint256" },
      ],
    },
    primaryType: "Message",
  } as const;
};

export const ZytronPermitTypedData = (
  name: string,
  chainId: number,
  verifyingContract: Address
) => {
  return {
    domain: { name, version: "1", chainId, verifyingContract },
    types: {
      Permit: [
        { name: "owner", type: "address" },
        { name: "spender", type: "address" },
        { name: "value", type: "uint256" },
        { name: "nonce", type: "uint256" },
        { name: "deadline", type: "uint256" },
      ],
    },
    primaryType: "Permit",
  } as const;
};

export const ZytronMulticallTypedData = (chainId: number) => {
  return {
    domain: {
      name: "Zytron",
      // version: '1',
      chainId,
      // verifyingContract,
    },
    types: {
      Message: [
        { name: "tip", type: "string" },
        { name: "items", type: "MessageItem[]" },
        { name: "nonce", type: "uint256" },
      ],
      MessageItem: [
        { name: "from", type: "address" },
        { name: "to", type: "address" },
        { name: "value", type: "uint256" },
        { name: "data", type: "bytes" },
      ],
    },
    primaryType: "Message",
  } as const;
};
