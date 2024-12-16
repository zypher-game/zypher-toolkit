import React from "react";
import "./TokenWithChain.styl";
import { IToken, TVLChainId } from "../../../constant/tvlConstant";
import { ChainId } from "../../../constant/constant";
declare const TokenWithChain: React.MemoExoticComponent<({ token, chainId, width, }: {
    token: IToken;
    chainId?: ChainId | TVLChainId | undefined;
    width?: number | undefined;
}) => React.JSX.Element>;
export default TokenWithChain;
