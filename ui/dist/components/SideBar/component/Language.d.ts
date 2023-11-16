import React from "react";
type IProps = {
    className: string;
    className_item: string;
    className_itemtip: string;
    className_on: string;
};
export declare const languageList: {
    label: string;
    keyValue: string;
}[];
declare const Language: React.MemoExoticComponent<({ className, className_item, className_itemtip, className_on }: IProps) => React.JSX.Element>;
export default Language;
