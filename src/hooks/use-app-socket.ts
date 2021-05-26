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
      const newUsers: IUsers = {};
      users.forEach(user => {
        user.self = false;
        if (user.userID === socket.userID) user.self = true;
        newUsers[user.userID] = user;
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
  const onJoinRoom = useCallback(
    ({ users, userID, userName, roomID }) => {
      roomsDebounce.debounceAct(() => {
        const targetRoom = { ...roomsDebounce.newState[roomID] };
        const joinSelf = socket.userID === userID;
        targetRoom.isJoined = true;
        targetRoom.users = users;
        targetRoom.messages.push({
          content: `${userName}님이 입장하셨습니다.`,
        });
        const newRooms = { ...roomsDebounce.newState, [roomID]: targetRoom };
        roomsDebounce.newState = newRooms;
        if (joinSelf) setRoom(roomID);
      });
    },
    [setRoom, roomsDebounce]
  );

  const onLeaveRoom = useCallback(
    ({ users, userName, roomID }) => {
      roomsDebounce.debounceAct(() => {
        const targetRoom = { ...roomsDebounce.newState[roomID] };
        if (!targetRoom) return;
        targetRoom.users = users;
        targetRoom.messages.push({
          content: `${userName}님이 퇴장하셨습니다.`,
        });
        const newRooms = { ...roomsDebounce.newState, [roomID]: targetRoom };
        roomsDebounce.newState = newRooms;
      });
    },
    [roomsDebounce]
  );

  const onRoomMessage = useCallback(
    ({ message, roomID }) => {
      roomsDebounce.debounceAct(() => {
        const targetRoom = { ...roomsDebounce.newState[roomID] };
        targetRoom.messages.push(message);
        if (!room) targetRoom.hasNewMessages++;
        const newRooms = { ...roomsDebounce.newState, [roomID]: targetRoom };
        roomsDebounce.newState = newRooms;
      });
    },
    [roomsDebounce, room]
  );

  // 룸 상태에 대한 감지는 지속적으로
  useEffect(() => {
    socket.on("join room", ({ users, userID, userName, roomID }) => {
      onJoinRoom({ users, userID, userName, roomID });
    });

    socket.on("leave room", ({ users, userName, roomID }) => {
      onLeaveRoom({ users, userName, roomID });
    });

    socket.on("room message", ({ message, roomID }) => {
      onRoomMessage({ message, roomID });
    });

    return () => {
      socket.off("join room");
      socket.off("leave room");
      socket.off("room message");
    };
  }, [onJoinRoom, onLeaveRoom, onRoomMessage]);

  // 귓속말은 상시 감지
  useEffect(() => {
    socket.on("private message", message => {
      const fromSelf = message.from.userID === socket.userID ? true : false;
      setChat({ ...message, fromSelf });
      if (room) {
        const newRooms = { ...rooms };
        newRooms[room].messages.push({ ...message, fromSelf });
        setRooms(newRooms);
      }
      if (fromSelf) return;
      const newUsers: IUsers = {};
      const userVals = Object.values(users);
      userVals.forEach(user => {
        if (user.userID === message.from.userID) {
          const messages = {
            hasNewMessages: user.messages.hasNewMessages + 1,
            recent: new Date(),
          };
          user.messages = messages;
        }
        newUsers[user.userID] = user;
      });

      setUsers(newUsers);
    });

    return () => {
      socket.off("private message");
    };
  }, [setChat, setUsers, users, setRooms, rooms, room]);

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
