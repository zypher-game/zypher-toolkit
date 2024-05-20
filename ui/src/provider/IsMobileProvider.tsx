import React, { createContext, useEffect } from "react";
import { atom, useRecoilState } from "recoil";

import useWindowSize from "../hooks/useWindowSize";
import { localStorageEffect } from "../utils/localStorageEffect";

export const isW768State = atom({
  key: "isW768State",
  default: false,
  effects_UNSTABLE: [localStorageEffect("isW768State")],
});

const isWMdState = atom({
  key: "isWMdState",
  default: false,
  effects_UNSTABLE: [localStorageEffect("isWMdState")],
});

const isW1100State = atom({
  key: "isW1100State",
  default: false,
  effects_UNSTABLE: [localStorageEffect("isW1100State")],
});
const isW1220State = atom({
  key: "isW1220State",
  default: false,
  effects_UNSTABLE: [localStorageEffect("isW1220State")],
});
export const IsW768Context = createContext<boolean | undefined>(undefined);
export const IsW950Context = createContext<boolean | undefined>(undefined);
export const IsW1100Context = createContext<boolean | undefined>(undefined);
export const IsW1220Context = createContext<boolean | undefined>(undefined);

export const IsW768Provider: React.FC = ({ children }) => {
  const [isMobile, setIsMobile] = useRecoilState(isW768State);
  const size = useWindowSize();
  useEffect(() => {
    const nowIsMobile = size.width < 768;
    if (isMobile !== nowIsMobile) {
      setIsMobile(nowIsMobile);
    }
  }, [size.width, isMobile]);

  return (
    <IsW768Context.Provider value={isMobile}>{children}</IsW768Context.Provider>
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

  return (
    <IsW950Context.Provider value={isWMd}>{children}</IsW950Context.Provider>
  );
};

export const IsW1100Provider: React.FC = ({ children }) => {
  const [isW1100, setIsW1100] = useRecoilState(isW1100State);
  const size = useWindowSize();
  useEffect(() => {
    const nowIsW1100Mobile = size.width < 1100;
    if (isW1100 !== nowIsW1100Mobile) {
      setIsW1100(nowIsW1100Mobile);
    }
  }, [size.width, isW1100]);

  return (
    <IsW1100Context.Provider value={isW1100}>
      {children}
    </IsW1100Context.Provider>
  );
};

export const IsW1220Provider: React.FC = ({ children }) => {
  const [isW1220, setIsW1220] = useRecoilState(isW1220State);
  const size = useWindowSize();
  useEffect(() => {
    const nowIsW1220Mobile = size.width < 1220;
    if (isW1220 !== nowIsW1220Mobile) {
      setIsW1220(nowIsW1220Mobile);
    }
  }, [size.width, isW1220]);

  return (
    <IsW1220Context.Provider value={isW1220}>
      {children}
    </IsW1220Context.Provider>
  );
};
