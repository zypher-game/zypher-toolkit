import { Address } from "wagmi";
export declare const ZytronSignTypedData: (chainId: number) => {
    readonly domain: {
        readonly name: "Zytron";
        readonly chainId: number;
    };
    readonly types: {
        readonly Message: readonly [{
            readonly name: "tip";
            readonly type: "string";
        }, {
            readonly name: "nonce";
            readonly type: "uint256";
        }, {
            readonly name: "from";
            readonly type: "address";
        }, {
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly name: "value";
            readonly type: "uint256";
        }, {
            readonly name: "data";
            readonly type: "bytes";
        }];
    };
    readonly primaryType: "Message";
};
export declare const ZytronSetAdminTypedData: (chainId: number) => {
    readonly domain: {
        readonly name: "Zytron";
        readonly chainId: number;
    };
    readonly types: {
        readonly Message: readonly [{
            readonly name: "controller";
            readonly type: "address";
        }, {
            readonly name: "isAllow";
            readonly type: "bool";
        }, {
            readonly name: "nonce";
            readonly type: "uint256";
        }];
    };
    readonly primaryType: "Message";
};
export declare const ZytronPermitTypedData: (name: string, chainId: number, verifyingContract: Address) => {
    readonly domain: {
        readonly name: string;
        readonly version: "1";
        readonly chainId: number;
        readonly verifyingContract: `0x${string}`;
    };
    readonly types: {
        readonly Permit: readonly [{
            readonly name: "owner";
            readonly type: "address";
        }, {
            readonly name: "spender";
            readonly type: "address";
        }, {
            readonly name: "value";
            readonly type: "uint256";
        }, {
            readonly name: "nonce";
            readonly type: "uint256";
        }, {
            readonly name: "deadline";
            readonly type: "uint256";
        }];
    };
    readonly primaryType: "Permit";
};
export declare const ZytronMulticallTypedData: (chainId: number) => {
    readonly domain: {
        readonly name: "Zytron";
        readonly chainId: number;
    };
    readonly types: {
        readonly Message: readonly [{
            readonly name: "tip";
            readonly type: "string";
        }, {
            readonly name: "items";
            readonly type: "MessageItem[]";
        }, {
            readonly name: "nonce";
            readonly type: "uint256";
        }];
        readonly MessageItem: readonly [{
            readonly name: "from";
            readonly type: "address";
        }, {
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly name: "value";
            readonly type: "uint256";
        }, {
            readonly name: "data";
            readonly type: "bytes";
        }];
    };
    readonly primaryType: "Message";
};
