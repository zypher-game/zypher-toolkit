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

const isWMd1100State = atom({
  key: "isWMd1100State",
  default: false,
  effects_UNSTABLE: [localStorageEffect("isWMd1100State")],
});
const isWMd1220State = atom({
  key: "isWMd1220State",
  default: false,
  effects_UNSTABLE: [localStorageEffect("isWMd1220State")],
});
export const IsMobileContext = createContext<boolean | undefined>(undefined);
export const IsMdContext = createContext<boolean | undefined>(undefined);
export const IsMd1100Context = createContext<boolean | undefined>(undefined);
export const IsMd1220Context = createContext<boolean | undefined>(undefined);

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

export const IsMd1100Provider: React.FC = ({ children }) => {
  const [isWMd1100, setIsWMd1100] = useRecoilState(isWMd1100State);
  const size = useWindowSize();
  useEffect(() => {
    const nowIsMd1100Mobile = size.width < 1100;
    if (isWMd1100 !== nowIsMd1100Mobile) {
      setIsWMd1100(nowIsMd1100Mobile);
    }
  }, [size.width, isWMd1100]);

  return (
    <IsMd1100Context.Provider value={isWMd1100}>
      {children}
    </IsMd1100Context.Provider>
  );
};

export const IsMd1220Provider: React.FC = ({ children }) => {
  const [isWMd1220, setIsWMd1220] = useRecoilState(isWMd1220State);
  const size = useWindowSize();
  useEffect(() => {
    const nowIsMd1220Mobile = size.width < 1220;
    if (isWMd1220 !== nowIsMd1220Mobile) {
      setIsWMd1220(nowIsMd1220Mobile);
    }
  }, [size.width, isWMd1220]);

  return (
    <IsMd1220Context.Provider value={isWMd1220}>
      {children}
    </IsMd1220Context.Provider>
  );
};
