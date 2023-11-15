import { atom } from "recoil";

import { localStorageEffect } from "../../utils/localStorageEffect";

export const siderCollapseState = atom({
  key: "siderCollapseState",
  default: false,
  effects_UNSTABLE: [localStorageEffect("siderCollapseState")],
});

export const defaultSelectedKey = atom({
  key: "defaultSelectedKeys",
  default: "",
  effects_UNSTABLE: [localStorageEffect("defaultSelectedKeys")],
});
