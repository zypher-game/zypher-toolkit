import React from "react";
import { preStaticUrl } from "../../../constant/constant";
import { isEqual } from "../../../utils/lodash";
import { FC, memo } from "react";
import styled from "styled-components";
const PointsImg = styled.img<{ isMobile: boolean; mr: boolean }>`
  display: inline-block;
  width: ${({ isMobile }) => (isMobile ? "20px" : "30px")};
  margin-left: ${({ mr, isMobile }) => (mr ? "0" : isMobile ? "4px" : "10px")};
  margin-right: ${({ mr, isMobile }) =>
    mr ? (isMobile ? "4px" : "10px") : "0"};
`;
type IPointsIconProps = {
  isMobile: boolean;
  classname?: string;
  mr?: boolean;
};
export const PointsIcon: FC<IPointsIconProps> = memo(
  ({ isMobile, classname, mr }: IPointsIconProps) => {
    return (
      <PointsImg
        isMobile={isMobile}
        src={preStaticUrl + `/img/home/data_points.svg`}
        alt=""
        className={classname}
      />
    );
  },
  isEqual
);
