import React, { useMemo } from "react";
import { Button, Interface, Room } from "components";
import { IUsers, IChat, IRooms, IUser } from "types/socket";
import * as Styled from "./index.style";

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
    <Styled.Interface>
      <Interface
        joinedUser={joinedUser}
        toggleJoinedUser={toggleJoinedUser}
        sendMessage={sendMessage}
        chats={chats}
        users={iterableUsers}
      >
        <Styled.Loby>
          <Styled.Buttons>
            <Button border="border" onClick={createRoom}>
              방 만들기
            </Button>
          </Styled.Buttons>
          <Styled.Rooms>
            {iterableRooms.map(room => (
              <Room
                key={room.roomID}
                room={room}
                enterRoom={enterRoom}
                joinRoom={joinRoom}
              />
            ))}
          </Styled.Rooms>
        </Styled.Loby>
      </Interface>
    </Styled.Interface>
  );
}

export default React.memo(Loby);
