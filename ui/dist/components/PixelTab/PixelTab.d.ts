import "./PixelTab.styl";
import React from "react";
declare const PixelTab: React.MemoExoticComponent<({ tabList, height, pixel_height, classNames, hidePixel, }: {
    tabList: {
        label: string;
        logo?: string;
        on: boolean;
        onClick: any;
    }[];
    height: string;
    pixel_height: number;
    classNames: string;
    hidePixel: boolean;
}) => React.JSX.Element>;
export default PixelTab;
