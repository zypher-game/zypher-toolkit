import {
  ActivePixelCard,
  IPixelProps,
  PixelBorderCard,
} from "../PixelBtn/ActivePixelButton";
import "./PixelTable.styl";

import React, { memo } from "react";

interface IProps extends IPixelProps {
  header_children: React.ReactNode;
  body_children: React.ReactNode;
  classNameHeader?: string;
  headerBackgroundColor?: string;
}
export const PixelTableBorder = memo(
  ({
    header_children,
    body_children,
    pixel_height,
    classNameHeader,
    backgroundColor,
    headerBackgroundColor,
    borderColor,
    width,
  }: IProps) => {
    return (
      <PixelBorderCard
        className="tvlPixelTable"
        pixel_height={pixel_height}
        backgroundColor={`${backgroundColor ?? "#0d1120"}`}
        borderColor={`${borderColor ?? "#3A4254"}`}
        width={width}
      >
        <ActivePixelCard
          className={`tvlPixelTable_header ${classNameHeader ?? ""}`}
          pixel_height={pixel_height}
          backgroundColor={`${headerBackgroundColor ?? "#293457"}`}
        >
          {header_children}
        </ActivePixelCard>
        {body_children}
      </PixelBorderCard>
    );
  }
);
export const PixelTable = memo(
  ({
    header_children,
    body_children,
    pixel_height,
    className,
    classNameHeader,
    backgroundColor,
    headerBackgroundColor,
    borderColor,
    width,
  }: IProps) => {
    return (
      <ActivePixelCard
        className={`tvlPixelTable ${className ?? ""}`}
        pixel_height={pixel_height}
        backgroundColor={`${backgroundColor ?? "#0d1120"}`}
        borderColor={`${borderColor ?? "#3A4254"}`}
        width={width}
      >
        <ActivePixelCard
          className={`tvlPixelTable_header ${classNameHeader ?? ""}`}
          pixel_height={pixel_height}
          backgroundColor={`${headerBackgroundColor ?? "#293457"}`}
        >
          {header_children}
        </ActivePixelCard>
        {body_children}
      </ActivePixelCard>
    );
  }
);
