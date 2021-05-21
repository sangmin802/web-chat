import { useCallback, useEffect, useState } from "react";
import { IChat } from "types/chat";

export function useChat(key: null | string) {
  const [chats, setState] = useState<IChat[]>([]);

  const setChat = useCallback(
    (chat: IChat) => {
      setState([...chats, chat]);
    },
    [setState, chats]
  );

  useEffect(() => {
    return () => {
      setState([]);
    };
  }, [setState, key]);

  return { chats, setChat };
}
