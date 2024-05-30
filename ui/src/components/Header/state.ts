import { atom } from "recoil";

export const pathnameState = atom<string[]>({
  key: "pathnameState",
  default: [""],
});
export const sideCollapseState = atom<boolean | undefined>({
  key: "sideCollapseState",
  default: true,
});
