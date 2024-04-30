import React, { memo } from "react";
import SvgComponent from "../SvgComponent/SvgComponent";
import { preStaticUrl } from "../../constant/constant";
import "./DialogClose.styl";
const DialogClose = memo(({ onClick }: { onClick: any }) => {
  return (
    <div className="dialog_close" onClick={onClick}>
      <SvgComponent src={preStaticUrl + "/img/icon/pixel_close.svg"} />
    </div>
  );
});
export default DialogClose;
