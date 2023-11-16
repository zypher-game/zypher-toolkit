import React from "react";
import { DialogContent, DialogOverlay } from "@reach/dialog";
import "@reach/dialog/styles.css";
import classnames from "classnames";
import "./Modal.stylus";
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
    <DialogOverlay
      isOpen={open}
      onDismiss={onCancel}
      className={classnames("customDialog", "bottom", wrapClassName)}
      // destroyOnClose={destroyOnClose}
      aria-label="Modal"
    >
      <DialogContent style={{ width: width }}>{children}</DialogContent>
    </DialogOverlay>
  );
};

export default Modal;
