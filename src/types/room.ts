import { IUserID } from "./user";

export interface IRoom {
  roomID: string;
  roomName: string;
  isJoin: boolean;
  users: Map<string, IUserID>;
}
