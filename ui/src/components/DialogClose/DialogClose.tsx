import React, { memo } from "react";
import SvgComponent from "../SvgComponent/SvgComponent";
import { preStaticUrl } from "../../constant/constant";
import "./DialogClose.styl";
const DialogClose = memo(({ onClick, ...props }: any) => {
  return (
    <div className="dialog_close" onClick={onClick} {...props}>
      <SvgComponent src={preStaticUrl + "/img/icon/pixel_close.svg"} />
    </div>
  );
});
export default DialogClose;
