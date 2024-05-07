import React from 'react';
import { TransactionStore } from './transactionStore';
export declare function TransactionStoreProvider({ children }: {
    children: React.ReactNode;
}): React.JSX.Element;
export declare function useTransactionStore(): TransactionStore;
