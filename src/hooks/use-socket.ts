import { useEffect, useCallback } from "react";
import { socket } from "socket/index";
import { IUser } from "types/user";
import { IChat } from "types/chat";

interface Props {
  isLogin: boolean;
  setLogin(T: boolean): void;
  setUsers(T: IUser[]): void;
  setUser(T: IUser): void;
  removeUser(T: string): void;
  setChat(T: IChat): void;
  selectedUser: null | IUser;
  setSelectedUser(T: null | IUser): void;
}

export function useSocket({
  isLogin,
  setLogin,
  setUsers,
  setUser,
  removeUser,
  setChat,
  selectedUser,
  setSelectedUser,
}: Props) {
  useEffect(() => {
    if (!isLogin) return;
    socket.on("users", users => {
      setUsers(users);
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
      });
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
