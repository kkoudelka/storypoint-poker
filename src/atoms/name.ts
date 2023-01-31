import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const userNameAtom = atom<string | null>({
  key: "userName",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
