import { atom } from "recoil";

import { localStorageEffect } from "../../utils/localStorageEffect";

export const siderCollapseState = atom({
  key: "siderCollapseState",
  default: false,
  effects_UNSTABLE: [localStorageEffect("siderCollapseState")],
});
