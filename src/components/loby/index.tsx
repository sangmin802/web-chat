import React from "react";
import User from "components/user/index";
import Chat from "components/chat/index";
import { IUser } from "types/user";
import { IChat } from "types/chat";

interface Props {
  users: IUser[];
  chats: IChat[];
  sendPublicMessage(T: string): void;
}

const Loby = ({ users, chats, sendPublicMessage }: Props) => {
  return (
    <>
      <section className="users">
        {users.map(user => (
          <User key={user.userID} user={user} />
        ))}
      </section>
      <Chat chats={chats} sendPublicMessage={sendPublicMessage} />
    </>
  );
};

export default Loby;
