import { useCallback, useContext, useEffect, useState } from "react";

import {
  IsW1100Context,
  IsW1220Context,
  IsW950Context,
  isW768State,
} from "../provider/IsMobileProvider";
import { useRecoilState } from "recoil";

export default function useWindowSize(): { height: number; width: number } {
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  });

  const onResize = useCallback(() => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return size;
}
export const useIsW768 = (): boolean => {
  const [isW768] = useRecoilState(isW768State);
  if (isW768 === undefined) {
    return false;
  }
  return isW768;
};

export const useIsW1100 = (): boolean => {
  try {
    const IsW1100 = useContext(IsW1100Context);
    if (IsW1100 === undefined) {
      return false;
    }
    return IsW1100;
  } catch (e) {
    return false;
  }
};

export const useIsW1220 = (): boolean => {
  try {
    const isW1220 = useContext(IsW1220Context);
    if (isW1220 === undefined) {
      return false;
    }
    return isW1220;
  } catch (e) {
    return false;
  }
};
export const useIsMd = (): boolean => {
  try {
    const isMd = useContext(IsW950Context);
    if (isMd === undefined) {
      return false;
    }
    return isMd;
  } catch (e) {
    return false;
  }
};
