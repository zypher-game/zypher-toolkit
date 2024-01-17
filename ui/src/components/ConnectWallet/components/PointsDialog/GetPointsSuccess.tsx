import React, { memo, useEffect } from "react";
import { isEqual } from "../../../../utils/lodash";
import "./GetPointsSuccess.stylus";
import { pointsAnimState } from "../../state/connectWalletState";
import { useRecoilState } from "recoil";
import { preStaticUrl } from "../../../../constant/constant";
const GetPointsSuccess = memo(() => {
  const [show, setShow] = useRecoilState(pointsAnimState);
  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setShow(false);
      }, 3500);
    }
  }, [show]);
  return show ? (
    <div className="getpointpoints">
      {new Array(3).fill("").map((c, index) => (
        <PointsItem key={index} />
      ))}
    </div>
  ) : null;
}, isEqual);
const PointsItem = memo(() => {
  return (
    <div className="getpointcoin">
      <div className="getpointcoin_front">
        <img src={preStaticUrl + "/img/layout/star.png"} alt="star" />
      </div>
      <div className="getpointcoin_middle"></div>

      <div className="getpointcoin_back">
        <img src={preStaticUrl + "/img/layout/star.png"} alt="star" />
      </div>
    </div>
  );
}, isEqual);
export default GetPointsSuccess;
