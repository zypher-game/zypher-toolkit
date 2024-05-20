import React from "react";
import "./Language.stylus";
type IProps = {
    type: "top" | "pixel" | "list";
};
export declare const languageList: {
    label: string;
    keyValue: string;
    img: string;
}[];
declare const Language: React.MemoExoticComponent<({ type }: IProps) => React.JSX.Element>;
export default Language;
