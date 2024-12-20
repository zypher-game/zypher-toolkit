import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
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

import { useAaWallet } from "../../../../gas0/hooks/useWalletHandler";
import { ChainId } from "../../../../constant/constant";
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
    allowance,
    health,
    getWithdrawETH,
  }: IUseGPDeposit) => {
    const [depositValue, setDepositValue] = useState("");
    const [receiveValue, setReceiveValue] = useState("");
    const pointsBalance = useRecoilValue(pointsBalanceState);
    const pointsBalanceStr = usePointsBalanceStr();
    const [actualReceived, setActualReceived] = useState("-");
    const isW768 = useIsW768();

    const { chainId } = useAaWallet();
    const [isL3, setIsL3] = useState(false);
    const [isL2, setIsL2] = useState(false);
    useEffect(() => {
      if (chainId) {
        setIsL3(
          [ChainId.ZytronLineaMain, ChainId.ZytronLineaSepoliaTestnet].includes(
            chainId
          )
        );
        setIsL2([ChainId.LineaMainnet, ChainId.LineaSepolia].includes(chainId));
      }
    }, [chainId]);

    const maxHandle = useCallback(() => {
      if (chainId && isL3) {
        setDepositValue(`${pointsBalance}`);
        const value = new BigNumberJs(pointsBalance)
          .times(ChainPointPrice[chainId])
          .toFixed();
        if (value === "NaN") {
          setReceiveValue("");
        } else {
          setReceiveValue(value);
        }
      }
    }, [pointsBalance, isL3]);
    const depositInputHandle = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (chainId && isL3) {
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
        }
      },
      [chainId, isL3]
    );
    const receiveInputHandle = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (chainId && isL3) {
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
        }
      },
      [chainId, isL3]
    );
    const getWithdrawETHHandle = useCallback(
      async (depositValue: string) => {
        if (getWithdrawETH) {
          const v = await getWithdrawETH(depositValue);
          setActualReceived(v);
        }
      },
      [getWithdrawETH]
    );
    const withdrawFree = useMemo(() => {
      if (
        chainId &&
        isL3 &&
        [receiveValue].every(
          (val: string) => !isNaN(Number(val)) && Number(val) > 0
        )
      ) {
        getWithdrawETHHandle(depositValue);
        return `${formatMoney(
          new BigNumberJs(receiveValue).times(0.001).toFixed(),
          8
        )} ${Currency[chainId]}`;
      }
      return "-";
    }, [receiveValue, getWithdrawETHHandle, isL3, chainId]);
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
      if (isL2) {
        obj.btnLabel = "Switch to Zytron Linea Layer3";
      }
      return obj;
    }, [chainId, isL2, pointBalance, allowance, depositValue]);

    const isDisable = useMemo(() => {
      if (isL2) {
        return false;
      }
      if (
        [depositValue, receiveValue].every(
          (val: string) => !isNaN(Number(val)) && Number(val) > 0
        )
      ) {
        const bol =
          loadingWithdraw ||
          new BigNumberJs(depositValue)
            .times(divisorBigNumber)
            .lt(health?.minWithdraw ?? "0");
        // new BigNumberJs(depositValue)
        //   .times(divisorBigNumber)
        //   .gt(health?.maxWithdraw ?? "0");
        if (bol) {
          return isBalanceEnough;
        }
        return bol;
      }
      return false;
    }, [
      isL2,
      isBalanceEnough,
      loadingWithdraw,
      depositValue,
      receiveValue,
      JSON.stringify(health),
    ]);
    const withdrawHandle = useCallback(() => {
      if (withdraw) {
        withdraw({
          nativeValue: receiveValue,
          GPValue: depositValue,
          isL2: isL2,
        });
      }
    }, [withdraw, isL2, receiveValue, depositValue]);
    // 0.0178
    return (
      <>
        {GPToken && chainId ? (
          <FromToken
            label="Withdraw"
            balanceStr={pointsBalanceStr}
            chainId={chainId}
            token={GPToken}
            maxHandle={maxHandle}
            onChange={depositInputHandle}
            value={depositValue}
            inputDisabled={isL2}
          />
        ) : null}
        <SvgComponent
          className="S_arr_down"
          src={preStaticUrl + "/img/icon/pixel_arrow_down02.svg"}
        />
        {/* Receive */}
        {NativeToken && chainId ? (
          <ToToken
            label="Receive"
            chainId={chainId}
            token={NativeToken}
            onChange={receiveInputHandle}
            value={receiveValue}
            inputDisabled={isL2}
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
          <li>
            <p>Actual amount received</p>
            <div className="S_fr">
              <p>
                {actualReceived}{" "}
                {chainId && Currency[chainId] ? Currency[chainId] : "-"}
              </p>
            </div>
          </li>
          {!isDisable && depositValue && actualReceived === "-" ? (
            <li>
              <p></p>
              <div className="S_fr_column">
                <p className="S_fr_yellow">
                  The operation is too frequent. Please try again later.
                </p>
              </div>
            </li>
          ) : null}
        </ul>
        <ActivePixelButtonColor
          className="W_staking_confirm"
          width="100%"
          height={isW768 ? "48px" : "54px"}
          pixel_height={5}
          disable={isDisable || actualReceived === "-"}
          onClick={withdrawHandle}
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
