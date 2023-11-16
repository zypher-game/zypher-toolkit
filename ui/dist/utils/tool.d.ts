import BigNumber from 'bignumber.js';
export declare const eX: (value: any, x: any) => BigNumber;
export declare function pow10(num: number | string | BigNumber | undefined, decimals?: number): BigNumber;
export declare function bnPow10(num: number | string | BigNumber | undefined, decimals?: number): BigNumber;
export declare const formatDecimal: (number: number, decimal?: number) => string;
export declare const formatMoney: (value: number | string, n?: number) => string;
export declare function getShortenAddress(address: string | null | undefined, preLen?: number, endLen?: number): string;
export declare function getShortenAddress2(address: string): string;
export declare function filterInput(val: string): string;
export declare const convertToLargeNumberRepresentation: (value: BigNumber) => string;
export declare function measureText(text: string, font: string): number;
export declare const splitArrByLen: (arr: any[], len: number) => any[][];
export declare function formatCurrency(amount: number, precision?: number): string;
export declare function formatSymbol(symbol: undefined | string): string;
