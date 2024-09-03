import "../utils/i18n";

import React, { FC, ReactNode, useMemo } from "react";

import { appInfo, ChainId } from "../constant/constant";
import { WagmiConfig } from "wagmi";

import { getWagmiConfig, getConfigureChains } from "../rainbow/rainbow";
import { darkTheme } from "../rainbowkit/src/themes/darkTheme";
import { RainbowKitProvider } from "../rainbowkit/src/components/RainbowKitProvider/RainbowKitProvider";
import { useTelegramUser, useWebAppData } from "../hooks/useTelegramUser";
import { useSetAaWallet } from "../gas0/hooks/useWalletHandler";

type IProps = {
  env: string;
  children: ReactNode;
  chainIdList?: Array<ChainId>;
};
const RainbowKitWithThemeProvider: FC<IProps> = ({
  children,
  env,
  chainIdList,
}: IProps) => {
  const WebAppData = useTelegramUser();
  const setAaWallet = useSetAaWallet();
  const { wagmiConfig, chains, computedTheme } = useMemo(() => {
    if (env) {
      const wagmiConfig = getWagmiConfig({
        env,
        chainIdList,
        WebAppData,
        setAaWallet,
      });
      const { chains } = getConfigureChains({ env });
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
  }, [WebAppData]);
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
