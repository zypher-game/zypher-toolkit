import React from "react";
import { DialogContent, Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import classnames from "classnames";
import styled from "styled-components";

interface ModalProps {
  open: boolean;
  onCancel: () => void;
  footer?: React.ReactNode;
  wrapClassName?: string;
  destroyOnClose?: boolean;
  closable?: boolean;
  width?: string | number;
  centered?: boolean;
  transitionName?: string;
  children: React.ReactNode;
}
const DialogOverlayModal = styled(Dialog)`
  padding: 0;
  background: #131313;
  border-radius: 20px;
`;
const Modal: React.FC<ModalProps> = ({
  open,
  onCancel,
  footer,
  wrapClassName,
  destroyOnClose,
  closable,
  width,
  centered,
  transitionName,
  children,
}) => {
  return (
    <DialogOverlayModal
      isOpen={open}
      onDismiss={onCancel}
      className={classnames("customDialog", "bottom", wrapClassName)}
      // destroyOnClose={destroyOnClose}
      aria-label="Modal"
    >
      <DialogContent style={{ width: width }}>{children}</DialogContent>
    </DialogOverlayModal>
  );
};

export default Modal;
