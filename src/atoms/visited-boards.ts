import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { type BoardData } from "../types/board.type";

const { persistAtom } = recoilPersist({ key: "visited-boards" });

type LocalVisitedBoardsData = Pick<BoardData, "boardTitle"> & {
  id: string;
  visitedOn: Date;
};

export const visitedBoardsAtom = atom<LocalVisitedBoardsData[]>({
  key: "visited-boards",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
