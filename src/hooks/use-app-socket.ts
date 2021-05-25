import { useEffect, useCallback } from "react";
import { socket } from "socket/index";
import { IUser } from "types/user";
import { IRooms, IRoom } from "types/room";

interface Props {
  users: null | IUser[];
  setUsers(T: IUser[]): void;
  rooms: IRooms;
  setRooms(T: IRooms): void;
  room: null | string;
  setRoom(T: null | string): void;
}

export function useAppSocket({
  users,
  setUsers,
  rooms,
  setRooms,
  room,
  setRoom,
}: Props) {
  const leaveRoom = useCallback(roomID => {
    socket.emit("leave room", roomID);
  }, []);

  const sendRoomMessage = useCallback((message, roomID) => {
    socket.emit("room message", { message, roomID });
  }, []);

  // 초기 유저리스트, 방리스트 수령
  useEffect(() => {
    socket.on("users", (users: IUser[]) => {
      const newUsers = users.map(user => {
        user.self = false;
        if (user.userID === socket.userID) user.self = true;
        return user;
      });
      setUsers(newUsers);
    });

    socket.on("rooms", (rooms: IRoom[]) => {
      const newRooms: IRooms = {};
      rooms.forEach(room => (newRooms[room.roomID] = room));
      setRooms(newRooms);
    });

    return () => {
      socket.off("users");
      socket.off("rooms");
    };
  }, [setRooms, setUsers]);

  // 룸 상태에 대한 감지는 지속적으로
  useEffect(() => {
    socket.on("join room", ({ users, userID, roomID }) => {
      const targetRoom = { ...rooms[roomID] };
      const joinSelf = socket.userID === userID;
      if (joinSelf) {
        targetRoom.isJoined = true;
        targetRoom.messages = [];
      }
      targetRoom.users = users;
      const newRooms = { ...rooms, [roomID]: targetRoom };
      setRooms(newRooms);
      if (joinSelf) setRoom(roomID);
    });

    socket.on("leave room", ({ users, userID, roomID }) => {
      const targetRoom = { ...rooms[roomID] };
      const leaveSelf = socket.userID === userID;
      if (leaveSelf) {
        targetRoom.isJoined = false;
        targetRoom.messages = [];
      }
      targetRoom.users = users;
      const newRooms = { ...rooms, [roomID]: targetRoom };
      setRooms(newRooms);
      if (leaveSelf) setRoom(null);
    });

    socket.on("room message", ({ message, roomID }) => {
      const targetRoom = { ...rooms[roomID] };
      targetRoom.messages.push(message);
      if (!room) targetRoom.hasNewMessages++;
      const newRooms = { ...rooms, [roomID]: targetRoom };
      setRooms(newRooms);
    });
    return () => {
      socket.off("join room");
      socket.off("leave room");
      socket.off("room message");
    };
  }, [setRooms, setRoom, rooms, setUsers, users, room]);

  // userID 할당 및 소킷 종료
  useEffect(() => {
    socket.on("session", userID => {
      socket.userID = userID;
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return {
    sendRoomMessage,
    leaveRoom,
  };
}
