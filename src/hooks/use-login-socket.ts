import { useCallback } from "react";
import { socket } from "socket/index";

interface Props {
  setLogin(T: boolean): void;
}

export function useLoginSocket({ setLogin }: Props) {
  const connectSocekt = useCallback(
    userName => {
      setLogin(true);
      socket.auth = { userName };
      socket.connect();
    },
    [setLogin]
  );

  return {
    connectSocekt,
  };
}
