import React from "react";
import { IUser } from "types/user";

interface Props {
  user: IUser;
  setSelectedUser(T: null | IUser): void;
  selectedUser: null | IUser;
}

const User = ({ user, setSelectedUser, selectedUser }: Props) => {
  const onClickHandler = useCallback(() => {
    const toggle = selectedUser?.userID === user.userID ? null : user;
    setSelectedUser(toggle);
  }, [setSelectedUser, user, selectedUser]);

  return (
    <article>
      <div className="user-name">{user.userName}</div>
    </article>
  );
};

export default User;
