import React, { memo } from "react";
import {
  ActivePixelButton,
  PixelBorderCard,
} from "../../../PixelBtn/ActivePixelButton";
import TokenWithChain from "../../../Token/TokenWithChain/TokenWithChain";
import { ChainId } from "../../../../constant/constant";
import { IToken } from "../../../../constant/tvlConstant";
import { useIsW768 } from "../../../../hooks/useWindowSize";
import { isEqual } from "../../../../utils/lodash";

const ToToken = memo(
  ({
    chainId,
    token,
    onChange,
    value,
    label,
  }: {
    chainId: ChainId;
    token: IToken;
    onChange: any;
    value: string;
    label: string;
  }) => {
    const isW768 = useIsW768();
    return (
      <>
        <div className="S_staking_token_detail">
          <p className="S_staking_token_detail_fl">{label}</p>
        </div>
        <PixelBorderCard
          className="W_staking_input"
          width="100%"
          height={isW768 ? "44px" : "58px"}
          pixel_height={6}
          backgroundColor="#343C4F"
          borderColor="#484F60"
        >
          <input onChange={onChange} type="text" value={value} />
          <ActivePixelButton
            className={"W_staking_input_btn"}
            backgroundColor="#1649FF"
            pixel_height={6}
          >
            <TokenWithChain chainId={chainId} token={token} width={22} />
            <p>{token.symbol}</p>
          </ActivePixelButton>
        </PixelBorderCard>
      </>
    );
  },
  isEqual
);
export default ToToken;
