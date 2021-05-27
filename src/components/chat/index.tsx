import { useCallback, useRef } from "react";
import { IChat } from "types/chat";
import { IUser } from "types/user";
import Message from "components/message/index";

interface Props {
  chats: IChat[];
  emitMessage(T: string): void;
  selectedUser: IUser | null;
  togglePrivateMessage(T: string | null): void;
}

const Chat = ({
  chats,
  emitMessage,
  selectedUser,
  togglePrivateMessage,
}: Props) => {
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

  const onClickHandler = useCallback(() => {
    const id = selectedUser?.userID ?? null;
    togglePrivateMessage(id);
  }, [togglePrivateMessage, selectedUser]);

  return (
    <section>
      <div className="chats">
        {chats.map((chat, i) => (
          <Message
            key={`chat ${i}`}
            {...chat}
            togglePrivateMessage={togglePrivateMessage}
          />
        ))}
      </div>
      <form onSubmit={onSubmitHandler}>
        {selectedUser && (
          <span onClick={onClickHandler}>{selectedUser.userName} 에게</span>
        )}
        <input ref={ref} type="text" />
        <button>입력</button>
      </form>
    </section>
  );
};

export default Chat;
