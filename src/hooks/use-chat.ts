import { useCallback, useState } from "react";
import { IChat } from "types/chat";

export function useChat() {
  const [chats, setChat] = useState<IChat[]>([]);

  // const setChat = useCallback(
  //   (chat: IChat) => {
  //     setState([...chats, chat]);
  //   },
  //   [setState, chats]
  // );

  return { chats, setChat };
}
