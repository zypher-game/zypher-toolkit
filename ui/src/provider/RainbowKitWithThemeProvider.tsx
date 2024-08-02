import "../utils/i18n";

import React, { FC, ReactNode, useMemo } from "react";

import { appInfo, ChainId } from "../constant/constant";
import { WagmiConfig } from "wagmi";

import { getWagmiConfig, getConfigureChains } from "../rainbow/rainbow";
import { darkTheme } from "../rainbowkit/src/themes/darkTheme";
import { RainbowKitProvider } from "../rainbowkit/src/components/RainbowKitProvider/RainbowKitProvider";

type IProps = {
  env: string;
  children: ReactNode;
  chainIdList?: Array<ChainId>;
  isTelegram?: boolean;
};
const RainbowKitWithThemeProvider: FC<IProps> = ({
  children,
  env,
  chainIdList,
  isTelegram,
}: IProps) => {
  const { wagmiConfig, chains, computedTheme } = useMemo(() => {
    if (env) {
      const wagmiConfig = getWagmiConfig(env, chainIdList, isTelegram);
      const { chains } = getConfigureChains(env);
      console.log({ chainIdList, chains });
      return {
        wagmiConfig: wagmiConfig,
        chains: chains,
        computedTheme: darkTheme({
          accentColor: "#fff",
          borderRadius: "large",
          fontStack: "Pixel",
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
