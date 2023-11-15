import React, { createContext, useEffect } from "react";
import { atom, useRecoilState } from "recoil";

import useWindowSize from "../hooks/useWindowSize";
import { localStorageEffect } from "../utils/localStorageEffect";

export const isMobileState = atom({
  key: "isMobileState",
  default: false,
  effects_UNSTABLE: [localStorageEffect("isMobileState")],
});

const isWMdState = atom({
  key: "isWMdState",
  default: false,
  effects_UNSTABLE: [localStorageEffect("isWMdState")],
});

export const IsMobileContext = createContext<boolean | undefined>(undefined);
export const IsMdContext = createContext<boolean | undefined>(undefined);

export const IsMobileProvider: React.FC = ({ children }) => {
  const [isMobile, setIsMobile] = useRecoilState(isMobileState);
  const size = useWindowSize();
  useEffect(() => {
    const nowIsMobile = size.width < 768;
    if (isMobile !== nowIsMobile) {
      setIsMobile(nowIsMobile);
    }
  }, [size.width, isMobile]);

  return (
    <IsMobileContext.Provider value={isMobile}>
      {children}
    </IsMobileContext.Provider>
  );
};

export const IsMdProvider: React.FC = ({ children }) => {
  const [isWMd, setIsWMd] = useRecoilState(isWMdState);
  const size = useWindowSize();
  useEffect(() => {
    const nowIsMdMobile = size.width < 950;
    if (isWMd !== nowIsMdMobile) {
      setIsWMd(nowIsMdMobile);
    }
  }, [size.width, isWMd]);

  return <IsMdContext.Provider value={isWMd}>{children}</IsMdContext.Provider>;
};
