import "../utils/i18n";
import "../../node_modules/@zypher-game/rainbowkit/index.css";
import { darkTheme, RainbowKitProvider } from "@zypher-game/rainbowkit";
import React, { FC, ReactNode, useMemo } from "react";

import { appInfo } from "../constant/constant";
import { WagmiConfig } from "wagmi";

import { getWagmiConfig, getConfigureChains } from "../rainbow/rainbow";

type IProps = {
  env: string;
  children: ReactNode;
};
const RainbowKitWithThemeProvider: FC<IProps> = ({ children, env }: IProps) => {
  const { wagmiConfig, chains, computedTheme } = useMemo(() => {
    if (env) {
      const wagmiConfig = getWagmiConfig(env);
      const { chains } = getConfigureChains(env);
      return {
        wagmiConfig: wagmiConfig,
        chains: chains,
        computedTheme: darkTheme({
          accentColor: "#6673FF",
          borderRadius: "large",
          fontStack: "system",
        }),
      };
    }
    return {};
  }, []);
  if (!wagmiConfig || !chains || !computedTheme) {
    return null;
  }
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        appInfo={appInfo}
        theme={computedTheme}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};
export default RainbowKitWithThemeProvider;
