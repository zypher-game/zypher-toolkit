import classnames from "classnames";
import { isEqual } from "../../../utils/lodash";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import "../Staking.styl";
import { useIsW768 } from "../../../hooks/useWindowSize";

import ModalWithMotion from "../../../components/Modal/ModalWithMotion/ModalWithMotion";
import { IPointsDialog } from "../../ConnectWallet/components/PointsDialog/PointsDialog.type";
import {
  pointsV2DialogState,
  pointsV2TabIndexState,
} from "../../ConnectWallet/state/connectWalletState";
import { PixelBorderCard, PixelCube2 } from "../../PixelBtn/ActivePixelButton";
import DialogClose from "../../DialogClose/DialogClose";
import GPDeposit from "./components/GPDeposit";
import { useAaWallet } from "../../../gas0/hooks/useWalletHandler";
import { ChainId } from "../../../constant/constant";
import GPWithdraw from "./components/GPWithdraw";
import { useGPDeposit } from "./hooks/useGPDeposit";
const tabTitleArr = ["Deposit", "Withdraw"];
const PointsV2Dialog = memo(
  ({ env, setSuccessToast, setErrorToast }: IPointsDialog) => {
    const [tabIndex, setTabIndex] = useRecoilState(pointsV2TabIndexState);
    const [pointsV2DialogOpen, setPointsV2DialogOpen] =
      useRecoilState(pointsV2DialogState);
    const { chainId } = useAaWallet();
    const handleCancel = useCallback(() => {
      setPointsV2DialogOpen(false);
    }, []);
    const [chainDetail, setChainDetail] = useState<{
      L2: boolean;
      L3: boolean;
    }>({
      L2: false,
      L3: false,
    });
    const isW768 = useIsW768();
    const changeTableHandle = useCallback(
      (index) => {
        if (tabIndex !== index) {
          setTabIndex(index);
        }
      },
      [tabIndex]
    );
    const {
      NativeToken,
      GPToken,
      withdraw,
      deposit,
      loadingDeposit,
      loadingWithdraw,
      loadingApprove,
      allowance,
      health,
    } = useGPDeposit({
      env,
      setSuccessToast,
      setErrorToast,
    });
    useEffect(() => {
      console.log({ chainId });
      if (chainId) {
        setChainDetail({
          L3: [
            ChainId.ZytronLineaMain,
            ChainId.ZytronLineaSepoliaTestnet,
          ].includes(chainId),
          L2: [ChainId.LineaMainnet, ChainId.LineaSepolia].includes(chainId),
        });
      }
    }, [chainId]);

    return (
      <ModalWithMotion
        isOpen={pointsV2DialogOpen}
        onDismiss={() => setPointsV2DialogOpen(false)}
        contentClassName={classnames("customDialog", "bottom", "dialog")}
      >
        <PixelBorderCard
          hidePixel={isW768 ? true : false}
          width={"505px"}
          className="W_staking_staking S_staking"
          pixel_height={9}
          backgroundColor="#1D263B"
        >
          {chainDetail.L3 ? (
            <PixelCube2
              className="SS_tab"
              pixel_height={4}
              height={isW768 ? "36px" : "44px"}
              backgroundColor="#1D263B"
              borderColor="#1649FF"
            >
              {tabTitleArr.map((v, index) => (
                <div
                  className={`SS_tab_li  ${index === tabIndex ? "on" : ""}`}
                  key={v}
                  onClick={() => changeTableHandle(index)}
                >
                  <p>{v}</p>
                </div>
              ))}
            </PixelCube2>
          ) : (
            <h3 className="S_title">Deposit</h3>
          )}
          {chainDetail.L2 || tabIndex === 0 ? (
            <GPDeposit
              NativeToken={NativeToken}
              GPToken={GPToken}
              deposit={deposit}
              loadingDeposit={loadingDeposit}
              health={health}
            />
          ) : null}
          {chainDetail.L3 && tabIndex === 1 ? (
            <GPWithdraw
              NativeToken={NativeToken}
              GPToken={GPToken}
              withdraw={withdraw}
              loadingWithdraw={loadingWithdraw}
              loadingApprove={loadingApprove}
              allowance={allowance}
              health={health}
            />
          ) : null}
          <DialogClose onClick={handleCancel} />
        </PixelBorderCard>
      </ModalWithMotion>
    );
  },
  isEqual
);
export default PointsV2Dialog;
