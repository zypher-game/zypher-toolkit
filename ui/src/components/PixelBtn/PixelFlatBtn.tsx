import React, { memo, useCallback, useRef, useState } from "react";

import "./PixelFlatBtn.stylus";
import { HTMLMotionProps, motion } from "framer-motion";
interface IProps extends HTMLMotionProps<"div"> {
  className?: string;
  children?: React.ReactNode;
  onClick?: any;
  style?: any;
  hidePixel?: boolean;
  disable?: boolean;
}

const PixelFlatBtn = memo((props: IProps) => {
  const lastClickTimeRef = useRef(Date.now());
  const { onClick, children, className, style, hidePixel, disable, ..._props } =
    props;
  const [isActive, setIsActive] = useState(false);
  const clickHandle = useCallback(() => {
    const currentTime = Date.now();
    const timeSinceLastClick = currentTime - lastClickTimeRef.current;
    if (timeSinceLastClick < 1000) {
      // 1000毫秒等于2秒
      // 如果距离上次点击不到1秒，则忽略此次点击
      return;
    }

    lastClickTimeRef.current = currentTime;
    if (onClick) {
      setIsActive(true);
      setTimeout(() => {
        setIsActive(false);
      }, 1000);
      onClick();
    }
  }, [onClick]);
  if (hidePixel) {
    return (
      <div
        className={`${className ?? ""} ${disable ? "disable" : "normal"} ${
          isActive ? "click" : ""
        }`}
        onClick={clickHandle}
      >
        {children}
      </div>
    );
  }
  if (onClick) {
    return (
      <motion.div
        {..._props}
        className={`pixel_flat_btn ${className ?? ""}`}
        onClick={clickHandle}
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
