import React from "react";
import "./sidebar.stylus";
interface IProps {
    isMobile: boolean;
    useNavigate: any;
    className?: string;
}
export declare const ZypherLogo: React.MemoExoticComponent<({ isMobile }: {
    isMobile: boolean;
}) => React.JSX.Element>;
declare const SideBar: React.FC<IProps>;
export default SideBar;
