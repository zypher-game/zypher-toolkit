import React, { memo } from "react";
import "./LoadingButton.styl";
import SvgComponent from "../SvgComponent/SvgComponent";
import { preStaticUrl } from "../../constant/constant";
const LoadingButton = memo(
  ({ className, isLoading }: { className?: string; isLoading?: boolean }) => {
    if (isLoading) {
      return (
        <SvgComponent
          className={`${className ?? ""} animation_rotate LoadingButton`}
          src={preStaticUrl + "/img/icon/pixel_loading.svg"}
        />
      );
    }
    return <></>;
  }
);
export default LoadingButton;
