import React, { memo } from "react";
import { HeaderUIType } from "../header";
import "./IsPixelWidget.stylus";
import {
  IPixelProps,
  PixelBorderCardButton,
} from "../../PixelBtn/ActivePixelButton";
import { useIsW768 } from "../../../hooks/useWindowSize";
interface IProps extends IPixelProps {
  type?: HeaderUIType;
  children: React.ReactNode;
}
const IsPixelWidget = memo(
  ({
    className,
    type,
    children,
    onClick,
    backgroundColor,
    borderColor,
    pixel_height,
  }: IProps) => {
    const isW768 = useIsW768();
    return type === "pixel" ? (
      <PixelBorderCardButton
        className={`pixel_border ${className ?? ""}`}
        pixel_height={pixel_height ?? (isW768 ? 3 : 5)}
        backgroundColor={backgroundColor ?? "#1d263b"}
        borderColor={borderColor ?? "#3a4254"}
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
