import { useEffect, useCallback, useMemo } from "react";
import { socket } from "socket/index";
import { IUser } from "types/user";
import { IChat } from "types/chat";
import { IRoom, IRooms } from "types/room";
import { debounce } from "util/debounce";

interface Props {
  setLogin(T: boolean): void;
  users: null | IUser[];
  setUsers(T: IUser[]): void;
  setChat(T: IChat): void;
  selectedUser: null | IUser;
  setSelectedUser(T: null | IUser): void;
  rooms: IRooms;
  setRooms(T: IRooms): void;
  room: null | string;
  setRoom(T: null | string): void;
}

export function useSocket({
  setLogin,
  users,
  setUsers,
  setChat,
  selectedUser,
  setSelectedUser,
  rooms,
  setRooms,
  room,
  setRoom,
}: Props) {
  const connectSocekt = useCallback(
    userName => {
      setLogin(true);
      socket.auth = { userName };
      socket.connect();
    },
    [setLogin]
  );

  const sendPublicMessage = useCallback(message => {
    socket.emit("public message", message);
  }, []);

  const sendPrivateMessage = useCallback(message => {
    socket.emit("private message", message);
  }, []);

  const createRoom = useCallback(() => {
    socket.emit("create room");
  }, []);

  const joinRoom = useCallback(roomID => {
    socket.emit("join room", roomID);
  }, []);

  const leaveRoom = useCallback(roomID => {
    socket.emit("leave room", roomID);
  }, []);

  const sendRoomMessage = useCallback((message, roomID) => {
    socket.emit("room message", { message, roomID });
  }, []);

  // loby
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

    socket.on("user connected", user => {
      const newUsers = [...(users as IUser[]), user];
      setUsers(newUsers);
      setChat({ content: `${user.userName}님이 입장하셨습니다.` });
    });

    socket.on("user disconnected", ({ userID, userName }) => {
      const isQuit = selectedUser?.userID === userID ? true : false;
      let content = `${userName}님이 퇴장하셨습니다.`;
      if (isQuit) {
        content = `귓속말 대상인 ${userName}님이 퇴장하셨습니다.`;
        setSelectedUser(null);
      }
      const newUsers = (users as IUser[]).filter(
        user => user.userID !== userID
      );
      setChat({ content });
      setUsers(newUsers);
    });

    socket.on("public message", message => {
      setChat({ ...message });
    });

    socket.on("private message", message => {
      const fromSelf = message.from.userID === socket.userID ? true : false;
      setChat({ ...message, fromSelf });
      if (fromSelf) return;
      const newUsers = (users as IUser[]).map(user => {
        if (user.userID === message.from.userID) {
          const messages = {
            hasNewMessages: user.messages.hasNewMessages + 1,
            recent: new Date(),
          };
          user.messages = messages;
        }
        return user;
      });
      setUsers(newUsers);
    });

    return () => {
      socket.off("users");
      socket.off("user connected");
      socket.off("user disconnected");
      socket.off("public message");
      socket.off("private message");
    };
  }, [setUsers, setRooms, setChat, setSelectedUser, users, selectedUser]);

  // room
  useEffect(() => {
    socket.on("room created", (room: IRoom) => {
      if (room.creater === socket.userID) joinRoom(room.roomID);
      const newRooms = { ...rooms, [room.roomID]: room };
      setRooms(newRooms);
    });

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
      socket.off("room created");
      socket.off("join room");
      socket.off("leave room");
      socket.off("room message");
    };
  }, [joinRoom, setRooms, setRoom, rooms, setUsers, users, room]);

  // 누적된 작업을 받아와서 일괄 처리함
  const deleteRoom = useCallback(
    arr => {
      const newRooms: IRooms = {};
      const roomVals = Object.values(rooms);
      roomVals.forEach(room => {
        if (arr.includes(room.roomID)) return;
        newRooms[room.roomID] = room;
      });
      setRooms(newRooms);
    },
    [rooms, setRooms]
  );

  const deleteDebounceAct = useMemo(
    () => debounce(deleteRoom, 20),
    [deleteRoom]
  );

  useEffect(() => {
    socket.on("delete room", deleteDebounceAct);
    return () => {
      socket.off("delete room");
    };
  }, [deleteDebounceAct]);

  useEffect(() => {
    socket.on("session", userID => {
      socket.userID = userID;
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return {
    connectSocekt,
    sendPublicMessage,
    sendPrivateMessage,
    sendRoomMessage,
    createRoom,
    joinRoom,
    leaveRoom,
  };
}
