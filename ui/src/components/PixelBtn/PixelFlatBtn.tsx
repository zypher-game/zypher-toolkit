import React, { memo } from "react";

import "./PixelFlatBtn.stylus";
interface IProps {
  className?: string;
  children?: React.ReactNode;
  onClick?: any;
  style?: any;
}
const PixelFlatBtn = memo((props: IProps) => {
  const { onClick, children, className, style } = props;
  return (
    <div
      className={`pixel_flat_btn ${className ?? ""}`}
      onClick={onClick}
      style={style}
    >
      <div className="pixel_flat_btn_bg">
        <div className="pixel_flat_btn_top_1" />
        <div className="pixel_flat_btn_top_2" />
        <div className="pixel_flat_btn_inner" />
        <div className="pixel_flat_btn_bottom_1" />
        <div className="pixel_flat_btn_bottom_2" />
      </div>
      <div className="pixel_flat_inner">{children}</div>
    </div>
  );
});
export default PixelFlatBtn;
