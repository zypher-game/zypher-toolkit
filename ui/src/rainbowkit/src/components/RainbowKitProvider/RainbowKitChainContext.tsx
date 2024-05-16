import React, { createContext, ReactNode, useContext, useMemo } from "react";
import { Chain as WagmiChain } from "wagmi";

export interface RainbowKitChain {
  id: number;
  name?: string;
  iconUrl?: string | (() => Promise<string>) | null;
  iconBackground?: string;
}

// This type is a combination of wagmi and RainbowKit chain types to make
// it easier for consumers to define their chain config in a single place.
export type Chain = WagmiChain & RainbowKitChain;

interface RainbowKitChainContextValue {
  chains: RainbowKitChain[];
  initialChainId?: number;
}

const RainbowKitChainContext = createContext<RainbowKitChainContextValue>({
  chains: [],
});

interface RainbowKitChainProviderProps {
  chains: RainbowKitChain[];
  initialChain?: RainbowKitChain | number;
  children: ReactNode;
}
export function RainbowKitChainProvider({
  chains,
  children,
  initialChain,
}: RainbowKitChainProviderProps): React.JSX.Element {
  return (
    <RainbowKitChainContext.Provider
      value={useMemo(
        () => ({
          chains: chains,
          initialChainId:
            typeof initialChain === "number" ? initialChain : initialChain?.id,
        }),
        [chains, initialChain]
      )}
    >
      {children}
    </RainbowKitChainContext.Provider>
  );
}
export const useRainbowKitChains = () => {
  return useContext(RainbowKitChainContext).chains;
};

export const useInitialChainId = () =>
  useContext(RainbowKitChainContext).initialChainId;

export const useRainbowKitChainsById = () => {
  const rainbowkitChains = useRainbowKitChains();

  return useMemo(() => {
    const rainbowkitChainsById: Record<number, RainbowKitChain> = {};

    rainbowkitChains.forEach((rkChain) => {
      rainbowkitChainsById[rkChain.id] = rkChain;
    });

    return rainbowkitChainsById;
  }, [rainbowkitChains]);
};