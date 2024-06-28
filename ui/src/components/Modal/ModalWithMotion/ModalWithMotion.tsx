import React from "react";
import { DialogContent, DialogOverlay } from "@reach/dialog";
import { dialogVariants } from "../../../constant/motionConstant";
import { motion } from "framer-motion";
interface ModalWithMotionProps {
  isOpen: boolean;
  onDismiss: () => void;
  overlayClassName?: string;
  contentClassName: string;
  children: React.ReactNode;
}

const ModalWithMotion: React.FC<ModalWithMotionProps> = ({
  isOpen,
  onDismiss,
  overlayClassName,
  children,
  contentClassName,
}) => {
  return (
    <DialogOverlay
      className={overlayClassName}
      isOpen={isOpen}
      onDismiss={onDismiss}
    >
      <motion.div
        variants={dialogVariants}
        initial="hidden"
        animate={isOpen ? "visible" : "hidden"}
        exit="hidden"
      >
        <DialogContent className={contentClassName}>{children}</DialogContent>
      </motion.div>
    </DialogOverlay>
  );
};

export default ModalWithMotion;
