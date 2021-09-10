import { useCallback, useMemo } from "react";
import { Text } from "components";
import * as Styled from "./index.style";

interface IRoom {
  isJoined: boolean;
  roomID: string;
  users: { userName: string }[];
  roomName: string;
  hasNewMessages: number;
}

interface RoomProps<T> {
  room: T;
  enterRoom(T: string): void;
  joinRoom(T: string): void;
}

function Room<T extends IRoom>({ room, enterRoom, joinRoom }: RoomProps<T>) {
  const joinRoomHandler = useCallback(() => {
    if (room.isJoined) return enterRoom(room.roomID);
    joinRoom(room.roomID);
  }, [enterRoom, joinRoom, room]);

  const [primaryUser, size] = useMemo(() => {
    if (!room.isJoined) return [null, null];
    const primary = room.users[0].userName;
    const size = room.users.length < 2 ? null : room.users.length - 1;
    return [primary, size];
  }, [room.users, room.isJoined]);

  return (
    <Styled.Room isJoined={room.isJoined} onClick={joinRoomHandler}>
      <Text>{room.roomName}</Text>
      {room.isJoined ? (
        <Styled.RoomInfo>
          <Text>
            {primaryUser} {size && `+${size}`}
          </Text>
          {room.hasNewMessages !== 0 && (
            <Styled.HasNewMessagesages>
              <Text type="white">{room.hasNewMessages}</Text>
            </Styled.HasNewMessagesages>
          )}
        </Styled.RoomInfo>
      ) : (
        <Text>대화방에 참여하세요!</Text>
      )}
    </Styled.Room>
  );
}

export default Room;
