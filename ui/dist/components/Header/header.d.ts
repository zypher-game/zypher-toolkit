import React from "react";
import "./header.module.stylus";
interface IProps {
    env: string;
    dispatch: any;
    setSuccessToast: any;
    setErrorToast: any;
    className?: string;
    hideMenu?: boolean;
    copy: any;
}
declare const Header: (props: IProps) => React.ReactElement | null;
export default Header;
