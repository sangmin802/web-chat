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
      const newUsers = { ...users };
      newUsers[user.userID] = user;
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
      const newUsers: IUsers = {};
      const userVals = Object.values(users);
      userVals.forEach(user => {
        if (user.userID !== userID) newUsers[user.userID] = user;
      });

      setChat({ content });
      setUsers(newUsers);
    });

    socket.on("public message", message => {
      setChat({ ...message });
    });

    return () => {
      socket.off("user connected");
      socket.off("user disconnected");
      socket.off("public message");
    };
  }, [setChat, setUsers, setSelectedUser, users, selectedUser]);

  const onRoomCreated = useCallback(
    (room: IRoom) => {
      roomsDebounce.debounceAct(() => {
        if (room.creater === socket.userID) joinRoom(room.roomID);
        const newRooms = { ...roomsDebounce.newState, [room.roomID]: room };
        roomsDebounce.newState = newRooms;
      });
    },
    [roomsDebounce, joinRoom]
  );

  const onDeleteRoom = useCallback(
    roomID => {
      roomsDebounce.debounceAct(() => {
        const newRooms: IRooms = {};
        const roomVals: IRoom[] = Object.values(roomsDebounce.newState);
        roomVals.forEach(room => {
          if (room.roomID === roomID) return;
          newRooms[room.roomID] = room;
        });
        roomsDebounce.newState = newRooms;
      });
    },
    [roomsDebounce]
  );

  // 방관련

  useEffect(() => {
    socket.on("room created", room => {
      onRoomCreated(room);
    });

    socket.on("delete room", roomID => {
      onDeleteRoom(roomID);
    });

    return () => {
      socket.off("room created");
      socket.off("delete room");
    };
  }, [onRoomCreated, onDeleteRoom]);

  return {
    sendPublicMessage,
    createRoom,
    joinRoom,
  };
}
