type ISwapPoint = {
    isLoading: boolean;
    swapPointL2Handle: any;
};
export declare const useSwapPointL2: ({ env, setSuccessToast, setErrorToast, }: {
    env: string;
    setSuccessToast: any;
    setErrorToast: any;
}) => ISwapPoint;
export {};
