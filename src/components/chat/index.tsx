import { useCallback, useEffect, useRef } from "react";
import { Message, Button, Input, Text } from "components";
import * as Styled from "./index.style";

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
    <Styled.ChatArea className="chat-area">
      <Styled.Chats className="chats">
        <Styled.Dummy />
        {chats.map((chat, i) => (
          <Message
            key={`chat ${i}`}
            chat={chat}
            togglePrivateMessage={togglePrivateMessage}
          />
        ))}
      </Styled.Chats>
      <Styled.Form onSubmit={onSubmitHandler}>
        <Styled.Text>
          {joinedUser ? (
            <Text type="private-message" onClick={onClickHandler}>
              {joinedUser.userName} 에게
            </Text>
          ) : (
            <Text type="white">모두에게</Text>
          )}
        </Styled.Text>
        <Styled.Input>
          <Input ref={ref} type="text" />
        </Styled.Input>
        <Styled.Button>
          <Button>
            <Text type="white">입력</Text>
          </Button>
        </Styled.Button>
      </Styled.Form>
    </Styled.ChatArea>
  );
}

export default Chat;
