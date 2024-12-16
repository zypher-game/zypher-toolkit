import classnames from "classnames";
import { isEqual } from "../../../utils/lodash";
import React, { memo, useCallback, useMemo, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import "../Staking.styl";
import { useActiveWeb3React } from "../../../hooks/useActiveWeb3React";
import { useIsW768 } from "../../../hooks/useWindowSize";
import {
  Currency,
  getCryptoImg,
  IContractName,
  preStaticUrl,
  zkBingo,
} from "../../../constant/constant";

import ModalWithMotion from "../../../components/Modal/ModalWithMotion/ModalWithMotion";
import { zeroAddress } from "viem";
import { IPointsDialog } from "../../ConnectWallet/components/PointsDialog/PointsDialog.type";
import {
  nativeBalanceState,
  pointsL2DialogState,
} from "../../ConnectWallet/state/connectWalletState";
import { useNativeBalanceStr } from "../../ConnectWallet/hooks/connectWalletHooks";
import {
  ActivePixelButtonColor,
  PixelBorderCard,
} from "../../PixelBtn/ActivePixelButton";
import DialogClose from "../../DialogClose/DialogClose";
import LoadingButton from "../../LoadingSvg/LoadingButton";
import FromToken from "./components/fromToken";
import ToToken from "./components/toToken";
import Detail from "./components/details";
import SvgComponent from "../../SvgComponent/SvgComponent";
import BigNumberJs from "../../../utils/BigNumberJs";
import { ChainPointPrice } from "../../../hooks/usePoint";

const PointsL2Dialog = memo(
  ({ env, setSuccessToast, setErrorToast }: IPointsDialog) => {
    const [pointsL2DialogOpen, setPointsL2DialogOpen] =
      useRecoilState(pointsL2DialogState);
    const [depositValue, setDepositValue] = useState("");
    const [receiveValue, setReceiveValue] = useState("");
    const { chainId } = useActiveWeb3React();
    const nativeBalance = useRecoilValue(nativeBalanceState);
    const nativeBalanceStr = useNativeBalanceStr();
    const isW768 = useIsW768();
    const handleCancel = useCallback(() => {
      setPointsL2DialogOpen(false);
    }, []);
    const { NativeToken, GPToken } = useMemo(() => {
      const currency = Currency[chainId];
      return {
        NativeToken: {
          index: 1,
          address: zeroAddress,
          symbol: currency,
          logoPath: getCryptoImg("token", currency),
        },
        GPToken: {
          index: 2,
          address: zkBingo(chainId, IContractName.ZypherGameToken),
          symbol: "GP",
          logoPath: getCryptoImg("token", "GP"),
        },
      };
    }, [chainId]);

    const maxHandle = useCallback(() => {
      setDepositValue(`${nativeBalance}`);
    }, [nativeBalance]);
    const depositInputHandle = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const regex = /^\d*\.?\d{0,8}$/;
        if (regex.test(inputValue)) {
          setDepositValue(inputValue);
          console.log({
            ChainPointPrice: new BigNumberJs(
              ChainPointPrice[chainId]
            ).toFixed(),
            chainId,
          });
          const value = new BigNumberJs(inputValue)
            .dividedBy(ChainPointPrice[chainId])
            .toFixed();
          setReceiveValue(value);
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
        }
      },
      []
    );
    const deposit = useCallback(() => {}, []);
    return (
      <ModalWithMotion
        isOpen={pointsL2DialogOpen}
        onDismiss={() => setPointsL2DialogOpen(false)}
        contentClassName={classnames("customDialog", "bottom", "dialog")}
      >
        <PixelBorderCard
          hidePixel={isW768 ? true : false}
          width={"505px"}
          className="W_staking_staking S_staking"
          pixel_height={9}
          backgroundColor="#1D263B"
        >
          <h3 className="S_title">Deposit</h3>
          <FromToken
            label="Deposit"
            balanceStr={nativeBalanceStr}
            chainId={chainId}
            token={NativeToken}
            maxHandle={maxHandle}
            onChange={depositInputHandle}
            value={depositValue}
          />
          <SvgComponent
            className="S_arr_down"
            src={preStaticUrl + "/img/icon/pixel_arrow_down02.svg"}
          />
          {/* Receive */}
          <ToToken
            label="Receive"
            chainId={chainId}
            token={GPToken}
            onChange={receiveInputHandle}
            value={receiveValue}
          />
          <ul className="S_text_li">
            <Detail />
          </ul>
          <ActivePixelButtonColor
            className="W_staking_confirm"
            width="100%"
            height={isW768 ? "48px" : "54px"}
            pixel_height={5}
            onClick={() => deposit()}
            themeType="brightBlue"
          >
            <p>Deposit</p>
            <LoadingButton isLoading={false} />
          </ActivePixelButtonColor>
        </PixelBorderCard>
        <DialogClose onClick={handleCancel} />
      </ModalWithMotion>
    );
  },
  isEqual
);
export default PointsL2Dialog;
