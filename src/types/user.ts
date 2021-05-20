export interface IUserID {
  userName: string;
  userID: string;
}

export interface IUser {
  userName: string;
  userID: string;
  self: boolean;
  messages: {
    hasNewMessages: number;
    recent: Date;
  };
}
