import classnames from "classnames";
import React, { memo, useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";

import { useActiveWallet } from "../../../../hooks/useActiveWallet";
import { useActiveWeb3React } from "../../../../hooks/useActiveWeb3React";
import { useIsMobile } from "../../../../hooks/useWindowSize";

import { accountInfoDialogState } from "../../state/connectWalletState";
import DialogTitle from "../DialogComponents/DialogTitle";
import "./AccountInfoDialog.stylus";
import MUserInfo from "./components/MUserInfo";
import PcUserInfo from "./components/PcUserInfo";
import Modal from "../../../../components/Modal/Modal";
import { useDisconnect } from "wagmi";
import { useCustomTranslation } from "../../../../hooks/useCustomTranslation";
import { LngNs } from "../../../../utils/i18n";
import { HeaderUIType } from "ui/src/components/Header/header";

const AccountInfoDialog = memo(
  ({ copy, type }: { copy: any; type: HeaderUIType }) => {
    const { t } = useCustomTranslation([LngNs.common]);
    const [accountInfoDialogOpen, setAccountInfoDialogOpen] = useRecoilState(
      accountInfoDialogState
    );
    const { account, chainId } = useActiveWeb3React();
    const isMobile = useIsMobile();
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
                type={type}
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
export default AccountInfoDialog;
