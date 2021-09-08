import { useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import Message from "components/message/index";

interface ChatProps<T> {
  chats: T[];
  sendMessage(T: string): void;
  joinedUser: { userID?: string; userName?: string } | null;
  togglePrivateMessage(T: string | null): void;
}

function Chat<T>({
  chats,
  sendMessage,
  joinedUser,
  togglePrivateMessage,
}: ChatProps<T>) {
  const ref = useRef<HTMLInputElement>(null);
  const onSubmitHandler = useCallback(
    e => {
      e.preventDefault();
      const message = ref?.current?.value;
      if (!message) return;
      sendMessage(message);
      e.target[0].value = "";
    },
    [sendMessage]
  );

  const onClickHandler = useCallback(() => {
    const id = joinedUser?.userID ?? null;
    togglePrivateMessage(id);
  }, [togglePrivateMessage, joinedUser]);

  useEffect(() => {
    const element = document.querySelector(".chats");
    element?.scrollTo(0, element.scrollHeight);
  }, [chats]);

  return (
    <SChats className="chat-area">
      <div className="chats">
        {chats.map((chat, i) => (
          <Message
            key={`chat ${i}`}
            chat={chat}
            togglePrivateMessage={togglePrivateMessage}
          />
        ))}
      </div>
      <form onSubmit={onSubmitHandler}>
        {joinedUser && (
          <b className="private-message" onClick={onClickHandler}>
            {joinedUser.userName} 에게
          </b>
        )}
        {!joinedUser && <b>모두에게</b>}
        <input ref={ref} type="text" />
        <button>입력</button>
      </form>
    </SChats>
  );
}

const SChats = styled.section`
  display: flex;
  flex-direction: column;
  .chats {
    position: relative;
    width: 100%;
    height: calc(100% - 36.1px);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0.4rem;
    overflow-y: scroll;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  form {
    position: relative;
    width: 100%;
    height: 36px;
    background: #222;
    display: flex;
    align-items: center;
    b {
      display: inline-block;
      width: 20%;
      background-color: #222;
      border-radius: 6px 0 0 6px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      color: #fff;
      padding-left: 0.3rem;
      &.private-message {
        color: rgba(245, 81, 226, 1);
      }
    }
    input {
      border: 0;
      width: 70%;
      padding: 0.2rem 0.4rem;
      outline: none;
      border-radius: 6px;
    }
    button {
      border: 0;
      background: none;
      width: 10%;
      color: #fff;
      cursor: pointer;
    }
    * {
      font-size: 0.9rem;
    }
  }
`;

export default Chat;
