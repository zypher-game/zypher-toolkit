import React from "react";
import "./header.stylus";
interface IProps {
    env: string;
    dispatch: any;
    setSuccessToast: any;
    setErrorToast: any;
    className?: string;
    hideMenu?: boolean;
    copy: any;
    useNavigate: any;
    useLocation: any;
    showLang: boolean;
}
declare const Header: (props: IProps) => React.ReactElement | null;
export default Header;
