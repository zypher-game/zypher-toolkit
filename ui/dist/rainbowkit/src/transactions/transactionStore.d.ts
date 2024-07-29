import type { PublicClient } from "viem";
type TransactionStatus = "pending" | "confirmed" | "failed";
export interface Transaction {
    hash: string;
    description: string;
    status: TransactionStatus;
    confirmations?: number;
}
export type NewTransaction = Omit<Transaction, "status">;
export declare function createTransactionStore({ provider: initialProvider, }: {
    provider: PublicClient;
}): {
    addTransaction: (account: string, chainId: number, transaction: NewTransaction) => void;
    clearTransactions: (account: string, chainId: number) => void;
    getTransactions: (account: string, chainId: number) => Transaction[];
    onChange: (fn: () => void) => () => void;
    setProvider: (newProvider: PublicClient) => void;
    waitForPendingTransactions: (account: string, chainId: number) => Promise<void>;
};
export type TransactionStore = ReturnType<typeof createTransactionStore>;
export {};
