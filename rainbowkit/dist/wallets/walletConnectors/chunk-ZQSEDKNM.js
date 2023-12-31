"use client";
import {
  getWalletConnectConnector,
  getWalletConnectUri
} from "./chunk-IY4T55P4.js";
import {
  isAndroid
} from "./chunk-ZOLACFTK.js";

// src/wallets/walletConnectors/ledgerWallet/ledgerWallet.ts
var ledgerWallet = ({
  chains,
  projectId,
  walletConnectOptions,
  walletConnectVersion = "2"
}) => ({
  id: "ledger",
  iconBackground: "#000",
  name: "Ledger Live",
  iconUrl: async () => (await import("./ledgerWallet-DIS4VM6H.js")).default,
  downloadUrls: {
    android: "https://play.google.com/store/apps/details?id=com.ledger.live",
    ios: "https://apps.apple.com/us/app/ledger-live-web3-wallet/id1361671700",
    mobile: "https://www.ledger.com/ledger-live",
    qrCode: "https://ledger.com/ledger-live"
  },
  createConnector: () => {
    const connector = getWalletConnectConnector({
      projectId,
      chains,
      version: walletConnectVersion,
      options: walletConnectOptions
    });
    return {
      connector,
      mobile: {
        getUri: async () => {
          const uri = await getWalletConnectUri(
            connector,
            walletConnectVersion
          );
          return isAndroid() ? uri : `ledgerlive://wc?uri=${encodeURIComponent(uri)}`;
        }
      },
      desktop: {
        getUri: async () => {
          const uri = await getWalletConnectUri(
            connector,
            walletConnectVersion
          );
          return `ledgerlive://wc?uri=${encodeURIComponent(uri)}`;
        }
      }
    };
  }
});

export {
  ledgerWallet
};
