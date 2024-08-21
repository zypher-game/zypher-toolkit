import {
  THEME,
  TonConnectUIProvider as TonConnectUIProviderWidget,
} from "@tonconnect/ui-react";
import React from "react";
import { memo, ReactNode } from "react";

const TonConnectUIProvider = memo(({ children }: { children: ReactNode }) => {
  return (
    <TonConnectUIProviderWidget
      uiPreferences={{
        theme: THEME.DARK,
        colorsSet: { [THEME.DARK]: { background: { primary: "#070823" } } },
      }}
      walletsListConfiguration={{
        includeWallets: [
          {
            appName: "bitgetTonWallet",
            name: "Bitget Wallet",
            imageUrl:
              "https://raw.githubusercontent.com/bitkeepwallet/download/main/logo/png/bitget_wallet_logo_0_gas_fee.png",
            aboutUrl: "https://web3.bitget.com",
            deepLink: "bitkeep://",
            bridgeUrl: "https://bridge.tonapi.io/bridge",
            jsBridgeKey: "bitgetTonWallet",
            platforms: ["ios", "android", "chrome"],
            universalLink: "https://bkcode.vip/ton-connect",
          },
          {
            appName: "okxTonWallet",
            name: "OKX Wallet",
            imageUrl:
              "https://static.okx.com/cdn/assets/imgs/247/58E63FEA47A2B7D7.png",
            aboutUrl: "https://www.okx.com/web3",
            universalLink: "https://www.ouxyi.link/ul/uYJPB0",
            jsBridgeKey: "okxTonWallet",
            bridgeUrl: "https://www.okx.com/tonbridge/discover/rpc/bridge",
            platforms: ["chrome", "safari", "firefox", "ios", "android"],
          },
        ],
      }}
      manifestUrl={
        "https://static-dev.zypher.game/json/bingo/tonconnect-manifest.json"
      }
    >
      {children}
    </TonConnectUIProviderWidget>
  );
});
export default TonConnectUIProvider;
