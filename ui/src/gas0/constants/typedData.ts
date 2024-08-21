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
