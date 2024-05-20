import React, { memo } from "react";
import { HeaderUIType } from "../header";
import "./IsPixelWidget.stylus";
import { PixelBorderCardButton } from "../../PixelBtn/ActivePixelButton";
import { useIsW768 } from "../../../hooks/useWindowSize";
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
    const isW768 = useIsW768();
    return type === "pixel" ? (
      <PixelBorderCardButton
        className={`pixel_border ${className ?? ""}`}
        pixel_height={isW768 ? 3 : 5}
        backgroundColor="#1d263b"
        borderColor="#3a4254"
        onClick={onClick}
      >
        {children}
      </PixelBorderCardButton>
    ) : (
      <div className={className} onClick={onClick}>
        {" "}
        {children}
      </div>
    );
  }
);
export default IsPixelWidget;
