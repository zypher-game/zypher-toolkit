import React from "react";
import { ChainId } from "../../../../constant/constant";
import { IToken } from "../../../../constant/tvlConstant";
declare const ToToken: React.MemoExoticComponent<({ chainId, token, onChange, value, label, inputDisabled, }: {
    chainId: ChainId;
    token: IToken;
    onChange: any;
    value: string;
    label: string;
    inputDisabled?: boolean | undefined;
}) => React.JSX.Element>;
export default ToToken;
