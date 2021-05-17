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
}

export function useSocket({
  isLogin,
  setLogin,
  setUsers,
  setUser,
  removeUser,
  setChat,
}: Props) {
  useEffect(() => {
    if (!isLogin) return;
    socket.on("users", users => {
      setUsers(users);
    });

    socket.on("user connected", user => {
      setUser(user);
    });

    socket.on("user disconnected", userID => {
      removeUser(userID);
    });

    socket.on("send public message", message => {
      setChat(message);
    });

    return () => {
      socket.off("users");
      socket.off("user connected");
      socket.off("user disconnected");
      socket.off("send public message");
    };
  }, [isLogin, setUsers, setUser, removeUser, setChat]);

  useEffect(() => {
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
    socket.emit("send public message", message);
  }, []);

  return { connectSocekt, sendPublicMessage };
}
