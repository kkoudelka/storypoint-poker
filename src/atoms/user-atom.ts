import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { type IUser } from "../types/board.type";

const { persistAtom } = recoilPersist({ key: "user-storypoints" });

export const userAtom = atom<Partial<IUser> | null>({
  key: "user-poker",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
