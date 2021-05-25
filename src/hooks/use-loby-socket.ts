import { useEffect, useCallback, useMemo } from "react";
import { socket } from "socket/index";
import { IUser } from "types/user";
import { IChat } from "types/chat";
import { IRoom, IRooms } from "types/room";
import { debounce } from "util/debounce";

interface Props {
  users: null | IUser[];
  setUsers(T: IUser[]): void;
  setChat(T: IChat): void;
  selectedUser: null | IUser;
  setSelectedUser(T: null | IUser): void;
  rooms: IRooms;
  setRooms(T: IRooms): void;
  setRoom(T: null | string): void;
}

export function useLobySocket({
  users,
  setUsers,
  setChat,
  selectedUser,
  setSelectedUser,
  rooms,
  setRooms,
}: Props) {
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

  // 로비 내부 채팅
  useEffect(() => {
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

    socket.on("public message", message => {
      setChat({ ...message });
    });

    return () => {
      socket.off("user connected");
      socket.off("user disconnected");
      socket.off("private message");
      socket.off("public message");
    };
  }, [setChat, setUsers, setSelectedUser, users, selectedUser]);

  // 방 관련
  useEffect(() => {
    socket.on("room created", (room: IRoom) => {
      if (room.creater === socket.userID) joinRoom(room.roomID);
      const newRooms = { ...rooms, [room.roomID]: room };
      setRooms(newRooms);
    });

    return () => {
      socket.off("room created");
    };
  }, [setRooms, rooms]);

  // 방 제거 debounce
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
    sendPublicMessage,
    sendPrivateMessage,
    createRoom,
    joinRoom,
  };
}
