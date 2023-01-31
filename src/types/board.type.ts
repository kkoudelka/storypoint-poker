export interface BoardData {
  users: IUser[];
  votes: IVote[];
  created: Date;
  showResults: boolean;
}

export interface IUser {
  name: string;
}

export interface IVote {
  user: string;
  value: string;
}
