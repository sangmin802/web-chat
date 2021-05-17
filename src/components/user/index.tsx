import React from "react";
import { IUser } from "types/user";

interface Props {
  user: IUser;
}

const User = ({ user }: Props) => {
  return (
    <article>
      <div className="user-name">{user.userName}</div>
    </article>
  );
};

export default User;
