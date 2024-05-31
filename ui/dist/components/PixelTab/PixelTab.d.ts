import { IActivePixelColorCardTheme } from "../PixelBtn/ActivePixelButton";
import "./PixelTab.styl";
import React from "react";
declare const PixelTab: React.MemoExoticComponent<({ tabList, height, pixel_height, classNames, themeType, hidePixel, }: {
    tabList: {
        label?: string;
        logo?: string;
        on: boolean;
        onClick: any;
    }[];
    height: string;
    pixel_height: number;
    classNames: string;
    themeType?: IActivePixelColorCardTheme | undefined;
    hidePixel?: boolean | undefined;
}) => React.JSX.Element>;
export default PixelTab;
