import { atom } from "recoil";

import { localStorageEffect } from "../../utils/localStorageEffect";

export const siderCollapseState = atom<boolean | undefined>({
  key: "siderCollapseState",
  default: undefined,
  effects_UNSTABLE: [localStorageEffect("siderCollapseState")],
});
