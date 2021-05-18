import React from "react";
import User from "components/user/index";
import Chat from "components/chat/index";
import { IUser } from "types/user";
import { IChat } from "types/chat";

interface Props {
  users: IUser[];
  chats: IChat[];
  sendPublicMessage(T: string): void;
  sendPrivateMessage(T: IChat): void;
  selectedUser: null | IUser;
  setSelectedUser(T: IUser): void;
}

const Loby = ({
  users,
  chats,
  sendPublicMessage,
  sendPrivateMessage,
  selectedUser,
  setSelectedUser,
}: Props) => {
  return (
    <>
      <section className="users">
        {users.map(user => (
          <User
            key={user.userID}
            user={user}
            setSelectedUser={setSelectedUser}
            selectedUser={selectedUser}
          />
        ))}
      </section>
      <Chat
        chats={chats}
        sendPublicMessage={sendPublicMessage}
        sendPrivateMessage={sendPrivateMessage}
        selectedUser={selectedUser}
      />
    </>
  );
};

export default Loby;
