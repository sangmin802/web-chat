import { useCallback, useRef } from "react";
import { IChat } from "types/chat";
import { IUser } from "types/user";
import Message from "components/message/index";

interface Props {
  chats: IChat[];
  sendPublicMessage(T: string): void;
  sendPrivateMessage(T: IChat): void;
  selectedUser: null | IUser;
}

const Chat = ({
  chats,
  sendPublicMessage,
  sendPrivateMessage,
  selectedUser,
}: Props) => {
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
      <div className="chats">
        {chats.map((chat, i) => (
          <Message key={`chat ${i}`} {...chat} />
        ))}
      </div>
      <form onSubmit={onSubmitHandler}>
        {selectedUser && <span>{selectedUser.userName} 에게</span>}
        <input ref={ref} type="text" />
        <button>입력</button>
      </form>
    </section>
  );
};

export default Chat;
