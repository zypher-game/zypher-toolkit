export interface ChainModalProps {
    fn: any;
    open: boolean;
    onClose: () => void;
}
declare enum ChainId {
    Mainnet = 56,
    Testnet = 97,
    Arbitrum = 42161,
    ArbitrumRinkeby = 421611,
    LineaTestnet = 59140,
    LineaMainnet = 59144,
    POLYGON_MUMBAI = 80001,
    POLYGON_ZKEVM = 1442,
    ArbitrumGoerli = 421613,
    ScrollAlphaTestnet = 534353,
    OPBNBTEST = 5611,
    OPBNB = 204,
    ScrollSepoliaTestnet = 534351,
    MantaPacificMainnet = 169,
    MantaPacificTestnet = 3441005,
    Combo = 9980,
    ComboTestnet = 91715,
    Mantle = 5000,
    MantleTestnet = 5001
}
export declare const UnSupportBingoChainId: ChainId[];
export declare function ChainModal({ onClose, open, fn }: ChainModalProps): any;
export {};
