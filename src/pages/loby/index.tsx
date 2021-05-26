import { useCallback, useMemo } from "react";
import styled from "styled-components";
import { IUser } from "types/user";
import { IChat } from "types/chat";
import { IRooms } from "types/room";
import { useLobySocket } from "hooks/use-loby-socket";
import User from "components/user/index";
import Chat from "components/chat/index";
import Room from "components/room/index";

interface Props {
  users: IUser[];
  setUsers(T: IUser[]): void;
  chats: IChat[];
  setChat(T: IChat): void;
  selectedUser: null | IUser;
  setSelectedUser(T: IUser): void;
  rooms: IRooms;
  setRoom(T: string): void;
  setRooms(T: IRooms): void;
}

const Loby = (props: Props) => {
  const {
    setUsers,
    users,
    chats,
    selectedUser,
    setSelectedUser,
    rooms,
    setRooms,
    setRoom,
  } = props;

  const SE = useLobySocket(props);

  const emitMessage = useCallback(
    message => {
      if (selectedUser)
        SE.sendPrivateMessage({ content: message, to: selectedUser });
      if (!selectedUser) SE.sendPublicMessage(message);
    },
    [SE.sendPublicMessage, selectedUser, SE.sendPrivateMessage]
  );

  const createRoomHandler = useCallback(() => {
    SE.createRoom();
  }, [SE.createRoom]);

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
  const iterableUsers = useMemo(() => Object.values(users), [users]);
  return (
    <SLoby>
      <SUsers className="users">
        {iterableUsers.map(user => (
          <User
            key={user.userID}
            user={user}
            setUsers={setUsers}
            users={users}
            setSelectedUser={setSelectedUser}
            selectedUser={selectedUser}
          />
        ))}
      </SUsers>
      <SChatAct>
        <div className="button-container">
          <button className="create-room" onClick={createRoomHandler}>
            방 만들기
          </button>
        </div>
        <section className="created-rooms">
          {iterableRooms.map(room => (
            <Room
              key={room.roomID}
              room={room}
              enterRoom={enterRoom}
              joinRoom={SE.joinRoom}
            />
          ))}
        </section>
        <Chat chats={chats} emitMessage={emitMessage}>
          {selectedUser && <span>{selectedUser.userName} 에게</span>}
        </Chat>
      </SChatAct>
    </SLoby>
  );
};

const SLoby = styled.section`
  display: flex;
  height: 100%;
`;

const SUsers = styled.section`
  width: 20%;
  height: 100%;
  background: #999;
  padding: 0.2rem 0.4rem;
  margin-right: 1%;
`;

const SChatAct = styled.section`
  width: 79%;
  height : 100%;
  display: flex;
  padding: 0.2rem 0.4rem;
  flex-direction: column;
  .button-container {
    .create-room {
      display: inline-block;
      width: fit-content;
      background: transparent;
      border 1px solid #666;
      border-radius : 3px;
      padding : .1rem .3rem;
      float : right;
    }
  }
  .created-rooms {
    display : flex;
    flex-wrap : wrap;
  }
`;

export default Loby;
