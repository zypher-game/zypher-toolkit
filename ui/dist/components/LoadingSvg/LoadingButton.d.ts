import React from "react";
import "./LoadingButton.styl";
declare const LoadingButton: React.MemoExoticComponent<({ className, hideMl, isLoading, }: {
    className?: string | undefined;
    hideMl?: boolean | undefined;
    isLoading?: boolean | undefined;
}) => React.JSX.Element>;
export default LoadingButton;
