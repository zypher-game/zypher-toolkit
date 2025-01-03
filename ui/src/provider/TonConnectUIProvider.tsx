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
            aboutUrl: "https://uxuy.com",
            universalLink: "https://t.me/UXUYbot/app",
            bridgeUrl: "https://bridge.uxuy.me/bridge",
            name: "UXUY Wallet",
            appName: "uxuyTonWallet",
            jsBridgeKey: "uxuyTonWallet",
            imageUrl:
              "https://raw.githubusercontent.com/uxuycom/uxuy-docsite/main/static/assets/UXUYWallet-logo/UXUYWallet_logo_circle.svg",
            platforms: ["android", "ios", "linux", "windows", "macos"],
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
