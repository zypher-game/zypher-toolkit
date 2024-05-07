import React from "react";
import "./LoadingButton.styl";
declare const LoadingButton: React.MemoExoticComponent<({ className, isLoading }: {
    className?: string | undefined;
    isLoading?: boolean | undefined;
}) => React.JSX.Element>;
export default LoadingButton;
