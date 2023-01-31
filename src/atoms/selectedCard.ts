import { atom } from "recoil";

export const selectedCardState = atom<string | null>({
  key: "selectedCardState",
  default: null,
});
