import { useCallback, useContext, useEffect, useState } from "react";

import { IsMdContext, isMobileState } from "../provider/IsMobileProvider";
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
export const useIsMobile = (): boolean => {
  const [isMobile] = useRecoilState(isMobileState);
  if (isMobile === undefined) {
    return false;
  }
  return isMobile;
};

export const useIsMd = (): boolean => {
  try {
    const isMd = useContext(IsMdContext);
    if (isMd === undefined) {
      return false;
    }
    return isMd;
  } catch (e) {
    return false;
  }
};
