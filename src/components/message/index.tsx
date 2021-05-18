import { useMemo } from "react";
import styled from "styled-components";
import { IChat } from "types/chat";

const Message = ({ content, from, to, fromSelf }: IChat) => {
  const [title, type] = useMemo(() => {
    if (!to && !from) return ["공지", 0];
    if (!to) return [from?.userName, 1];
    if (fromSelf) return [`당신이 ${to.userName}에게`, 2];
    if (!fromSelf) return [`${from?.userName}님이 당신에게`, 2];
    return [null, 1];
  }, [from, to, fromSelf]);

  return (
    <SArticle type={type}>
      {title} : {content}
    </SArticle>
  );
};

const SArticle = styled.article<{ type: number }>`
  color: ${({ type }) => {
    const arr = ["green", "black", "purple"];
    return arr[type];
  }};
`;

export default Message;
