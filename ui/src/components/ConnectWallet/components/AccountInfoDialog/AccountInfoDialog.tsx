import classnames from "classnames";
import React, { memo, useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  Currency,
  CurrencyLogo as CurrencyLogoUrl,
} from "../../../../constant/constant";
import CurrencyLogo from "../../../../components/CurrencyLogo";

import { useActiveWallet } from "../../../../hooks/useActiveWallet";
import { useActiveWeb3React } from "../../../../hooks/useActiveWeb3React";
import { useIsW1100 } from "../../../../hooks/useWindowSize";

import { accountInfoDialogState } from "../../state/connectWalletState";
import DialogTitle from "../DialogComponents/DialogTitle";
import "./AccountInfoDialog.stylus";
import MUserInfo from "./components/MUserInfo";
import PcUserInfo from "./components/PcUserInfo";
import Modal from "../../../../components/Modal/Modal";
import { useDisconnect } from "wagmi";
import { useCustomTranslation } from "../../../../hooks/useCustomTranslation";
import { LngNs } from "../../../../utils/i18n";
import { HeaderUIType } from "../../../../components/Header/header";
import Icon from "../../../icons";
import { BlockExplorerUrls } from "../../../../constant/constant";
import {
  PixelBorderCard,
  PixelCube2,
} from "../../../../components/PixelBtn/ActivePixelButton";
import PlayerAvatar from "../../../../components/PlayerAvatar";
import { getShortenAddress } from "../../../../utils/tool";
import ChainSelectorWidget from "../ChainSelector/ChainSelectorWidget";
import { useNativeBalanceStr } from "../../hooks/connectWalletHooks";
import Language from "../../../../components/SideBar/component/Language";

const AccountInfoDialog = memo(
  ({ copy, type }: { copy: any; type: HeaderUIType }) => {
    const { t } = useCustomTranslation([LngNs.common]);
    const [accountInfoDialogOpen, setAccountInfoDialogOpen] = useRecoilState(
      accountInfoDialogState
    );
    const { account, chainId } = useActiveWeb3React();
    const isMobile = useIsW1100();
    const { disconnect } = useDisconnect();
    const wallet = useActiveWallet();
    const cancel = useCallback(() => {
      setAccountInfoDialogOpen(false);
      disconnect();
    }, [disconnect]);
    useEffect(() => {
      if (accountInfoDialogOpen && isMobile) {
        setAccountInfoDialogOpen(false);
      }
    }, [isMobile]);
    return account && chainId ? (
      <>
        <Modal
          open={accountInfoDialogOpen}
          onCancel={() => setAccountInfoDialogOpen(false)}
          footer={null}
          wrapClassName={classnames(
            "customDialog",
            "bottom",
            "account_info_dialog_dialog"
          )}
          destroyOnClose={true}
          closable={false}
          width={isMobile ? "100%" : 440}
          centered={isMobile ? false : true}
          transitionName={isMobile ? "ant-slide-down" : undefined}
        >
          <DialogTitle
            label={t("Your Wallet")}
            setDialogOpen={setAccountInfoDialogOpen}
            classNames={isMobile ? "modalTitleInner" : ""}
          />
          <div className={"account_info_dialog_modalMain"}>
            {isMobile ? (
              <MUserInfo
                copy={copy}
                account={account}
                chainId={chainId}
                cancel={cancel}
                type="other"
              />
            ) : (
              <PcUserInfo
                copy={copy}
                account={account}
                chainId={chainId}
                cancel={cancel}
                connectName={wallet?.name}
                connectIcon={wallet?.iconUrl}
                type={type}
              />
            )}
          </div>
        </Modal>
      </>
    ) : null;
  }
);

