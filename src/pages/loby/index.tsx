import { cloneElement, ReactElement, useCallback, useMemo } from "react";
import styled from "styled-components";
import { IUsers, IUser, IUserID } from "types/user";
import { IChat } from "types/chat";
import { IRooms, IRoom } from "types/room";
import { useLobySocket } from "hooks/use-loby-socket";
import { Debounce } from "util/debounce";
import Room from "components/room/index";

type emitMessage = (T: IChat) => void;

interface Props {
  interfaceLayout: ReactElement;
  users: IUsers;
  setUsers(T: IUsers): void;
  chats: IChat[];
  setChat(T: any): void;
  selectedUser: null | IUser;
  setSelectedUser(T: IUser): void;
  rooms: IRooms;
  setRoom(T: string): void;
  setRooms(T: IRooms): void;
  emitMessage(T: emitMessage, U: IChat): void;
}

const Loby = (props: Props) => {
  const {
    chats,
    rooms,
    setRooms,
    setRoom,
    emitMessage,
    users,
    interfaceLayout,
  } = props;

  const SE = useLobySocket(props);

  const emitMessageHandler = useCallback(
    content => {
      emitMessage(SE.sendPublicMessage, { content });
    },
    [emitMessage, SE]
  );

  const enterRoom = useCallback(
    roomID => {
      const newRooms = { ...rooms };
      newRooms[roomID] = { ...rooms[roomID], hasNewMessages: 0 };
      setRooms(newRooms);
      setRoom(roomID);
    },
    [rooms, setRoom, setRooms]
  );

  const iterableRooms = useMemo(
    () =>
      Object.values(rooms).sort((a, b) => {
        if (a.isJoined) return -1;
        return 0;
      }),
    [rooms]
  );
  const iterableUsers = useMemo(
    () =>
      Object.values(users).sort((a, b) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.messages.recent > b.messages.recent) return -1;
        return 0;
      }),
    [users]
  );
  return (
    <SInterface>
      {cloneElement(
        interfaceLayout,
        {
          chats,
          iterableUsers,
          emitMessageHandler,
        },
        <SLobyChildren>
          <section className="button-container">
            <button onClick={SE.createRoom}>방 만들기</button>
          </section>
          <section className="created-rooms">
            {iterableRooms.map(room => (
              <Room<IRoom, IUserID>
                key={room.roomID}
                room={room}
                enterRoom={enterRoom}
                joinRoom={SE.joinRoom}
              />
            ))}
          </section>
        </SLobyChildren>
      )}
    </SInterface>
  );
};

const SInterface = styled.section`
  display: flex;
  height: 100%;
  .chat-area {
    height: 40%;
  }
`;

const SLobyChildren = styled.section`
  height: 60%;
  padding: 0.5rem;
  .created-rooms {
    height: calc(99% - 30.1px);
    padding-top: 0.5rem;
    display: flex;
    flex-wrap: wrap;
    overflow-y: scroll;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export default Loby;
