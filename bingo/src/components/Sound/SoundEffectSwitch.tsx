import { useRecoilState } from "@ui/src";
import { preStaticUrl } from "@ui/src";
import { isEqual } from "lodash";
import React, { memo, useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import { SoundOn } from "@/pages/state/state";

const Switch = styled.div`
  cursor: pointer;
`;

const SoundEffectSwitch = memo(() => {
  const [isSoundOn, setIsSoundOn] = useRecoilState(SoundOn);
  const toggleMusic = useCallback(() => {
    if (isSoundOn === 1) {
      setIsSoundOn(0);
    } else {
      setIsSoundOn(1);
    }
  }, [isSoundOn]);
  return (
    <Switch onClick={toggleMusic}>
      {isSoundOn ? (
        <img src={preStaticUrl + `/audio/close.svg`} alt="" />
      ) : (
        <img src={preStaticUrl + `/audio/open.svg`} alt="" />
      )}
    </Switch>
  );
}, isEqual);

export default SoundEffectSwitch;
