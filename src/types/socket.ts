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

export interface IUsers {
  [key: string]: IUser;
}

export interface IChat {
  content: string;
  fromSelf?: boolean;
  from?: IUser;
  to?: IUser;
}

export interface IRoom {
  creater: string;
  isJoined: boolean;
  roomID: string;
  roomName: string;
  users: IUserID[];
  messages: IChat[];
  hasNewMessages: number;
}

export interface IRooms {
  [key: string]: IRoom;
}

export interface IReducer {
  chats: IChat[];
  users: IUsers;
  rooms: IRooms;
  joinedRoomID: string | null;
  joinedUser: IUser | null;
}
