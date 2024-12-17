import React, { memo, useMemo } from "react";
import styled from "styled-components";

import "./TokenWithChain.styl";
import {
  defaultActiveChainId,
  IToken,
  TVLChainId,
} from "../../../constant/tvlConstant";
import {
  ChainId,
  ChainImage,
  Currency,
  CurrencyLogo,
} from "../../../constant/constant";
const Wrap = styled.div<{ width?: number }>`
  width: ${({ width }) => width ?? 22}px;
  height: ${({ width }) => width ?? 22}px;
`;
const TokenWithChain = memo(
  ({
    token,
    chainId,
    width,
  }: {
    token: IToken;
    chainId?: ChainId | TVLChainId;
    width?: number;
  }) => {
    const { cLogo, cChainId } = useMemo((): {
      cLogo: string;
      cChainId: ChainId;
    } => {
      const _c = (chainId ?? defaultActiveChainId) as unknown as ChainId;
      return {
        cChainId: _c,
        cLogo: token.logoPath ? token.logoPath : CurrencyLogo[_c],
      };
    }, [JSON.stringify(token), chainId]);
    return (
      <Wrap className={"token_with_chain"} width={width}>
        <img
          decoding="async"
          loading="lazy"
          className={"token_with_chain_token"}
          src={cLogo}
          alt={token.symbol}
        />
        <img
          className={"token_with_chain_chain_id"}
          src={ChainImage[cChainId]}
          alt={Currency[cChainId]}
        />
      </Wrap>
    );
  }
);
export default TokenWithChain;
