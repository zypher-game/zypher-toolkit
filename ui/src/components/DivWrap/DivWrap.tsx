import React, { memo } from "react";
import { isEqual } from "../../utils/lodash";

const DivWrap = memo(
  ({
    className,
    showDiv,
    children,
  }: {
    className?: string;
    showDiv: boolean;
    children: React.ReactNode;
  }) => {
    return showDiv ? (
      <div className={className}> {children}</div>
    ) : (
      <>{children}</>
    );
  },
  isEqual
);
export default DivWrap;
