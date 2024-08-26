import { selector } from "recoil";
import { globalState, IGlobalVar } from "./globalAtoms";

export const globalSelector = selector<IGlobalVar>({
  key: "globalSelector",
  get: ({ get }) => get(globalState),
  set: ({ set }, newValue) => {
    set(globalState, newValue);
  },
});
