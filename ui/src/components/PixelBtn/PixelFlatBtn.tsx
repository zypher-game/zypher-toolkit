import React, { memo } from "react";

import "./PixelFlatBtn.stylus";
import { HTMLMotionProps, motion } from "framer-motion";
interface IProps extends HTMLMotionProps<"div"> {
  className?: string;
  children?: React.ReactNode;
  onClick?: any;
  style?: any;
  hidePixel?: boolean;
}

const PixelFlatBtn = memo((props: IProps) => {
  const { onClick, children, className, style, hidePixel, ..._props } = props;
  if (hidePixel) {
    return (
      <div className={className} onClick={onClick}>
        {children}
      </div>
    );
  }
  if (onClick) {
    return (
      <motion.div
        {..._props}
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
      </motion.div>
    );
  }
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
