import classnames from "classnames";
import { isEqual } from "../../../../../utils/lodash";
import React, { memo, useCallback, useMemo } from "react";

import CurrencyLogo from "../../../../CurrencyLogo";
import PlayerAvatar from "../../../../PlayerAvatar";
import { useIsW768 } from "../../../../../hooks/useWindowSize";
import { PointsIcon } from "../../../../icons/PointsIcon/PointsIcon";
import {
  BlockExplorerUrls,
  Currency,
  CurrencyLogo as CurrencyLogoUrl,
} from "../../../../../constant/constant";

import {
  useNativeBalanceStr,
  usePointsBalanceStr,
} from "../../../hooks/connectWalletHooks";
import ChainSelectorWidget from "../../ChainSelector/ChainSelectorWidget";
import "./MUserInfo.stylus";
import { IUserInfoProps } from "./PcUserInfo";
import { useCustomTranslation } from "../../../../../hooks/useCustomTranslation";
import { LngNs } from "../../../../../utils/i18n";
import { PixelBorderCard } from "../../../../../components/PixelBtn/ActivePixelButton";
import Icon from "../../../../../components/icons";
import { useDisconnect } from "wagmi";
import { accountInfoDialogState } from "../../../state/connectWalletState";
import { useRecoilState } from "recoil";

const MUserInfo = memo(
  ({ account, chainId, copy, cancel, type }: IUserInfoProps) => {
    const { disconnect } = useDisconnect();
    const [, setAccountInfoDialogOpen] = useRecoilState(accountInfoDialogState);
    const { t } = useCustomTranslation([LngNs.common]);
    const nativeBalanceStr = useNativeBalanceStr();
    const pointsBalanceStr = usePointsBalanceStr();
    const isMobile = useIsW768();
    const list = useMemo(() => {
      return [
        {
          balanceStr: pointsBalanceStr,
          logo: <PointsIcon isMobile={isMobile} />,
          symbol: "Gold Points",
        },
        {
          balanceStr: nativeBalanceStr,
          logo: (
            <CurrencyLogo
              className={"m_user_img"}
              src={CurrencyLogoUrl[chainId]}
            />
          ),
          symbol: Currency[chainId],
        },
      ];
    }, []);
    const openHandle = useCallback(() => {
      window.open(
        `${BlockExplorerUrls[chainId] ?? [0]}/address/${account}`,
        "_blank"
      );
    }, [account, chainId]);

    const cancelHandle = useCallback(() => {
      setAccountInfoDialogOpen(false);
      disconnect();
    }, [disconnect]);
    return (
      <div className={"m_user_m_content"}>
        <ChainSelectorWidget
          direction_type="userPop"
          type="pixel"
          className={classnames("m_user_chain")}
        />
        <PixelBorderCard
          pixel_height={3}
          backgroundColor="#343C4F"
          borderColor="#484F60"
          className="m_user_border"
        >
          <p className={"m_user_tit"}>{t("Your Wallet")}</p>
          <div className={"m_user_userInfoInner"}>
            <PlayerAvatar
              className={"m_user_account"}
              account={account}
              size={24}
              showAccount={true}
              chainId={chainId}
            />
            <span onClick={() => copy(account)}>
              <Icon name="copy" />
            </span>
            {/* <DisconnectBtn cancel={cancel} /> */}
          </div>
          <div className={"m_user_balance"}>
            {list.map((v) => (
              <div key={v.symbol} className={"m_user_item"}>
                <div className={"m_user_fl"}>
                  {v.logo}
                  <p>{v.symbol}</p>
                </div>
                <p>{v.balanceStr}</p>
              </div>
            ))}
          </div>
        </PixelBorderCard>
        <PixelBorderCard
          pixel_height={3}
          backgroundColor="#343C4F"
          borderColor="#484F60"
          className="m_user_border"
        >
          <div className={"m_user_fun"}>
            <FunItem
              iconName={"pixel_blockchain"}
              label={"Blockchain Explorer"}
              onClick={openHandle}
            />
            <FunItem
              iconName={"pixel_disconnect"}
              label={"Disconnect"}
              onClick={cancelHandle}
            />
          </div>
        </PixelBorderCard>
      </div>
    );
  },
  isEqual
);

const FunItem = memo(
  ({
    iconName,
    label,
    onClick,
  }: {
    iconName: string;
    label: string;
    onClick: any;
  }) => {
    return (
      <div className="m_user_info_FunItem" onClick={onClick}>
        <Icon name={iconName} />
        <p>{label}</p>
      </div>
    );
  }
);
export default MUserInfo;
