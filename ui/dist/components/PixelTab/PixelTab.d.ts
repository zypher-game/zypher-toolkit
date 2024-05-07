import "./PixelTab.styl";
import React from "react";
declare const PixelTab: React.MemoExoticComponent<({ tabList, height, pixel_height, }: {
    tabList: {
        label: string;
        on: boolean;
        onClick: any;
    }[];
    height: string;
    pixel_height: number;
}) => React.JSX.Element>;
export default PixelTab;
