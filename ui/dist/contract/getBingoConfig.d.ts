import { Address } from 'viem';
import { ChainId, IContractName } from '../constant/constant';
export declare enum IBingoVersion {
    'v1' = "v1",
    'beta' = "beta",
    'champion' = "champion"
}
export declare const getBingoConfig: ({ contractName, bingoVersion, chainId, }: {
    contractName: IContractName;
    bingoVersion: IBingoVersion;
    chainId: ChainId;
}) => [any, Address];
