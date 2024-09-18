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
import { erc20ABI, useWalletClient } from "wagmi";
import MulticallContract from "../../../../contract/multicall";

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
  const { data: walletClient } = useWalletClient();
  const fetchErc20Balance = useCallback(async (): Promise<void> => {
    console.log({ chainId, account, provider, walletClient });
    if (!chainId || !account || !provider || !walletClient) {
      return;
    }
    try {
      const pointsAddress = zkBingo(chainId, IContractName.ZypherGameToken); // CurrencyContract[chainId].pointsAddress
      console.log({ pointsAddress });
      if (!pointsAddress) {
        setPointsBalance(0);
      } else {
        try {
          const staticStr = [
            {
              name: "balance",
              methodName: "balanceOf",
              params: [account],
            },
          ];
          const params = staticStr.map((v) => ({
            reference: v.name,
            contractAddress: pointsAddress,
            abi: erc20ABI,
            calls: [
              {
                methodName: v?.methodName ?? v.name,
                reference: v.name,
                methodParameters: v.params ?? [],
              },
            ],
          }));
          const multicall = await MulticallContract(chainId);
          console.log({ multicall });
          if (multicall) {
            const { results } = await multicall.call(params);
            setPointsBalance(
              new BigNumberJs(
                results["balance"]["callsReturnContext"][0][
                  "returnValues"
                ][0].hex
              )
                .dividedBy(divisorBigNumber)
                .toNumber()
            );
          } else {
            throw new Error("No multicall address");
          }
          return undefined;
        } catch (e: any) {
          console.error("fetchAccountMonsterNft: ", e);
          return undefined;
        }

        // console.log(1111);
        // const pointsContract = erc20Contract(
        //   chainId,
        //   env,
        //   pointsAddress,
        //   walletClient
        // );
        // console.log(3333);
        // const balance = await pointsContract.read.balanceOf([account]);
        // console.log(4444);
        // console.log({ balance, pointsAddress, account });
        // setPointsBalance(
        //   new BigNumberJs(balance.toString())
        //     .dividedBy(divisorBigNumber)
        //     .toNumber()
        // );
      }
    } catch (e) {
      setPointsBalance(0);
    }
  }, [chainId, account, provider, walletClient]);
  const fetchBalanceOf = useCallback(async (): Promise<void> => {
    console.log({ chainId, account, walletClient });
    if (!chainId || !account || !walletClient) {
      return;
    }
    setLoading(true);
    const balance = await provider.getBalance({ address: account });
    setNativeBalance(
      new BigNumberJs(balance.toString()).dividedBy(divisorBigNumber).toNumber()
    );
    await fetchErc20Balance();
    setLoading(false);
  }, [chainId, account, provider, walletClient, fetchErc20Balance]);
  useEffect(() => {
    if (account && chainId && walletClient) {
      fetchBalanceOf();
    }
  }, [account, chainId, refreshBalance, walletClient]);

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
