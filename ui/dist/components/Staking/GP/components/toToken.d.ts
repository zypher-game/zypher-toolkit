import React from "react";
import { ChainId } from "../../../../constant/constant";
import { IToken } from "../../../../constant/tvlConstant";
declare const ToToken: React.MemoExoticComponent<({ chainId, token, onChange, value, label, }: {
    chainId: ChainId;
    token: IToken;
    onChange: any;
    value: string;
    label: string;
}) => React.JSX.Element>;
export default ToToken;
