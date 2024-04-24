import classnames from "classnames";
import React, { memo, useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { useActiveWallet } from "../../../../hooks/useActiveWallet";
import { useActiveWeb3React } from "../../../../hooks/useActiveWeb3React";
import { useIsMd1100 } from "../../../../hooks/useWindowSize";

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
  PixelBorderCardSize2,
} from "../../../../components/PixelBtn/ActivePixelButton";

const AccountInfoDialog = memo(
  ({ copy, type }: { copy: any; type: HeaderUIType }) => {
    const { t } = useCustomTranslation([LngNs.common]);
    const [accountInfoDialogOpen, setAccountInfoDialogOpen] = useRecoilState(
      accountInfoDialogState
    );
    const { account, chainId } = useActiveWeb3React();
    const isMobile = useIsMd1100();
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

export const AddressWrapPop = memo(
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
        className="address_wrap_pop"
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
          iconName={"pixel_blackchain"}
          label={"Blackchain Explorer"}
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
      <PixelBorderCardSize2
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
      </PixelBorderCardSize2>
    );
  }
);
export default AccountInfoDialog;
