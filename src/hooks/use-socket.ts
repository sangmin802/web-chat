import { useEffect, useCallback } from "react";
import { socket } from "socket/index";
import { IUser } from "types/user";
import { IChat } from "types/chat";
import { IRoom } from "types/room";

interface Props {
  isLogin: boolean;
  setLogin(T: boolean): void;
  users: null | IUser[];
  setUsers(T: IUser[]): void;
  setChat(T: IChat): void;
  selectedUser: null | IUser;
  setSelectedUser(T: null | IUser): void;
  rooms: IRoom[];
  setRooms(T: IRoom[]): void;
}

export function useSocket({
  isLogin,
  setLogin,
  users,
  setUsers,
  setChat,
  selectedUser,
  setSelectedUser,
  rooms,
  setRooms,
}: Props) {
  useEffect(() => {
    if (!isLogin) return;
    socket.on("users", (users: IUser[]) => {
      const newUsers = users.map(user => {
        user.self = false;
        if (user.userID === socket.userID) user.self = true;
        return user;
      });
      setUsers(newUsers);
    });
    });

    socket.on("user connected", user => {
      setUser(user);
      setChat({ content: `${user.userName}님이 입장하셨습니다.` });
    });

    socket.on("user disconnected", ({ userID, userName }) => {
      const isQuit = selectedUser?.userID === userID ? true : false;
      let content = `${userName}님이 퇴장하셨습니다.`;
      if (isQuit) {
        content = `귓속말 대상인 ${userName}님이 퇴장하셨습니다.`;
        setSelectedUser(null);
      }
      setChat({ content });
      removeUser(userID);
    });

    const messageEvents = ["public message", "private message"];
    messageEvents.forEach(event => {
      socket.on(event, message => {
        const fromSelf = message.from.userID === socket.userID ? true : false;
        setChat({ ...message, fromSelf });
    socket.on("private message", message => {
      const fromSelf = message.from.userID === socket.userID ? true : false;
      setChat({ ...message, fromSelf });
      if (fromSelf) return;
      const newUsers = (users as IUser[]).map(user => {
        if (user.userID === message.from.userID) {
          const messages = {
            size: user.messages.size + 1,
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
  }, [
    isLogin,
    setUsers,
    setUser,
    removeUser,
    setChat,
    selectedUser,
    setSelectedUser,
  ]);

  useEffect(() => {
    socket.on("session", userID => {
      socket.userID = userID;
    });

    return () => {
      socket.disconnect();
    };
  }, []);

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

  return { connectSocekt, sendPublicMessage, sendPrivateMessage };
}
