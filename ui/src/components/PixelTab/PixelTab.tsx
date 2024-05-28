import {
  ActivePixelButton,
  ActivePixelButtonColor,
} from "../PixelBtn/ActivePixelButton";
import SvgComponent from "../SvgComponent/SvgComponent";
import "./PixelTab.styl";

import React, { memo } from "react";

const PixelTab = memo(
  ({
    tabList,
    height,
    pixel_height,
    classNames,
    hidePixel,
  }: {
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
  }) => {
    console.log({ hidePixel });
    return (
      <ul className={classNames}>
        {tabList.map((v, index) => (
          <PixelTabLiItem
            hidePixel={hidePixel}
            onClick={v.onClick}
            key={v.label}
            on={v.on}
            label={v.label}
            logo={v.logo}
            height={height}
            pixel_height={pixel_height}
          />
        ))}
      </ul>
    );
  }
);
const PixelTabLiItem = memo(
  ({
    onClick,
    on,
    label,
    height,
    pixel_height,
    hidePixel,
    logo,
  }: {
    onClick: any;
    on: boolean;
    label: string;
    height: string;
    pixel_height: number;
    hidePixel: boolean;
    logo?: string;
  }) => {
    if (on) {
      return (
        <li>
          <ActivePixelButtonColor
            hidePixel={hidePixel}
            themeType="brightBlue"
            height={height}
            pixel_height={pixel_height}
            className="active_tvl_tab_on"
          >
            {logo ? <SvgComponent src={logo} /> : null}
            <p>{label}</p>
          </ActivePixelButtonColor>
        </li>
      );
    }
    return (
      <li>
        <ActivePixelButton
          hidePixel={hidePixel}
          height={height}
          pixel_height={pixel_height}
          backgroundColor="#1D263B"
          className="active_tvl_tab"
          onClick={onClick}
        >
          {logo ? <SvgComponent src={logo} /> : null}
          <p>{label}</p>
        </ActivePixelButton>
      </li>
    );
  }
);
export default PixelTab;
