import { useCallback, useMemo } from "react";
import styled from "styled-components";
import { IChat } from "types/chat";

interface Props extends IChat {
  togglePrivateMessage(T: string): void;
}

const Message = ({
  content,
  from,
  to,
  fromSelf,
  togglePrivateMessage,
}: Props) => {
  const [title, type] = useMemo(() => {
    if (!to && !from) return ["공지", 0];
    if (!to) return [from?.userName, 1];
    if (fromSelf) return [`당신이 ${to.userName}에게`, 2];
    if (!fromSelf) return [`${from?.userName}님이 당신에게`, 2];
    return [null, 1];
  }, [from, to, fromSelf]);

  const onClickHandler = useCallback(() => {
    if (!to || !from) return;
    const id = fromSelf ? to.userID : from.userID;
    togglePrivateMessage(id);
  }, [togglePrivateMessage, fromSelf, from, to]);

  return (
    <SArticle type={type} onClick={onClickHandler}>
      <b>{title}</b> : {content}
    </SArticle>
  );
};

const SArticle = styled.article<{ type: number }>`
  width: 100%;
  position: relative;
  text-align: left;
  color: ${({ type }) => {
    const arr = ["green", "black", "purple"];
    return arr[type];
  }};
  cursor: ${({ type }) => (type === 2 ? "pointer" : "normal")};
`;

export default Message;
