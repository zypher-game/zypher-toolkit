import classnames from "classnames";
import { isEqual } from "../../../../../utils/lodash";
import React, { memo, useMemo } from "react";

import CurrencyLogo from "../../../../CurrencyLogo";
import PlayerAvatar from "../../../../PlayerAvatar";
import { useIsMobile } from "../../../../../hooks/useWindowSize";
import { PointsIcon } from "../../../../icons/PointsIcon/PointsIcon";
import {
  Currency,
  CurrencyLogo as CurrencyLogoUrl,
} from "../../../../../constant/constant";

import {
  useNativeBalanceStr,
  usePointsBalanceStr,
} from "../../../hooks/connectWalletHooks";
import ChainSelectorWidget from "../../ChainSelector/ChainSelectorWidget";
import "./MUserInfo.stylus";
import { DisconnectBtn, IUserInfoProps } from "./PcUserInfo";
import { useCustomTranslation } from "../../../../../hooks/useCustomTranslation";
import { LngNs } from "../../../../../utils/i18n";

const MUserInfo = memo(({ account, chainId, cancel, type }: IUserInfoProps) => {
  const { t } = useCustomTranslation([LngNs.common]);
  const nativeBalanceStr = useNativeBalanceStr();
  const pointsBalanceStr = usePointsBalanceStr();
  const isMobile = useIsMobile();
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
  return (
    <div className={"m_user_m_content"}>
      <ChainSelectorWidget
        type={type}
        className={classnames("m_user_border", "m_user_chain")}
      />
      <div className={"m_user_border"}>
        <p className={"m_user_tit"}>{t("Your Wallet")}</p>
        <div className={"m_user_userInfoInner"}>
          <PlayerAvatar
            className={"m_user_account"}
            account={account}
            size={24}
            showAccount={true}
          />
          <DisconnectBtn cancel={cancel} />
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
      </div>
    </div>
  );
}, isEqual);
export default MUserInfo;
