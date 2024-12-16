import React, { memo } from "react";
import { isEqual } from "../../../../utils/lodash";
import TokenWithChain from "../../../Token/TokenWithChain/TokenWithChain";
import { IToken } from "../../../../constant/tvlConstant";
import {
  ActivePixelButton,
  PixelBorderCard,
} from "../../../PixelBtn/ActivePixelButton";
import { ChainId } from "../../../../constant/constant";
import { useIsW768 } from "../../../../hooks/useWindowSize";

const FromToken = memo(
  ({
    label,
    balanceStr,
    chainId,
    token,
    maxHandle,
    onChange,
    value,
  }: {
    label: string;
    balanceStr: string;
    chainId: ChainId;
    token: IToken;
    onChange: any;
    value: string;
    maxHandle: () => void;
  }) => {
    const isW768 = useIsW768();
    return (
      <>
        <div className="S_staking_token_detail">
          <p className="S_staking_token_detail_fl">{label}</p>
          <div className="S_staking_token_detail_fr">
            <p className="S_staking_token_detail_balance">
              Balance: {balanceStr}
            </p>
            <TokenWithChain chainId={chainId} token={token} />
            <ActivePixelButton
              className="S_staking_max"
              width="40px"
              height="20px"
              backgroundColor="#661AFF"
              pixel_height={2}
              onClick={maxHandle}
            >
              <p>MAX</p>
            </ActivePixelButton>
          </div>
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
export default FromToken;
