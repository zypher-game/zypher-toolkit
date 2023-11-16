import React, { FC } from "react";
import "./DialogTitle.module.stylus";
type IProps = {
    classNames?: string;
    label: string;
    children?: React.ReactNode;
    setDialogOpen: (value: React.SetStateAction<boolean>) => void;
};
declare const DialogTitle: FC<IProps>;
export default DialogTitle;
