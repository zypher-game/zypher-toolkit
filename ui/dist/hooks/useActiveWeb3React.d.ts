import { PublicClient } from "wagmi";
import { ChainId } from "../constant/constant";
export declare function useActiveWeb3React(): {
    chainId: ChainId;
    account: `0x${string}` | undefined;
    provider: PublicClient;
};
export declare function useActiveWeb3ReactForBingo(): {
    chainId: ChainId;
    account: `0x${string}` | undefined;
    provider: PublicClient;
};
