import * as Types from "types/socket";
import { socket } from "./index";
import * as Action from "./action";

export const initialState: Types.IReducer = {
  chats: [],
  users: {},
  rooms: {},
  joinedRoomID: null,
  joinedUser: null,
};

export function socketReducer(
  state: Types.IReducer,
  action: Action.ReducerAction
) {
  switch (action.type) {
    case Action.SET_USERS_ROOMS: {
      const { rooms, users } = action;
      const newRooms: Types.IRooms = {};
      const newUsers: Types.IUsers = {};
      rooms.forEach((room: Types.IRoom) => {
        if (state.rooms[room.roomID])
          newRooms[room.roomID] = state.rooms[room.roomID];
        if (!state.rooms[room.roomID]) newRooms[room.roomID] = room;
      });
      users.forEach((user: Types.IUser) => {
        if (state.users[user.userID])
          newUsers[user.userID] = state.users[user.userID];
        if (!state.users[user.userID]) newUsers[user.userID] = user;
      });
      return { ...state, users: newUsers, rooms: newRooms, joinedRoomID: null };
    }
    case Action.ENTER_ROOM: {
      const { roomID } = action;
      const newRooms = { ...state.rooms };
      newRooms[roomID] = { ...state.rooms[roomID], hasNewMessages: 0 };
      return { ...state, rooms: newRooms, joinedRoomID: roomID };
    }
    case Action.JOIN_ROOM: {
      const { roomID, userID, roomUsers, userName } = action;
      const targetRoom = { ...state.rooms[roomID] };
      const joinSelf = socket.userID === userID;
      targetRoom.isJoined = true;
      const newUsers = roomUsers.map((roomUser: Types.IUser) => {
        roomUser.self = false;
        if (roomUser.userID === socket.userID) roomUser.self = true;
        return roomUser;
      });

      targetRoom.users = newUsers;
      targetRoom.messages.push({
        content: `${userName}님이 입장하셨습니다.`,
      });
      const newRooms = { ...state.rooms, [roomID]: targetRoom };
      return {
        ...state,
        rooms: newRooms,
        joinedRoomID: joinSelf ? roomID : state.joinedRoomID,
      };
    }
    case Action.LEAVE_ROOM: {
      const { roomID, roomUsers, userID, userName, users, rooms } = action;
      if (socket.userID === userID) {
        const newRooms: Types.IRooms = {};
        const newUsers: Types.IUsers = {};
        rooms.forEach((room: Types.IRoom) => {
          if (state.rooms[room.roomID])
            newRooms[room.roomID] = state.rooms[room.roomID];
          if (!state.rooms[room.roomID]) newRooms[room.roomID] = room;
        });
        users.forEach((user: Types.IUser) => {
          if (state.users[user.userID])
            newUsers[user.userID] = state.users[user.userID];
          if (!state.users[user.userID]) newUsers[user.userID] = user;
        });
        return {
          ...state,
          rooms: newRooms,
          users: newUsers,
          joinedRoomID: null,
        };
      } else {
        const targetRoom = { ...state.rooms[roomID] };
        targetRoom.users = roomUsers;
        targetRoom.messages.push({
          content: `${userName}님이 퇴장하셨습니다.`,
        });
        const newRooms = { ...state.rooms, [roomID]: targetRoom };
        return { ...state, rooms: newRooms };
      }
    }
    case Action.ROOM_MESSAGE: {
      const { message, roomID } = action;
      const targetRoom = { ...state.rooms[roomID] };
      targetRoom.messages.push(message);
      if (!state.joinedRoomID) targetRoom.hasNewMessages++;
      const newRooms = { ...state.rooms, [roomID]: targetRoom };
      return { ...state, rooms: newRooms };
    }
    case Action.PRIVATE_MESSAGE: {
      const { message } = action;
      const fromSelf = message.from.userID === socket.userID ? true : false;
      const newRooms = { ...state.rooms };
      const newChats = [...state.chats];
      const newUsers = { ...state.users };
      const targetUser = newUsers[message.from?.userID];

      newChats.push({ ...message, fromSelf });

      if (state.joinedRoomID) {
        const targetRoom = { ...newRooms[state.joinedRoomID] };
        targetRoom.messages.push({ ...message, fromSelf });
        newRooms[state.joinedRoomID] = targetRoom;
      }

      if (!fromSelf && state.joinedUser?.userID !== targetUser.userID) {
        targetUser.messages.hasNewMessages++;
        targetUser.messages.recent = new Date();
      }
      return { ...state, rooms: newRooms, chats: newChats, users: newUsers };
    }
    case Action.PUBLIC_MESSAGE: {
      const { message } = action;
      const newChats = [...state.chats, { ...message }];
      return { ...state, chats: newChats };
    }
    case Action.TOGGLE_JOINED_USER: {
      const { userID } = action;
      const user = state.users[userID];
      const newJoineduser =
        state.joinedUser?.userID === userID ? null : { ...user };
      const newUsers = { ...state.users };
      newUsers[userID].messages.hasNewMessages = 0;
      return { ...state, users: newUsers, joinedUser: newJoineduser };
    }
    case Action.USER_CONNECTED: {
      const { user } = action;
      const newUsers = { ...state.users, [user.userID]: user };
      const newChats = [
        ...state.chats,
        { content: `${user.userName}님이 입장하셨습니다.` },
      ];
      return { ...state, users: newUsers, chats: newChats };
    }
    case Action.USER_DISCONNECTED: {
      const { userID, userName } = action;
      const newChats = [...state.chats];
      const newUsers: Types.IUsers = {};
      const userVals: any = Object.values(state.users);
      const isQuit = state.joinedUser?.userID === userID ? true : false;
      let newJoinedUser = state.joinedUser;
      let content = `${userName}님이 퇴장하셨습니다.`;
      if (isQuit) {
        content = `귓속말 대상인 ${userName}님이 퇴장하셨습니다.`;
        newJoinedUser = null;
      }
      newChats.push({ content });
      userVals.forEach((user: any) => {
        if (user.userID !== userID) newUsers[user.userID] = user;
      });

      return {
        ...state,
        chats: newChats,
        users: newUsers,
        joinedUser: newJoinedUser,
      };
    }
    case Action.CREATE_ROOM: {
      const { room } = action;
      const newJoinedRoomID =
        room.creater === socket.userID ? room.roomID : state.joinedRoomID;
      const isJoined = room.creater === socket.userID ? true : false;
      room.isJoined = isJoined;
      const newRooms = { ...state.rooms, [room.roomID]: room };
      return { ...state, rooms: newRooms, joinedRoomID: newJoinedRoomID };
    }
    case Action.DELETE_ROOM: {
      const { roomID } = action;
      const newRooms: Types.IRooms = {};
      const roomVals: Types.IRoom[] = Object.values(state.rooms);
      roomVals.forEach(room => {
        if (room.roomID === roomID) return;
        newRooms[room.roomID] = room;
      });
      return { ...state, rooms: newRooms };
    }
    default:
      return state;
  }
}
