import { atom } from "recoil";

import { localStorageEffect } from "../../utils/localStorageEffect";

export const pathnameState = atom<string[]>({
  key: "pathnameState",
  default: [""],
});
export const sideCollapseState = atom<boolean | undefined>({
  key: "sideCollapseState",
  default: undefined,
  effects_UNSTABLE: [localStorageEffect("sideCollapseState")],
});
