import React, { ReactNode } from 'react';
import { Chain as WagmiChain } from 'wagmi';
export interface RainbowKitChain {
    id: number;
    name?: string;
    iconUrl?: string | (() => Promise<string>) | null;
    iconBackground?: string;
}
export type Chain = WagmiChain & RainbowKitChain;
interface RainbowKitChainProviderProps {
    chains: RainbowKitChain[];
    initialChain?: RainbowKitChain | number;
    children: ReactNode;
}
export declare function RainbowKitChainProvider({ chains, children, initialChain }: RainbowKitChainProviderProps): React.JSX.Element;
export declare const useRainbowKitChains: () => any;
export declare const useInitialChainId: () => any;
export declare const useRainbowKitChainsById: () => any;
export {};
