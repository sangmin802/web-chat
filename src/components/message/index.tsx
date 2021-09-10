import { useCallback, useMemo } from "react";
import { Text } from "components";
import * as Styled from "./index.style";

interface MessageProps<T> {
  chat: T;
  togglePrivateMessage(T: string | null): void;
}

function Message<
  T extends Partial<{
    content: string;
    from: { [key: string]: string };
    to: { [key: string]: string };
    fromSelf: string;
  }>
>({ chat, togglePrivateMessage }: MessageProps<T>) {
  const { content, from, to, fromSelf } = chat;
  const [title, type] = useMemo(() => {
    if (!to && !from) return ["공지", "anounce-message"];
    if (!to) return [from?.userName, "public-message"];
    if (fromSelf) return [`당신이 ${to.userName}에게`, "private-message"];
    if (!fromSelf) return [`${from?.userName}님이 당신에게`, "private-message"];
    return [null, "public"];
  }, [from, to, fromSelf]);

  const handleToggleMessageType = useCallback(() => {
    if (!to || !from) return;
    const id = fromSelf ? to.userID : from.userID;
    togglePrivateMessage(id);
  }, [togglePrivateMessage, fromSelf, from, to]);

  return (
    <Styled.Message type={type} onClick={handleToggleMessageType}>
      <Text type={type}>
        <b>{title}</b> : {content}
      </Text>
    </Styled.Message>
  );
}

export default Message;
