import { useCallback, useState } from "react";
import { IChat } from "types/chat";

export function useChat() {
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

  return { chats, setChat, clearChat };
}
