import { SyncOutlined } from "@ant-design/icons";

import { isEqual } from "../../../../utils/lodash";
import React, { memo, useCallback, useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

import CurrencyLogo from "../../../../components/CurrencyLogo";
import erc20Contract from "../../../../contract/erc20";
import { useActiveWeb3React } from "../../../../hooks/useActiveWeb3React";
import { PointsIcon } from "../../../../components/icons/PointsIcon/PointsIcon";
import Icon from "../../../../components/icons";
import {
  CurrencyLogo as CurrencyLogoUrl,
  divisorBigNumber,
  DPSupportChainId,
  IContractName,
  zkBingo,
} from "../../../../constant/constant";

import {
  useNativeBalanceStr,
  usePointsBalanceStr,
} from "../../hooks/connectWalletHooks";
import {
  nativeBalanceState,
  pointsBalanceState,
  refreshBalanceState,
} from "../../state/connectWalletState";
import "./balance.stylus";
import BalanceItem, { BalanceCountUpItem } from "./balanceItem";
import IsPixelWidget from "../../../Header/rainbow_account/IsPixelWidget";
import BigNumberJs from "../../../../utils/BigNumberJs";

const AddIcon = styled(Icon)<{ isMobile: boolean }>`
  margin-right: ${({ isMobile }) => (isMobile ? "4px" : "10px")};
  margin-left: 0 !important;
  width: ${({ isMobile }) => (isMobile ? "20px" : "24px")};
`;
interface IProps {
  env: string;
  className?: string;
  showPointsModal: any;
  CountUpNumber?: React.FC<any>;
  isMiddleWidth: boolean;
}

const Balance = memo((props: IProps): React.ReactElement | null => {
  const { showPointsModal, env, CountUpNumber, isMiddleWidth } = props;
  const { chainId, account, provider } = useActiveWeb3React();
  const [loading, setLoading] = useState(false);
  const setNativeBalance = useSetRecoilState(nativeBalanceState);
  const setPointsBalance = useSetRecoilState(pointsBalanceState);
  const refreshBalance = useRecoilValue(refreshBalanceState);
  const fetchBalanceOf = useCallback(async (): Promise<void> => {
    if (!chainId || !account) {
      return;
    }
    setLoading(true);
    const balance = await provider.getBalance({ address: account });
    setNativeBalance(
      new BigNumberJs(balance.toString()).dividedBy(divisorBigNumber).toNumber()
    );
    await fetchErc20Balance();
    setLoading(false);
  }, [chainId, account, provider]);
  const fetchErc20Balance = useCallback(async (): Promise<void> => {
    if (!chainId || !account || !provider) {
      return;
    }
    try {
      const pointsAddress = zkBingo(chainId, IContractName.ZypherGameToken); // CurrencyContract[chainId].pointsAddress
      if (!pointsAddress) {
        setPointsBalance(0);
      } else {
        const pointsContract = erc20Contract(chainId, env, pointsAddress);
        const balance = await pointsContract.read.balanceOf([account]);
        setPointsBalance(
          new BigNumberJs(balance.toString())
            .dividedBy(divisorBigNumber)
            .toNumber()
        );
      }
    } catch (e) {
      setPointsBalance(0);
    }
  }, [chainId, account, provider]);
  useEffect(() => {
    if (account && chainId) {
      fetchBalanceOf();
    }
  }, [account, chainId, refreshBalance]);

  const pointsBalance = useRecoilValue(pointsBalanceState);

  const nativeBalanceStr = useNativeBalanceStr();
  const pointsBalanceStr = usePointsBalanceStr();

  return (
    <>
      {isMiddleWidth ? null : (
        <IsPixelWidget
          className="refresh_balance  refresh_balance_pixel"
          onClick={fetchBalanceOf}
        >
          <SyncOutlined />
        </IsPixelWidget>
      )}
      {DPSupportChainId.includes(chainId) ? (
        <BalanceCountUpItem
          onClick={showPointsModal}
          logo={<PointsIcon isMobile={isMiddleWidth} />}
          balance={pointsBalance}
          loading={loading}
          className={props.className}
          CountUpNumber={CountUpNumber}
          preChild={<AddIcon name="pixel_add" isMobile={isMiddleWidth} />}
          balanceStr={pointsBalanceStr}
        />
      ) : null}
      {!isMiddleWidth && (
        <BalanceItem
          logo={
            <CurrencyLogo
              className={"balance_item_img"}
              src={CurrencyLogoUrl[chainId || 97]}
            />
          }
          balanceStr={nativeBalanceStr}
          loading={loading}
          className={props.className}
        />
      )}
    </>
  );
}, isEqual);
export default Balance;
