import React from "react";
interface IProps {
    className: string;
    logo_url_name: string;
    logo_title: string;
}
declare const SideBarTitle: React.MemoExoticComponent<({ className, logo_url_name, logo_title }: IProps) => React.JSX.Element>;
export default SideBarTitle;
