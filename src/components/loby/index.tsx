import { useCallback, useMemo } from "react";
import { IUser } from "types/user";
import { IChat } from "types/chat";
import { IRooms } from "types/room";
import User from "components/user/index";
import Chat from "components/chat/index";
import Room from "components/room/index";

interface Props {
  users: IUser[];
  chats: IChat[];
  sendPublicMessage(T: string): void;
  sendPrivateMessage(T: IChat): void;
  selectedUser: null | IUser;
  setSelectedUser(T: IUser): void;
  rooms: IRooms;
  setRoom(T: string): void;
  setRooms(T: IRooms): void;
  createRoom(): void;
  joinRoom(T: string): void;
}

const Loby = ({
  users,
  chats,
  sendPublicMessage,
  sendPrivateMessage,
  selectedUser,
  setSelectedUser,
  rooms,
  setRoom,
  setRooms,
  createRoom,
  joinRoom,
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

  const enterRoom = useCallback(
    roomID => {
      const newRooms = { ...rooms };
      newRooms[roomID] = { ...rooms[roomID], hasNewMessages: 0 };
      setRoom(roomID);
      setRooms(newRooms);
    },
    [rooms, setRoom, setRooms]
  );

  const iterableRooms = useMemo(() => Object.values(rooms), [rooms]);

  return (
    <SLoby>
      <SUsers className="users">
        {users.map(user => (
          <User
            key={user.userID}
            user={user}
            setSelectedUser={setSelectedUser}
            selectedUser={selectedUser}
          />
        ))}
      </section>
      <section>
        <button onClick={createRoomHandler}>방 만들기</button>
        <section>
          {iterableRooms.map(room => (
            <Room
              key={room.roomID}
              room={room}
              enterRoom={enterRoom}
              joinRoom={joinRoom}
            />
          ))}
        </section>
      </section>
      <Chat chats={chats} emitMessage={emitMessage}>
        {selectedUser && <span>{selectedUser.userName} 에게</span>}
      </Chat>
    </>
  );
};

export default Loby;
