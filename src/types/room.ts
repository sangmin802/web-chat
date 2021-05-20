import { IUserID } from "./user";
import { IChat } from "types/chat";

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
