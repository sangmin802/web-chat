import { useCallback, useEffect, useState } from "react";
import { IChat } from "types/chat";

export function useChat(resetKey: any) {
  const [chats, setState] = useState<IChat[]>([]);

  const setChat = useCallback(
    (chat: IChat) => {
      setState([...chats, chat]);
    },
    [setState, chats]
  );

  const clearChat = useCallback(() => {
    setState([]);
  }, [setState]);

  useEffect(() => {
    return () => {
      clearChat();
    };
  }, [resetKey, clearChat]);

  return { chats, setChat };
}
