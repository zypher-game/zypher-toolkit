import "../utils/i18n";
import "../../node_modules/@my/rainbowkit/dist/index.css";
import { darkTheme, RainbowKitProvider } from "@my/rainbowkit";
import React, { FC, ReactNode, useMemo } from "react";

import { appInfo, ChainId } from "../constant/constant";
import { WagmiConfig } from "wagmi";

import { getWagmiConfig, getConfigureChains } from "../rainbow/rainbow";
import { HeaderUIType } from "../components/Header/header";

type IProps = {
  env: string;
  children: ReactNode;
  chainIdList?: ChainId[];
  type: HeaderUIType;
};
const RainbowKitWithThemeProvider: FC<IProps> = ({
  children,
  env,
  chainIdList,
  type,
}: IProps) => {
  const { wagmiConfig, chains, computedTheme } = useMemo(() => {
    if (env) {
      const wagmiConfig = getWagmiConfig(env, chainIdList);
      const { chains } = getConfigureChains(env);
      return {
        wagmiConfig: wagmiConfig,
        chains: chains,
        computedTheme: darkTheme({
          accentColor: "#6673FF",
          borderRadius: "large",
          fontStack: type === "pixel" ? "Pixel" : "system",
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