export const AddressBigWrapPop = memo(
  ({ copy }: { copy: any; type: HeaderUIType }) => {
    const [index, setIndex] = useState<number>();
    const { account, chainId } = useActiveWeb3React();
    const { disconnect } = useDisconnect();
    const [, setAccountInfoDialogOpen] = useRecoilState(accountInfoDialogState);
    useEffect(() => {
      if (index || index === 0) {
        setTimeout(() => {
          setIndex(undefined);
        }, 2000);
      }
    }, [index]);
    const copyAddressHandle = useCallback(() => {
      copy(account);
      setIndex(0);
    }, [account]);

    const openHandle = useCallback(() => {
      window.open(
        `${BlockExplorerUrls[chainId] ?? [0]}/address/${account}`,
        "_blank"
      );
      setIndex(1);
    }, [account, chainId]);

    const cancelHandle = useCallback(() => {
      setAccountInfoDialogOpen(false);
      disconnect();
      setIndex(2);
    }, [disconnect]);
    return (
      <PixelBorderCard
        className="address_wrap_big_pop"
        pixel_height={4}
        backgroundColor="#1D263B"
        borderColor="#3A4254"
      >
        <AddressWrapPopItem
          iconName={"pixel_copy"}
          label={"Copy address"}
          onClick={copyAddressHandle}
          on={index === 0}
        />
        <AddressWrapPopItem
          iconName={"pixel_blockchain"}
          label={"Blockchain Explorer"}
          onClick={openHandle}
          on={index === 1}
        />
        <AddressWrapPopItem
          iconName={"pixel_disconnect"}
          label={"Disconnect"}
          onClick={cancelHandle}
          on={index === 2}
        />
      </PixelBorderCard>
    );
  }
);

export const AddressMiddleWrapPop = memo(
  ({ copy }: { copy: any; type: HeaderUIType }) => {
    const [index, setIndex] = useState<number>();
    const { account, chainId } = useActiveWeb3React();

    const nativeBalanceStr = useNativeBalanceStr();
    const { disconnect } = useDisconnect();
    const [, setAccountInfoDialogOpen] = useRecoilState(accountInfoDialogState);
    useEffect(() => {
      if (index || index === 0) {
        setTimeout(() => {
          setIndex(undefined);
        }, 2000);
      }
    }, [index]);
    const copyAddressHandle = useCallback(() => {
      copy(account);
      setIndex(0);
    }, [account]);

    const openHandle = useCallback(() => {
      window.open(
        `${BlockExplorerUrls[chainId] ?? [0]}/address/${account}`,
        "_blank"
      );
      setIndex(1);
    }, [account, chainId]);

    const cancelHandle = useCallback(() => {
      setAccountInfoDialogOpen(false);
      disconnect();
      setIndex(2);
    }, [disconnect]);
    return (
      <PixelBorderCard
        className="address_wrap_middle_pop"
        pixel_height={4}
        backgroundColor="#1D263B"
        borderColor="#3A4254"
      >
        <div className="middle_account">
          <PlayerAvatar
            chainId={chainId}
            border={true}
            className="account"
            account={account}
            size={62}
            showAccount={false}
            type="other"
          />
          <div className="middle_address" onClick={copyAddressHandle}>
            <p>{getShortenAddress(account)}</p>
            <Icon name="pixel_copy" />
          </div>
        </div>
        <ChainSelectorWidget
          type={"pixel"}
          direction_type="userPop"
          className="middle_selector"
        />
        <div className="middle_balance">
          <BalanceItem
            currency={Currency[chainId]}
            balanceStr={nativeBalanceStr}
            logo={
              <CurrencyLogo
                className={"balance_item_img"}
                src={CurrencyLogoUrl[chainId]}
              />
            }
          />
        </div>
        <Language type={"list"} />
        <AddressWrapPopItem
          iconName={"pixel_blockchain"}
          label={"Blockchain Explorer"}
          onClick={openHandle}
          on={index === 1}
        />
        <AddressWrapPopItem
          iconName={"pixel_disconnect"}
          label={"Disconnect"}
          onClick={cancelHandle}
          on={index === 2}
        />
      </PixelBorderCard>
    );
  }
);
const AddressWrapPopItem = memo(
  ({
    iconName,
    label,
    onClick,
    on,
  }: {
    iconName: string;
    label: string;
    onClick: any;
    on: boolean;
  }) => {
    return (
      <PixelCube2
        className={`address_wrap_pop_item ${on ? "on" : ""}`}
        onClick={onClick}
        pixel_height={3}
        backgroundColor="#1D263B"
        borderColor="#1D263B"
        width="100%"
        height="36px"
      >
        <Icon name={iconName} />
        <p>{label}</p>
      </PixelCube2>
    );
  }
);
const BalanceItem = memo(
  ({
    logo,
    balanceStr,
    currency,
  }: {
    logo: React.ReactNode;
    balanceStr: string;
    currency: string;
  }) => {
    return (
      <div className="middle_balance_item">
        <div className="fl">
          {logo}
          <p>{currency}</p>
        </div>
        <p className="frText">{balanceStr}</p>
      </div>
    );
  }
);
export default AccountInfoDialog;
