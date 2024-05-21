import { atom } from "recoil";

import { localStorageEffect } from "../../utils/localStorageEffect";

export const sideCollapseState = atom<boolean | undefined>({
  key: "sideCollapseState",
  default: false,
  effects_UNSTABLE: [localStorageEffect("sideCollapseState")],
});
