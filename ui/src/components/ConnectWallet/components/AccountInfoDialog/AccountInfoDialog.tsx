import classnames from "classnames";
import React, { memo, useCallback } from "react";
import { useRecoilState } from "recoil";

import { useActiveWallet } from "../../../../hooks/useActiveWallet";
import { useActiveWeb3React } from "../../../../hooks/useActiveWeb3React";
import { useIsMobile } from "../../../../hooks/useWindowSize";

import { accountInfoDialogState } from "../../state/connectWalletState";
import DialogTitle from "../DialogComponents/DialogTitle";
import "./AccountInfoDialog.module.stylus";
import MUserInfo from "./components/MUserInfo";
import PcUserInfo from "./components/PcUserInfo";
import Modal from "../../../../components/Modal/Modal";

const AccountInfoDialog = memo(
  ({ copy, useDisconnect }: { copy: any; useDisconnect: any }) => {
    const [accountInfoDialogOpen, setAccountInfoDialogOpen] = useRecoilState(
      accountInfoDialogState
    );
    const { account, chainId } = useActiveWeb3React();
    const isMobile = useIsMobile();
    const { disconnect } = useDisconnect();
    const wallet = useActiveWallet();
    const cancel = useCallback(() => {
      disconnect();
      setAccountInfoDialogOpen(false);
    }, [disconnect]);
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
            label="Your Wallet"
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
              />
            ) : (
              <PcUserInfo
                copy={copy}
                account={account}
                chainId={chainId}
                cancel={cancel}
                connectName={wallet?.name}
                connectIcon={wallet?.iconUrl}
              />
            )}
          </div>
        </Modal>
      </>
    ) : null;
  }
);
export default AccountInfoDialog;
