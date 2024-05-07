import "./PixelTabBorder.styl";
import React from "react";
declare const PixelTabBorder: React.MemoExoticComponent<({ className, tabList, height, pixel_height, }: {
    className: string;
    tabList: {
        label: string;
        on: boolean;
        onClick: any;
    }[];
    height: string;
    pixel_height: number;
}) => React.JSX.Element>;
export default PixelTabBorder;
