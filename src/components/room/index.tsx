import React, { useCallback } from "react";
import { IRoom } from "types/room";

interface Props {
  room: IRoom;
  setRoom(T: string): void;
  joinRoom(T: string): void;
}

const Room = ({ room, setRoom, joinRoom }: Props) => {
  const joinRoomHandler = useCallback(() => {
    if (room.isJoined) return setRoom(room.roomID);
    joinRoom(room.roomID);
  }, [setRoom, joinRoom, room]);

  const [primaryUser, size] = useMemo(() => {
    if (!room.isJoined) return [null, null];
    const primary = room.users[0].userName;
    const size = room.users.length < 2 ? null : room.users.length - 1;
    return [primary, size];
  }, [room.users, room.isJoined]);

  return (
    <SRoom isJoined={room.isJoined} onClick={joinRoomHandler}>
      <div className="room-name">{room.roomName}</div>
      {room.isJoined && (
        <>
          <div className="room-users">
            {primaryUser} {size && `+${size}`}
          </div>
          {room.hasNewMessages !== 0 && (
            <div className="room-hasNewMessages">{room.hasNewMessages}</div>
          )}
        </>
      )}
      {!room.isJoined && <div>대화방에 참여하세요!</div>}
    </SRoom>
  );
};

const SRoom = styled.article<{ isJoined: boolean }>`
width : calc(98% / 3);
  border : 1px solid;
  border-color : ${({ isJoined }) => (isJoined ? "tomato" : "#444")}}
  border-radius : 3px;
  margin-right : 1%;
  padding : .2rem .4rem;

`;

export default Room;
