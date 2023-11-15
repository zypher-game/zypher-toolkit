import React from "react";
import classnames from "classnames";
import { preStaticUrl } from "../../constant/constant";

// Import other SVG files

type IProps = {
  name: string;
  className?: string;
};

const Icon = (props: IProps): JSX.Element => {
  return (
    <img
      className={classnames("icon", props.className)}
      src={preStaticUrl + `/img/icon/${props.name}.svg`}
      alt=""
    />
  );
};

export default Icon;
