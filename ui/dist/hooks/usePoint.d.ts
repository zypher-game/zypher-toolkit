import { ChainId, IPointsItem } from '..';
export declare const ChainPointPrice: Record<ChainId, number>;
export declare const pointsListDefault: (chainId: ChainId) => IPointsItem[] | undefined;
type ISwapPoint = {
    isLoading: boolean;
    swapPointHandle: any;
};
export declare const useSwapPoint: ({ env, setSuccessToast, setErrorToast, }: {
    env: string;
    setSuccessToast: any;
    setErrorToast: any;
}) => ISwapPoint;
export {};
