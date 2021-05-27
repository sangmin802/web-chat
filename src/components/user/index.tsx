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
  background-color: ${({ isTarget }) =>
    isTarget ? "yellowgreen" : "transparent"};
`;

export default User;
