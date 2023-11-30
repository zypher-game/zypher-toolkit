import React from "react";
type IProps = {
    className: string;
    className_top?: string;
    className_item: string;
    className_itemtip: string;
    className_on: string;
    type: "side" | "top";
};
export declare const languageList: {
    label: string;
    keyValue: string;
    img: string;
}[];
declare const Language: React.MemoExoticComponent<({ className_top, className, className_item, className_itemtip, className_on, type, }: IProps) => React.JSX.Element>;
export default Language;
