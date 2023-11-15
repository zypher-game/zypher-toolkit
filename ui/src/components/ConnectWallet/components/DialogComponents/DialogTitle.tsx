import classnames from "classnames";
import React, { FC, memo, useCallback } from "react";

import Icon from "../../../icons";

import "./DialogTitle.module.stylus";

type IProps = {
  classNames?: string;
  label: string;
  children?: React.ReactNode;
  setDialogOpen: (value: React.SetStateAction<boolean>) => void;
};
const DialogTitle: FC<IProps> = memo(
  ({ label, setDialogOpen, children, classNames }: IProps) => {
    const closeHandle = useCallback(() => {
      setDialogOpen(false);
    }, [setDialogOpen]);
    return (
      <div className={classnames("dialog_title_modalTitleInner", classNames)}>
        <p className={"dialog_title_title"}>{label}</p>
        {children ? children : null}
        <span onClick={closeHandle}>
          <Icon name="close" />
        </span>
      </div>
    );
  }
);
export default DialogTitle;
