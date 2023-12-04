import { atom } from "recoil";

import { localStorageEffect } from "../../utils/localStorageEffect";

export const defaultSelectedKey = atom({
  key: "defaultSelectedKeys",
  default: "",
  effects_UNSTABLE: [localStorageEffect("defaultSelectedKeys")],
});
