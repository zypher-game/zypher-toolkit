export declare function getWeb3Sign(dataToSign: string, account: string, isArrayify: boolean | undefined, walletClient: any): Promise<boolean | string>;
export declare function getEIP712Sign({ domain, types, data, account, }: {
    domain: any;
    types: any;
    data: any;
    account: string;
}): Promise<boolean | string>;
