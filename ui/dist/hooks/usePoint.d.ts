import { ChainId, IPointsItem } from "..";
export declare const pointsListDefault: (chainId: ChainId) => IPointsItem[] | undefined;
type ISwapPoint = {
    isLoading: boolean;
    swapPointHandle: any;
};
export declare const useSwapPoint: ({ env, dispatch, setSuccessToast, setErrorToast, }: {
    env: string;
    dispatch: any;
    setSuccessToast: any;
    setErrorToast: any;
}) => ISwapPoint;
export {};
