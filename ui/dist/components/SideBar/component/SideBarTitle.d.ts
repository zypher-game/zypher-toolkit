import React from "react";
interface IProps {
    link?: string;
    className: string;
    logo_title: string;
    logo_url_name?: string;
}
export declare const SideBarTitle: React.MemoExoticComponent<({ className, logo_url_name, logo_title }: IProps) => React.JSX.Element>;
export declare const SideBarTitleLink: React.MemoExoticComponent<({ logo_url_name, link, className, logo_title }: IProps) => React.JSX.Element>;
export {};
