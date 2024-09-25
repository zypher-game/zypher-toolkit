/* eslint-disable sort-keys-fix/sort-keys-fix */
import type { InjectedConnectorOptions } from "@wagmi/core/dist/connectors/injected";
import { InjectedConnector } from "wagmi/connectors/injected";
import { Chain } from "../../../components/RainbowKitProvider/RainbowKitChainContext";
import { Wallet } from "../../Wallet";
import { isAndroid } from "../../../utils/isMobile";
import { getWalletConnectUri } from "../../../utils/getWalletConnectUri";
import {
  getWalletConnectConnector,
  WalletConnectConnectorOptions,
  WalletConnectLegacyConnectorOptions,
} from "../../getWalletConnectConnector";

export interface GateWalletLegacyOptions {
  projectId?: string;
  chains: Chain[];
  walletConnectVersion: "1";
  walletConnectOptions?: WalletConnectLegacyConnectorOptions;
}

export interface GateWalletOptions {
  projectId: string;
  chains: Chain[];
  walletConnectVersion?: "2";
  walletConnectOptions?: WalletConnectConnectorOptions;
}

export const gateWallet = ({
  chains,
  projectId,
  walletConnectOptions,
  walletConnectVersion = "2",
  ...options
}: GateWalletOptions & InjectedConnectorOptions): Wallet => {
  const isGateInjected =
    typeof window !== "undefined" &&
    // @ts-expect-error
    typeof window.gatewallet !== "undefined";

  const shouldUseWalletConnect = !isGateInjected;

  return {
    id: "gate",
    name: "Gate Wallet",
    iconUrl: async () => (await import("./gateWallet.svg")).default,
    iconAccent: "#fff",
    iconBackground: "#fff",
    downloadUrls: {
      android:
        "https://play.google.com/store/apps/details?id=com.gateio.gateio",
      ios: "https://apps.apple.com/us/app/gate-io-buy-bitcoin-crypto/id1294998195",
      mobile: "https://www.gate.io/mobileapp",
      qrCode: "https://www.gate.io/web3",
      chrome:
        "https://chromewebstore.google.com/detail/gate-wallet/cpmkedoipcpimgecpmgpldfpohjplkpp",
      browserExtension: "https://www.gate.io/web3",
    },
    createConnector: () => {
      const connector = shouldUseWalletConnect
        ? getWalletConnectConnector({
            projectId,
            chains,
            version: walletConnectVersion,
            options: walletConnectOptions,
          })
        : new InjectedConnector({
            chains,
            options: {
              // @ts-expect-error
              getProvider: () => window.gatewallet,
              ...options,
            },
          });
      return {
        connector: connector,
        extension: {
          instructions: {
            learnMoreUrl: "https://www.gate.io/learn",
            steps: [
              {
                description:
                  "Click at the top right of your browser and pin Gate Wallet for easy access.",
                step: "install",
                title: "Install the Gate Wallet extension",
              },
              {
                description: "Create a new wallet or import an existing one.",
                step: "create",
                title: "Create or Import a wallet",
              },
              {
                description:
                  "Once you set up Gate Wallet, click below to refresh the browser and load up the extension.",
                step: "refresh",
                title: "Refresh your browser",
              },
            ],
          },
        },
        mobile: {
          getUri: shouldUseWalletConnect
            ? async () => {
                const uri = await getWalletConnectUri(
                  connector,
                  walletConnectVersion
                );
                return isAndroid()
                  ? uri
                  : `gtweb3wallet://wc?uri=${encodeURIComponent(uri)}`;
              }
            : undefined,
        },
        qrCode: shouldUseWalletConnect
          ? {
              getUri: async () =>
                getWalletConnectUri(connector, walletConnectVersion),
              instructions: {
                learnMoreUrl: "https://www.gate.io/learn",
                steps: [
                  {
                    description:
                      "wallet_connectors.gate.qr_code.step1.description",
                    step: "install",
                    title: "wallet_connectors.gate.qr_code.step1.title",
                  },
                  {
                    description:
                      "wallet_connectors.gate.qr_code.step2.description",
                    step: "create",
                    title: "wallet_connectors.gate.qr_code.step2.title",
                  },
                  {
                    description:
                      "wallet_connectors.gate.qr_code.step3.description",
                    step: "scan",
                    title: "wallet_connectors.gate.qr_code.step3.title",
                  },
                ],
              },
            }
          : undefined,
      };
    },
  };
};
