import React, { memo, useCallback, useMemo, useState } from "react";
import { isEqual } from "../../../../utils/lodash";
import FromToken from "./fromToken";
import SvgComponent from "../../../SvgComponent/SvgComponent";
import {
  Currency,
  divisorBigNumber,
  preStaticUrl,
} from "../../../../constant/constant";
import ToToken from "./toToken";
import Detail from "./details";
import { ActivePixelButtonColor } from "../../../PixelBtn/ActivePixelButton";
import { useIsW768 } from "../../../../hooks/useWindowSize";
import { ChainPointPrice } from "../../../../hooks/usePoint";
import BigNumberJs from "../../../../utils/BigNumberJs";
import { useActiveWeb3React } from "../../../../hooks/useActiveWeb3React";
import { useRecoilValue } from "recoil";
import { pointsBalanceState } from "../../../ConnectWallet/state/connectWalletState";
import { usePointsBalanceStr } from "../../../ConnectWallet/hooks/connectWalletHooks";
import LoadingButton from "../../../LoadingSvg/LoadingButton";
import { formatMoney } from "../../../../utils/tool";
import { GPV2SupportChainId } from "../constant/GPConstant";
import { IUseGPDeposit } from "../hooks/useGPDeposit";

const GPWithdraw = memo(
  ({
    NativeToken,
    GPToken,
    withdraw,
    loadingWithdraw,
    loadingApprove,
    allowance,
    health,
  }: IUseGPDeposit) => {
    const [depositValue, setDepositValue] = useState("");
    const [receiveValue, setReceiveValue] = useState("");
    const { chainId } = useActiveWeb3React();
    const pointsBalance = useRecoilValue(pointsBalanceState);
    const pointsBalanceStr = usePointsBalanceStr();
    const isW768 = useIsW768();

    const maxHandle = useCallback(() => {
      setDepositValue(`${pointsBalance}`);
      const value = new BigNumberJs(pointsBalance)
        .times(ChainPointPrice[chainId])
        .toFixed();
      if (value === "NaN") {
        setReceiveValue("");
      } else {
        setReceiveValue(value);
      }
    }, [pointsBalance]);
    const depositInputHandle = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const regex = /^\d*\.?\d{0,8}$/;
        if (regex.test(inputValue)) {
          setDepositValue(inputValue);
          const value = new BigNumberJs(inputValue)
            .times(ChainPointPrice[chainId])
            .toFixed();
          if (value === "NaN") {
            setReceiveValue("");
          } else {
            setReceiveValue(value);
          }
        }
      },
      [chainId]
    );
    const receiveInputHandle = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const regex = /^\d*\.?\d{0,8}$/;
        if (regex.test(inputValue)) {
          setReceiveValue(inputValue);
          const value = new BigNumberJs(inputValue)
            .dividedBy(ChainPointPrice[chainId])
            .toFixed();
          if (value === "NaN") {
            setDepositValue("");
          } else {
            setDepositValue(value);
          }
        }
      },
      [chainId]
    );
    const withdrawFree = useMemo(() => {
      if (
        [receiveValue].every(
          (val: string) => !isNaN(Number(val)) && Number(val) > 0
        )
      ) {
        return `${formatMoney(
          new BigNumberJs(receiveValue).times(0.001).toFixed(),
          8
        )} ${Currency[chainId]}`;
      }
      return "-";
    }, [receiveValue]);
    const isDisable = useMemo(() => {
      return (
        loadingWithdraw ||
        loadingApprove ||
        ![depositValue, receiveValue].every(
          (val: string) => !isNaN(Number(val)) && Number(val) > 0
        )
      );
    }, [loadingWithdraw, depositValue, receiveValue]);
    const pointBalance = useRecoilValue(pointsBalanceState);
    const { btnLabel, isBalanceEnough } = useMemo(() => {
      const obj = {
        isApprove: false,
        isBalanceEnough: false,
        btnLabel: "Withdraw",
      };
      if (
        [depositValue, receiveValue].every(
          (val: string) => !isNaN(Number(val)) && Number(val) > 0
        )
      ) {
        if (chainId) {
          if (GPV2SupportChainId.includes(chainId)) {
            const tokenAmount = new BigNumberJs(depositValue)
              .times(divisorBigNumber)
              .toFixed();

            if (allowance && new BigNumberJs(pointBalance).gte(depositValue)) {
              obj.isBalanceEnough = true;
              if (new BigNumberJs(allowance).lt(tokenAmount)) {
                obj.isApprove = false;
                obj.btnLabel = "Approve";
              }
            } else {
              obj.btnLabel = "No Balance";
            }
          } else {
            obj.btnLabel = "Switch Networks";
          }
        } else {
          obj.btnLabel = "Connect Wallet";
        }
      }
      return obj;
    }, [chainId, pointBalance, allowance, depositValue]);
    // 0.0178
    return (
      <>
        {GPToken ? (
          <FromToken
            label="Withdraw"
            balanceStr={pointsBalanceStr}
            chainId={chainId}
            token={GPToken}
            maxHandle={maxHandle}
            onChange={depositInputHandle}
            value={depositValue}
          />
        ) : null}
        <SvgComponent
          className="S_arr_down"
          src={preStaticUrl + "/img/icon/pixel_arrow_down02.svg"}
        />
        {/* Receive */}
        {NativeToken ? (
          <ToToken
            label="Receive"
            chainId={chainId}
            token={NativeToken}
            onChange={receiveInputHandle}
            value={receiveValue}
          />
        ) : null}
        <ul className="S_text_li S_text_li_column">
          <li>
            <p>Minimum withdraw amount</p>
            <div className="S_fr">
              <p>{health?.minWithdrawStr} GP</p>
            </div>
          </li>
          <Detail />
          <li>
            <p>Withdraw free</p>
            <div className="S_fr_column">
              <p className="S_fr_yellow">0.1%</p>
              <p className="S_fr_grey">{withdrawFree}</p>
            </div>
          </li>
        </ul>
        <ActivePixelButtonColor
          className="W_staking_confirm"
          width="100%"
          height={isW768 ? "48px" : "54px"}
          pixel_height={5}
          disable={isDisable || !isBalanceEnough}
          onClick={() =>
            withdraw &&
            withdraw({ nativeValue: receiveValue, GPValue: depositValue })
          }
          themeType="brightBlue"
        >
          <p>{btnLabel}</p>
          <LoadingButton isLoading={loadingWithdraw} />
        </ActivePixelButtonColor>
      </>
    );
  },
  isEqual
);
export default GPWithdraw;
