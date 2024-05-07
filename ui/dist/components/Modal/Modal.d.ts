import React from "react";
import "@reach/dialog/styles.css";
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
declare const Modal: React.FC<ModalProps>;
export default Modal;
