import { useCallback } from "react";
import styled from "styled-components";
import { IUser } from "types/user";

interface Props {
  users: IUser[];
  setUsers(T: IUser[]): void;
  user: IUser;
  setSelectedUser(T: null | IUser): void;
  selectedUser: null | IUser;
}

const User = ({
  user,
  setSelectedUser,
  selectedUser,
  users,
  setUsers,
}: Props) => {
  const onClickHandler = useCallback(() => {
    if (user.self) return;
    const toggle = selectedUser?.userID === user.userID ? null : { ...user };
    const newUsers = users.map(oUser => {
      if (oUser.userID === user.userID) oUser.messages.hasNewMessages = 0;
      return oUser;
    });
    setSelectedUser(toggle);
    setUsers(newUsers);
  }, [setSelectedUser, user, selectedUser, users, setUsers]);

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
