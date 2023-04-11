export interface BoardData {
  boardTitle: string;
  users: IUser[];
  votes: IVote[];
  created: Date;
  updated: Date;
  showResults: boolean;
  logs: ILog[];
  admin: string;
  ticket?: string | null;
}

export interface IUser {
  name: string;
  uuid: string;
}

export interface IVote {
  userId: string;
  value: string;
}

export interface ILog {
  userId: string;
  user: string;
  action: "reset" | "showResults";
  timestamp: Date;
}
