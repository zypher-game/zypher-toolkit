import { useRecoilValue, useSetRecoilState } from "recoil";
import { globalState } from "./globalAtoms";

export const useGlobalVar = () => {
  return useRecoilValue(globalState);
};
export const useSetGlobalVar = () => {
  return useSetRecoilState(globalState);
};
