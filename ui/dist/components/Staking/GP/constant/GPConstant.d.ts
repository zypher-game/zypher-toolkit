import { ChainId } from "../../../../constant/constant";
import { Address } from "viem";
export declare const GPAddress: Record<ChainId, {
    GP: Address;
    Store: Address;
}>;
export declare const GPV2SupportChainId: ChainId[];
