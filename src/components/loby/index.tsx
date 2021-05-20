import { useCallback } from "react";
import User from "components/user/index";
import Chat from "components/chat/index";
import { IUser } from "types/user";
import { IChat } from "types/chat";
import { IRoom } from "types/room";

interface Props {
  users: IUser[];
  chats: IChat[];
  sendPublicMessage(T: string): void;
  sendPrivateMessage(T: IChat): void;
  selectedUser: null | IUser;
  setSelectedUser(T: IUser): void;
  rooms: IRoom[];
}

const Loby = ({
  users,
  chats,
  sendPublicMessage,
  sendPrivateMessage,
  selectedUser,
  setSelectedUser,
  rooms,
}: Props) => {
  const emitMessage = useCallback(
    message => {
      if (selectedUser)
        sendPrivateMessage({ content: message, to: selectedUser });
      if (!selectedUser) sendPublicMessage(message);
    },
    [sendPublicMessage, selectedUser, sendPrivateMessage]
  );

  const createRoomHandler = useCallback(() => {
    createRoom();
  }, [createRoom]);
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
        <button onClick={createRoomHandler}>방 만들기</button>
      <Chat chats={chats} emitMessage={emitMessage}>
        {selectedUser && <span>{selectedUser.userName} 에게</span>}
      </Chat>
    </>
  );
};

export default Loby;
