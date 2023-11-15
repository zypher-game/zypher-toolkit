import React, { useState } from "react";

import Icon from "../icons";

export interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

const Logo: React.FC<LogoProps> = ({ src, alt, ...rest }) => {
  const [bad, setBad] = useState(false);

  if (src && !bad) {
    return (
      <img
        {...rest}
        alt={alt}
        src={src}
        onError={() => {
          setBad(true);
        }}
      />
    );
  }

  return (
    <div {...rest}>
      <Icon name="help" />
    </div>
  );
};

export default Logo;
