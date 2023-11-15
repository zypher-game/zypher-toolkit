import { preStaticUrl } from "../../../constant/constant";
import { isEqual } from "../../../utils/lodash";
import { FC, memo } from "react";
import styled from "styled-components";
const PointsImg = styled.img<{ isMobile: boolean }>`
  display: inline-block;
  width: ${({ isMobile }) => (isMobile ? "20px" : "30px")};
  margin-left: ${({ isMobile }) => (isMobile ? "4px" : "10px")};
`;
type IPointsIconProps = {
  isMobile: boolean;
  classname?: string;
};
export const PointsIcon: FC<IPointsIconProps> = memo(
  ({ isMobile, classname }: IPointsIconProps) => {
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
