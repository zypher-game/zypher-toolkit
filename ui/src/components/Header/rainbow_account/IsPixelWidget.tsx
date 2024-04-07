import React, { memo } from "react";
import { HeaderUIType } from "../header";
import PixelFlatBtn from "../../PixelBtn/PixelFlatBtn";
import "./IsPixelWidget.stylus";
const IsPixelWidget = memo(
  ({
    className,
    type,
    children,
    onClick,
  }: {
    className?: string;
    type: HeaderUIType;
    children: React.ReactNode;
    onClick?: any;
  }) => {
    return type === "pixel" ? (
      <PixelFlatBtn className={`pixel_border ${className}`} onClick={onClick}>
        {children}
      </PixelFlatBtn>
    ) : (
      <div className={className} onClick={onClick}>
        {" "}
        {children}
      </div>
    );
  }
);
export default IsPixelWidget;
