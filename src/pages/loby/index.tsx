import { cloneElement, ReactElement, useCallback, useMemo } from "react";
import { IUsers, IUser } from "types/user";
import { IChat } from "types/chat";
import { IRooms } from "types/room";
import { useLobySocket } from "hooks/use-loby-socket";
import { Debounce } from "util/debounce";
import Room from "components/room/index";

type emitMessage = (T: IChat) => void;

interface Props {
  interfaceLayout: ReactElement;
  users: IUsers;
  setUsers(T: IUsers): void;
  chats: IChat[];
  setChat(T: IChat | IChat[]): void;
  selectedUser: null | IUser;
  setSelectedUser(T: IUser): void;
  rooms: IRooms;
  setRoom(T: string): void;
  setRooms(T: IRooms): void;
  emitMessage(T: emitMessage, U: IChat): void;
  roomsDebounce: Debounce;
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

  const iterableRooms = useMemo(() => Object.values(rooms), [rooms]);
  const iterableUsers = useMemo(() => Object.values(users), [users]);
  return (
    <>
      {cloneElement(
        interfaceLayout,
        {
          chats,
          iterableUsers,
          emitMessageHandler,
        },
        <>
          <div className="button-container">
            <button onClick={SE.createRoom}>방 만들기</button>
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
        </>
      )}
    </>
  );
};

export default Loby;
