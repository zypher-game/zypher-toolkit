export declare const ZytronSignTypedData: (chainId: number) => {
    readonly domain: {
        readonly name: "Zytron";
        readonly chainId: number;
    };
    readonly types: {
        readonly Message: readonly [{
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
