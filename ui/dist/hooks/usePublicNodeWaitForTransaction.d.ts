import { TransactionReceipt } from "viem";
import { WaitForTransactionArgs } from "wagmi/actions";
export declare function usePublicNodeWaitForTransaction(env: string): {
    waitForTransaction: (opts: WaitForTransactionArgs) => Promise<TransactionReceipt | undefined>;
};
