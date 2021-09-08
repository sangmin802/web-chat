import { useCallback, useMemo } from "react";
import styled from "styled-components";

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
    <SRoom className="room" isJoined={room.isJoined} onClick={joinRoomHandler}>
      <div className="room-name">{room.roomName}</div>
      {room.isJoined && (
        <div className="room-info">
          <div className="room-users">
            {primaryUser} {size && `+${size}`}
          </div>
          {room.hasNewMessages !== 0 && (
            <div className="room-hasNewMessages">{room.hasNewMessages}</div>
          )}
        </div>
      )}
      {!room.isJoined && <div>대화방에 참여하세요!</div>}
    </SRoom>
  );
}

const SRoom = styled.article<{ isJoined: boolean }>`
  width : calc(98% / 3);
  @media screen and (max-width: 600px) {
    width: calc(98% / 2);
  }
  height : fit-content;
  border : 1px solid;
  border-color : ${({ isJoined }) => (isJoined ? "tomato" : "#444")}}
  border-radius : 3px;
  margin-right : 1%;
  padding : .2rem .4rem;
  cursor : pointer;
  * {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .room-info {
    display : flex;
    justify-content : space-between;
    .room-hasNewMessages {
      background-color: purple;
      padding: 0.1rem 0.3rem;
      border-radius: 3px;
      font-size: 0.85rem;
      color : white;
    }
  }
`;

export default Room;
