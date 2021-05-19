export interface IUserID {
  userName: string;
  userID: string;
}

export interface IUser {
  userName: string;
  userID: string;
  self: boolean;
  messages: {
    size: number;
    recent: Date;
  };
}
