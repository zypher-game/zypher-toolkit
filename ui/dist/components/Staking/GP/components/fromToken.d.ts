import React from "react";
import { IToken } from "../../../../constant/tvlConstant";
import { ChainId } from "../../../../constant/constant";
declare const FromToken: React.MemoExoticComponent<({ label, balanceStr, chainId, token, maxHandle, onChange, value, }: {
    label: string;
    balanceStr: string;
    chainId: ChainId;
    token: IToken;
    onChange: any;
    value: string;
    maxHandle: () => void;
}) => React.JSX.Element>;
export default FromToken;
