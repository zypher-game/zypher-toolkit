import React from "react";
interface ModalWithMotionProps {
    isOpen: boolean;
    onDismiss: () => void;
    overlayClassName?: string;
    contentClassName: string;
    children: React.ReactNode;
}
declare const ModalWithMotion: React.FC<ModalWithMotionProps>;
export default ModalWithMotion;
