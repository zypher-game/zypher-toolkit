import React from "react";
import "./header.stylus";
import { ChainId } from "ui/src/constant/constant";
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
    CountupNumber?: React.FC<any>;
    supportedChainList?: ChainId[];
}
declare const Header: (props: IProps) => React.ReactElement | null;
export default Header;
