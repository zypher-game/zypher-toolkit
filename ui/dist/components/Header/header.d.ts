import React from "react";
import "./header.stylus";
import { ChainId } from "../../constant/constant";
interface IProps {
    env: string;
    dispatch: any;
    setSuccessToast: any;
    setErrorToast: any;
    className?: string;
    hideMenu?: boolean;
    copy: any;
    CountUpNumber?: React.FC<any>;
    supportedChainList?: ChainId[];
    pathname: string;
    useLocation: any;
    useNavigate: any;
    Link: any;
}
declare const Header: (props: IProps) => React.ReactElement | null;
export default Header;
