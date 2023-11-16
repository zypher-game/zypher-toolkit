import { WarningOutlined } from "@ant-design/icons";
import classnames from "classnames";
import { isEqual } from "../../../../utils/lodash";
import React, { memo, useCallback, useEffect, useMemo } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import { useIsMobile } from "../../../../hooks/useWindowSize";

import {
  linkToBetaDialogChainIdState,
  linkToBetaDialogState,
} from "../../state/connectWalletState";
import DialogTitle from "../DialogComponents/DialogTitle";
import { getChainNameText } from "./localPathUrl";
import { ChainName } from "../../../../constant/constant";
import Modal from "../../../../components/Modal/Modal";
import { useCustomTranslation } from "../../../../hooks/useCustomTranslation";
import { LngNs } from "../../../../utils/i18n";

const Content = styled.div`
  text-align: center;
  padding: 50px;
`;
const DialogButton = styled.div`
  border-radius: 12px;
  background: #6673ff;
  height: 48px;
  border: 0px;

  color: #fff;
  text-align: center;
  font-family: Poppins;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Text = styled.div`
  color: #fff;
  text-align: center;
  font-family: Poppins;
  font-size: 14px;
  padding-top: 30px;
`;

const LinkToBetaDialog = memo(() => {
  const [linkToBetaDialogOpen, setLinkToBetaDialogOpen] = useRecoilState(
    linkToBetaDialogState
  );
  const [linkToBetaDialogChainId, setLinkToBetaDialogChainId] = useRecoilState(
    linkToBetaDialogChainIdState
  );
  const isMobile = useIsMobile();
  const ToUrlName = useMemo(() => {
    if (linkToBetaDialogChainId) {
      return getChainNameText(linkToBetaDialogChainId);
    }
    return "";
  }, [linkToBetaDialogChainId]);
  const handleButtonClick = useCallback(() => {
    window.open(`https://${ToUrlName[0]}.zypher.game/`, "_blank");
  }, [ToUrlName]);
  useEffect(() => {
    if (!linkToBetaDialogOpen) {
      setLinkToBetaDialogChainId(undefined);
    }
  }, [linkToBetaDialogOpen]);
  const { t } = useCustomTranslation([LngNs.common]);
  return (
    <Modal
      open={linkToBetaDialogOpen}
      onCancel={() => setLinkToBetaDialogOpen(false)}
      footer={null}
      wrapClassName={classnames("customDialog")}
      destroyOnClose={true}
      closable={false}
      width={isMobile ? "100%" : 360}
      centered={isMobile ? false : true}
    >
      <DialogTitle
        label={t("Switch Networks")}
        setDialogOpen={setLinkToBetaDialogOpen}
        classNames={isMobile ? "modalTitleInner" : ""}
      />
      <Content>
        <WarningOutlined style={{ color: "#6673FF", fontSize: "50px" }} />
        <Text>
          {t("linkToBeta", {
            chainName: linkToBetaDialogChainId
              ? ChainName[linkToBetaDialogChainId]
              : "",
            toUrlName: ToUrlName[1],
          })}
        </Text>
      </Content>
      <div style={{ padding: "0 20px 30px" }}>
        <DialogButton onClick={handleButtonClick}>
          {t("GotoVersion", {
            toUrlName: ToUrlName[0],
          })}
        </DialogButton>
      </div>
    </Modal>
  );
}, isEqual);
export default LinkToBetaDialog;
