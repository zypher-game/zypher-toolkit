import { useIsW768 } from "../../hooks/useWindowSize";
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
      <PixelBorderCard
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
      </PixelBorderCard>
    );
  }
);

export const IsTablePixelWidget = memo(
  ({
    width,
    height,
    className,
    backgroundColor,
    header_children,
    body_children,
    pixel_height,
  }: {
    width: string;
    height: string;
    className: string;
    backgroundColor: string;
    header_children: React.ReactNode;
    body_children: React.ReactNode;
    pixel_height: number;
  }) => {
    const isW768 = useIsW768();
    return isW768 ? (
      <div className={className}>
        {header_children}
        {body_children}
      </div>
    ) : (
      <PixelTable
        width={width}
        height={height}
        className={className}
        backgroundColor={backgroundColor}
        header_children={header_children}
        body_children={body_children}
        pixel_height={pixel_height}
      />
    );
  }
);
