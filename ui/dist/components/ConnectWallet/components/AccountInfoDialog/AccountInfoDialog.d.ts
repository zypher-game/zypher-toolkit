import React from "react";
import "./AccountInfoDialog.stylus";
import { HeaderUIType } from "ui/src/components/Header/header";
declare const AccountInfoDialog: React.MemoExoticComponent<({ copy, type }: {
    copy: any;
    type: HeaderUIType;
}) => React.JSX.Element | null>;
export default AccountInfoDialog;
