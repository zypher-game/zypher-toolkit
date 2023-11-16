import React from 'react';
import { TransactionStore } from './transactionStore';
export declare function TransactionStoreProvider({ children }: {
    children: React.ReactNode;
}): any;
export declare function useTransactionStore(): TransactionStore;
