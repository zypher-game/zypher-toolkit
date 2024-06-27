import React, { memo } from "react";
import { isEqual } from "../../../../utils/lodash";
import "./GetPointsSuccess.stylus";
import { pointsAnimState } from "../../state/connectWalletState";
import { useRecoilState } from "recoil";
import { preStaticUrl } from "../../../../constant/constant";
const GetPointsSuccess = memo(() => {
  const [show] = useRecoilState(pointsAnimState);

  if (show) {
    return (
      <div className="getpointpoints">
        {new Array(3).fill("").map((c, index) => (
          <PointsItem key={index} />
        ))}
      </div>
    );
  }
  return null;
}, isEqual);
const PointsItem = () => {
  return (
    <div className="getpointcoin">
      <div className="getpointcoin_front">
        <img
          decoding="async"
          loading="lazy"
          src={preStaticUrl + "/img/layout/Star.png"}
          alt="star"
        />
      </div>
      <div className="getpointcoin_middle"></div>

      <div className="getpointcoin_back">
        <img
          decoding="async"
          loading="lazy"
          src={preStaticUrl + "/img/layout/Star.png"}
          alt="star"
        />
      </div>
    </div>
  );
};
export default GetPointsSuccess;
