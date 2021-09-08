import React, { useCallback, useMemo } from "react";
import styled from "styled-components";
import { Interface, Room } from "components";
import { IUsers, IChat, IRooms, IUser } from "types/socket";

interface LobyProps {
  users: IUsers;
  chats: IChat[];
  rooms: IRooms;
  joinedUser: IUser | null;
  toggleJoinedUser(T: string): void;
  joinRoom(T: string): void;
  enterRoom(T: string): void;
  createRoom(): void;
  sendMessage(T: string): void;
}

function Loby({
  users,
  chats,
  rooms,
  joinedUser,
  toggleJoinedUser,
  joinRoom,
  enterRoom,
  createRoom,
  sendMessage,
}: LobyProps) {
  const iterableRooms = useMemo(
    () =>
      Object.values(rooms).sort(a => {
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
      <Interface
        joinedUser={joinedUser}
        toggleJoinedUser={toggleJoinedUser}
        sendMessage={sendMessage}
        chats={chats}
        users={iterableUsers}
      >
        <SLobyChildren>
          <section className="button-container">
            <button onClick={createRoom}>방 만들기</button>
          </section>
          <section className="created-rooms">
            {iterableRooms.map(room => (
              <Room
                key={room.roomID}
                room={room}
                enterRoom={enterRoom}
                joinRoom={joinRoom}
              />
            ))}
          </section>
        </SLobyChildren>
      </Interface>
    </SInterface>
  );
}

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

export default React.memo(Loby);
