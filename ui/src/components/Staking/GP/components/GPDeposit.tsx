import React, { memo, useCallback, useMemo, useState } from "react";
import { isEqual } from "../../../../utils/lodash";
import FromToken from "./fromToken";
import SvgComponent from "../../../SvgComponent/SvgComponent";
import { divisorBigNumber, preStaticUrl } from "../../../../constant/constant";
import ToToken from "./toToken";
import Detail from "./details";
import { ActivePixelButtonColor } from "../../../PixelBtn/ActivePixelButton";
import { useIsW768 } from "../../../../hooks/useWindowSize";
import { ChainPointPrice } from "../../../../hooks/usePoint";
import BigNumberJs from "../../../../utils/BigNumberJs";
import { useActiveWeb3React } from "../../../../hooks/useActiveWeb3React";
import { useRecoilValue } from "recoil";
import { nativeBalanceState } from "../../../ConnectWallet/state/connectWalletState";
import { useNativeBalanceStr } from "../../../ConnectWallet/hooks/connectWalletHooks";
import LoadingButton from "../../../LoadingSvg/LoadingButton";
import { IUseGPDeposit } from "../hooks/useGPDeposit";
import { GPV2SupportChainId } from "../constant/GPConstant";

const GPDeposit = memo(
  ({
    NativeToken,
    GPToken,
    deposit,
    loadingDeposit,
    health,
  }: IUseGPDeposit) => {
    const [depositValue, setDepositValue] = useState("");
    const [receiveValue, setReceiveValue] = useState("");
    const { chainId } = useActiveWeb3React();
    const nativeBalance = useRecoilValue(nativeBalanceState);
    const nativeBalanceStr = useNativeBalanceStr();
    const isW768 = useIsW768();
    const maxHandle = useCallback(() => {
      setDepositValue(`${nativeBalance}`);
      const value = new BigNumberJs(nativeBalance)
        .dividedBy(ChainPointPrice[chainId])
        .toFixed();
      if (value === "NaN") {
        setReceiveValue("");
      } else {
        setReceiveValue(value);
      }
    }, [nativeBalance]);
    const depositInputHandle = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const regex = /^\d*\.?\d{0,8}$/;
        if (regex.test(inputValue)) {
          setDepositValue(inputValue);
          const value = new BigNumberJs(inputValue)
            .dividedBy(ChainPointPrice[chainId])
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
            .times(ChainPointPrice[chainId])
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
    const isDisable = useMemo(() => {
      return (
        loadingDeposit ||
        ![depositValue, receiveValue].every(
          (val: string) => !isNaN(Number(val)) && Number(val) > 0
        )
      );
    }, [loadingDeposit, depositValue, receiveValue]);

    const { btnLabel, isBalanceEnough } = useMemo(() => {
      const obj = {
        isBalanceEnough: false,
        btnLabel: "Deposit",
      };
      if (
        [depositValue, receiveValue].every(
          (val: string) => !isNaN(Number(val)) && Number(val) > 0
        )
      ) {
        if (chainId) {
          if (GPV2SupportChainId.includes(chainId)) {
            if (new BigNumberJs(nativeBalance).gte(depositValue)) {
              obj.isBalanceEnough = true;
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
    }, [chainId, nativeBalance, depositValue]);

    return (
      <>
        {NativeToken ? (
          <FromToken
            label="Deposit"
            balanceStr={nativeBalanceStr}
            chainId={chainId}
            token={NativeToken}
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
        {GPToken ? (
          <ToToken
            label="Receive"
            chainId={chainId}
            token={GPToken}
            onChange={receiveInputHandle}
            value={receiveValue}
          />
        ) : null}
        <ul className="S_text_li">
          <li>
            <p>Minimum deposit amount</p>
            <div className="S_fr">
              <p>{health?.minDepositStr} ETH</p>
            </div>
          </li>
          <Detail />
        </ul>
        <ActivePixelButtonColor
          className="W_staking_confirm"
          width="100%"
          height={isW768 ? "48px" : "54px"}
          pixel_height={5}
          disable={isDisable || !isBalanceEnough}
          onClick={() =>
            deposit &&
            deposit({ nativeValue: depositValue, GPValue: receiveValue })
          }
          themeType="brightBlue"
        >
          <p>{btnLabel}</p>
          <LoadingButton isLoading={loadingDeposit} />
        </ActivePixelButtonColor>
      </>
    );
  },
  isEqual
);
export default GPDeposit;
