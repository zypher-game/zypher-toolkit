import React from "react";
import "./Language.stylus";
type IProps = {
    type: "side" | "top";
};
export declare const languageList: {
    label: string;
    keyValue: string;
    img: string;
}[];
declare const Language: React.MemoExoticComponent<({ type }: IProps) => React.JSX.Element>;
export default Language;
