import * as Types from "types/socket";

// user
export const USER_CONNECTED = "USER_CONNECTED";
export const USER_DISCONNECTED = "USER_DISCONNECTED";
export const TOGGLE_JOINED_USER = "TOGGLE_JOINED_USER";

// room
export const LEAVE_ROOM = "LEAVE_ROOM";
export const JOIN_ROOM = "JOIN_ROOM";
export const CREATE_ROOM = "CREATE_ROOM";
export const DELETE_ROOM = "DELETE_ROOM";
export const ENTER_ROOM = "ENTER_ROOM";

// user+room
export const SET_USERS_ROOMS = "SET_USERS_ROOMS";

// message
export const PRIVATE_MESSAGE = "PRIVATE_MESSAGE";
export const PUBLIC_MESSAGE = "PUBLIC_MESSAGE";
export const ROOM_MESSAGE = "ROOM_MESSAGE";

export type ReducerAction =
  | { type: typeof USER_CONNECTED; user: Types.IUser }
  | { type: typeof USER_DISCONNECTED; userID: string; userName: string }
  | { type: typeof TOGGLE_JOINED_USER; userID: string }
  | {
      type: typeof LEAVE_ROOM;
      roomID: string;
      roomUsers: Types.IUser[];
      userID: string;
      userName: string;
      users: Types.IUser[];
      rooms: Types.IRoom[];
    }
  | {
      type: typeof JOIN_ROOM;
      roomID: string;
      userID: string;
      roomUsers: Types.IUser[];
      userName: string;
    }
  | { type: typeof CREATE_ROOM; room: Types.IRoom }
  | { type: typeof DELETE_ROOM; roomID: string }
  | { type: typeof ENTER_ROOM; roomID: string }
  | { type: typeof SET_USERS_ROOMS; rooms: Types.IRoom[]; users: Types.IUser[] }
  | { type: typeof PRIVATE_MESSAGE; message: Required<Types.IChat> }
  | { type: typeof PUBLIC_MESSAGE; message: Types.IChat }
  | { type: typeof ROOM_MESSAGE; message: Types.IChat; roomID: string };
