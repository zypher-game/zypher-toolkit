"use client";
// src/wallets/walletConnectors/metaMaskWallet/matemask.png
var matemask_default = "data:image/png;base64,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";
export {
  matemask_default as default
};
