import { ChainId } from "../constant/constant";
export declare const getConfigureChains: (env: string) => {
    chains: Chain[];
    publicClient: ({ chainId }: {
        chainId?: number | undefined;
    }) => import("@wagmi/core/dist/index-fc9ab085").P<import("viem").FallbackTransport>;
    webSocketPublicClient: ({ chainId }: {
        chainId?: number | undefined;
    }) => import("@wagmi/core/dist/index-fc9ab085").W<import("viem").FallbackTransport> | undefined;
};
export declare const getWagmiConfig: (env: string) => import("@wagmi/core").Config<import("@wagmi/core/dist/index-fc9ab085").P<import("viem").FallbackTransport>, import("@wagmi/core/dist/index-fc9ab085").W<import("viem").FallbackTransport>> & {
    queryClient: import("@tanstack/query-core").QueryClient;
};
export declare const viemClients: (env: string) => Chain;
export declare const getViemClients: ({ env, chainId, }: {
    env: string;
    chainId: ChainId;
}) => Chain;
