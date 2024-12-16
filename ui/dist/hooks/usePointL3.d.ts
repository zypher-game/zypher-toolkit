type ISwapPoint = {
    isLoading: boolean;
    swapPointL3Handle: any;
};
export declare const useSwapPointL3: ({ env, setSuccessToast, setErrorToast, }: {
    env: string;
    setSuccessToast: any;
    setErrorToast: any;
}) => ISwapPoint;
export {};
