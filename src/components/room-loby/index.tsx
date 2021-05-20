import React, { useCallback, useMemo } from "react";
import { IChat } from "types/chat";
import { IRoom } from "types/room";
import Chat from "components/chat";

interface Props {
  room: IRoom;
  setRoom(T: null): void;
  chats: IChat[];
}

const RoomLoby = ({ room, setRoom, chats }: Props) => {
  const emitMessage = useCallback(message => {}, []);
  const emitMessage = useCallback(
    message => {
      sendRoomMessage(message, roomID);
    },
    [sendRoomMessage, roomID]
  );

  const goLobbyHandler = useCallback(() => {
    setRoom(null);
  }, [setRoom]);

  const leaveRoomHandler = useCallback(() => {}, [room]);

  const users = useMemo(() => {
    return [...room.users.values()];
  }, [room.users]);

  return (
    <section className="message-room">
      <div className="leave-room" onClick={leaveRoomHandler}>
        나가기
      </div>
      <div className="go-lobby" onClick={goLobbyHandler}>
        로비로 이동
      </div>
      <div className="room-users">
        {users.map(user => (
          <>{user.userName}</>
        ))}
      </div>
      <Chat chats={chats} emitMessage={emitMessage} />
    </section>
  );
};

export default RoomLoby;
