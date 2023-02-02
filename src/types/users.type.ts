import { type IUser } from "./board.type";

export interface IUserBoardData {
  user: IUser;
  boardIds: string[];
}
