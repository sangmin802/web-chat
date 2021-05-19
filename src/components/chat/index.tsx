import { useCallback, useRef } from "react";
import { IChat } from "types/chat";
import { IUser } from "types/user";
import Message from "components/message/index";

interface Props {
  chats: IChat[];
  emitMessage(T: string): void;
  children?: any;
}

const Chat = ({ chats, emitMessage, children }: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  const onSubmitHandler = useCallback(
    e => {
      e.preventDefault();
      const message = ref?.current?.value;
      if (!message) return;
      emitMessage(message);
      e.target[0].value = "";
    },
    [emitMessage]
  );

  return (
    <section>
      <div className="chats">
        {chats.map((chat, i) => (
          <Message key={`chat ${i}`} {...chat} />
        ))}
      </div>
      <form onSubmit={onSubmitHandler}>
        {children}
        <input ref={ref} type="text" />
        <button>입력</button>
      </form>
    </section>
  );
};

export default Chat;
