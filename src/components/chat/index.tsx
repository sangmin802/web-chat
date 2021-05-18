import React, { useCallback, useRef } from "react";
import { IChat } from "types/chat";
import Message from "components/message/index";

interface Props {
  chats: IChat[];
  sendPublicMessage(T: string): void;
}

const Chat = ({ chats, sendPublicMessage }: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  const onSubmitHandler = useCallback(
    e => {
      e.preventDefault();
      const message = ref?.current?.value;
      if (!message) return;
      if (selectedUser)
        sendPrivateMessage({ content: message, to: selectedUser });
      if (!selectedUser) sendPublicMessage(message);
      e.target[0].value = "";
    },
    [sendPublicMessage, ref, selectedUser, sendPrivateMessage]
  );

  return (
    <section>
      <ul className="chats">
        {chats.map((chat, i) => (
          <Message key={`public chat ${i}`} {...chat} />
        ))}
      </ul>
      <form onSubmit={onSubmitHandler}>
        <input ref={ref} type="text" />
        <button>입력</button>
      </form>
    </section>
  );
};

export default Chat;
