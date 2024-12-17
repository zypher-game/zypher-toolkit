import React, { memo } from "react";

const Detail = memo(
  () => {
    return (
      <>
        <li>
          <p>Exchange rate</p>
          <div className="S_fr">
            <p>1 ETH = 2,000,000 GP</p>
          </div>
        </li>
      </>
    );
  },
  () => {
    return false;
  }
);
export default Detail;
