import { atom } from "recoil";

export const goBackAtom = atom<string | null>({
  key: "goBack",
  default: null,
});
