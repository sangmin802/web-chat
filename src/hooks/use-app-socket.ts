import { useEffect, useCallback } from "react";
import { socket } from "socket/index";
import { IUser, IUsers } from "types/user";
import { IChat } from "types/chat";
import { IRooms, IRoom } from "types/room";
import { Debounce } from "util/debounce";

interface Props {
  users: IUsers;
  setUsers(T: IUsers): void;
  rooms: IRooms;
  setRooms(T: IRooms): void;
  room: null | string;
  setRoom(T: null | string): void;
  setChat(T: IChat | IChat[]): void;
  roomsDebounce: Debounce;
}

export function useAppSocket({
  users,
  setUsers,
  rooms,
  setRooms,
  room,
  setRoom,
  setChat,
  roomsDebounce,
}: Props) {
  // 방을 나갈 때, 클라이언트에 저장되어있는 방 정보를 초기화하고 새롭게 받아오도록 처리
  const leaveRoom = useCallback(
    roomID => {
      setRoom(null);
      const newRooms: IRooms = {};
      const roomVals = Object.values(rooms);
      roomVals.forEach(room => {
        if (room.roomID !== roomID) newRooms[room.roomID] = room;
      });
      setRooms(newRooms);
      socket.emit("leave room", roomID);
    },
    [setRoom, setRooms, rooms]
  );

  const goLoby = useCallback(() => {
    socket.emit("go loby");
  }, []);

  const sendRoomMessage = useCallback(({ content, roomID }) => {
    socket.emit("room message", { content, roomID });
  }, []);

  const sendPrivateMessage = useCallback(content => {
    socket.emit("private message", content);
  }, []);

  // 초기 유저리스트, 방리스트 수령, 로비로 이동시 새롭게 추가or제거된 유저나 방 수령
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

    socket.on("go loby", ({ newUsers, newRooms }) => {
      const combinedRooms: IRooms = {};
      newRooms.forEach((room: IRoom) => {
        if (rooms[room.roomID]) combinedRooms[room.roomID] = rooms[room.roomID];
        // 새로운 방 생성
        if (!rooms[room.roomID]) combinedRooms[room.roomID] = room;

        // 서버에서 받아온 방이 기존 rooms에 없다면 제거
      });

      const combinedUsers: IUsers = {};
      newUsers.forEach((user: IUser) => {
        if (users[user.userID]) combinedUsers[user.userID] = users[user.userID];
        if (!users[user.userID]) combinedUsers[user.userID] = user;
      });

      setRooms(combinedRooms);
      setUsers(combinedUsers);
    });

    return () => {
      socket.off("users");
      socket.off("rooms");
      socket.off("go loby");
    };
  }, [setRooms, setUsers, rooms, users]);

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
    sendPrivateMessage,
    leaveRoom,
    goLoby,
  };
}
