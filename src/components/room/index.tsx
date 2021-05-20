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

  return <article onClick={joinRoomHandler}>{room.roomName}</article>;
};

export default Room;
