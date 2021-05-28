import { useCallback } from "react";
import styled from "styled-components";
import { IUser } from "types/user";

interface Props {
  user: IUser;
  togglePrivateMessage(T: string): void;
  selectedUser: null | IUser;
}

const User = ({ user, togglePrivateMessage, selectedUser }: Props) => {
  const onClickHandler = useCallback(() => {
    togglePrivateMessage(user.userID);
  }, [togglePrivateMessage, user]);

  return (
    <SArticle
      isTarget={user.userID === selectedUser?.userID}
      onClick={onClickHandler}
    >
      <div className="user-name">{user.userName}</div>
      {user.messages && user.messages.hasNewMessages !== 0 && (
        <div className="messages-hasNewMessages">
          {user.messages.hasNewMessages}
        </div>
      )}
    </SArticle>
  );
};

const SArticle = styled.article<{ isTarget: boolean }>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-item: center;
  ${({ isTarget }) =>
    isTarget
      ? "background-color : #fff; color : black"
      : "background-color : transparent; color : #f2f2f2"};
  padding: 0.2rem 0.4rem;
  .messages-hasNewMessages {
    background-color: purple;
    padding: 0.1rem 0.3rem;
    border-radius: 3px;
    font-size: 0.85rem;
  }
`;

export default User;
