import { useEffect, useCallback } from "react";
import { socket } from "socket/index";
import { IUser, IUsers } from "types/user";
import { IChat } from "types/chat";
import { IRoom, IRooms } from "types/room";

interface Props {
  users: IUsers;
  // setUsers(T: IUsers): void;
  setUsers(T: any): void;
  // setChat(T: IChat): void;
  setChat(T: any): void;
  selectedUser: null | IUser;
  setSelectedUser(T: null | IUser): void;
  setRoom(T: null | string): void;
  setRooms(T: any): void;
  rooms: IRooms;
}

export function useLobySocket({
  setUsers,
  setChat,
  selectedUser,
  setSelectedUser,
  setRooms,
  rooms,
}: Props) {
  const sendPublicMessage = useCallback(({ content }) => {
    socket.emit("public message", content);
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
      setUsers((oldUsers: any) => {
        return { ...oldUsers, [user.userID]: user };
      });
      setChat((oldChats: any) => {
        const chat = { content: `${user.userName}님이 입장하셨습니다.` };
        return [...oldChats, chat];
      });
    });

    socket.on("user disconnected", ({ userID, userName }) => {
      const isQuit = selectedUser?.userID === userID ? true : false;
      let content = `${userName}님이 퇴장하셨습니다.`;
      if (isQuit) {
        content = `귓속말 대상인 ${userName}님이 퇴장하셨습니다.`;
        setSelectedUser(null);
      }
      setChat((oldChats: any) => {
        const chat = { content };
        return [...oldChats, chat];
      });
      setUsers((oldUsers: any) => {
        const newUsers: IUsers = {};
        const userVals: any = Object.values(oldUsers);
        userVals.forEach((user: any) => {
          if (user.userID !== userID) newUsers[user.userID] = user;
        });
        return newUsers;
      });
    });

    socket.on("public message", message => {
      setChat((oldChats: any) => {
        const chat = { ...message };
        return [...oldChats, chat];
      });
    });

    return () => {
      socket.off("user connected");
      socket.off("user disconnected");
      socket.off("public message");
    };
  }, [setChat, setUsers, setSelectedUser, selectedUser]);

  const onRoomCreated = useCallback((room: IRoom) => {
    setRooms((oldRooms: any) => {
      if (room.creater === socket.userID) joinRoom(room.roomID);
      return { ...oldRooms, [room.roomID]: room };
    });
  }, []);

  const onDeleteRoom = useCallback(
    roomID => {
      setRooms((oldRooms: any) => {
        const newRooms: IRooms = {};
        const roomVals: IRoom[] = Object.values(oldRooms);
        roomVals.forEach(room => {
          if (room.roomID === roomID) return;
          newRooms[room.roomID] = room;
        });
        return newRooms;
      });
    },
    [setRooms]
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
