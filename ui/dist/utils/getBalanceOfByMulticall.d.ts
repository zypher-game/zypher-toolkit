import { Address } from "wagmi";
import { ChainId } from "../constant/constant";
export declare const fetchErc20: ({ address, chainId, account, }: {
    address: Address;
    chainId: ChainId;
    account: Address;
}) => Promise<boolean | undefined>;
