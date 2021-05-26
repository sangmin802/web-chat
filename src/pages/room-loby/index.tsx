import React, { useCallback, useMemo } from "react";
import { IRoom } from "types/room";
import Chat from "components/chat";

interface Props {
  selectedRoom: IRoom;
  setRoom(T: null): void;
  leaveRoom(T: string): void;
  sendRoomMessage(T: string, U: string): void;
}

const RoomLoby = ({
  selectedRoom,
  setRoom,
  leaveRoom,
  sendRoomMessage,
}: Props) => {
  const roomID = useMemo(() => selectedRoom.roomID, [selectedRoom.roomID]);
  const emitMessage = useCallback(
    message => {
      sendRoomMessage(message, roomID);
    },
    [sendRoomMessage, roomID]
  );

  const goLobbyHandler = useCallback(() => {
    setRoom(null);
  }, [setRoom]);

  const leaveRoomHandler = useCallback(() => {
    leaveRoom(roomID);
  }, [leaveRoom, roomID]);

  return (
    <section className="message-room">
      <div className="leave-room" onClick={leaveRoomHandler}>
        나가기
      </div>
      <div className="go-lobby" onClick={goLobbyHandler}>
        로비로 이동
      </div>
      <div className="room-users">
        {selectedRoom.users.map(user => (
          <div key={user.userID}>{user.userName}</div>
        ))}
      </div>
      <Chat chats={selectedRoom.messages} emitMessage={emitMessageHandler}>
        {selectedUser && <span>{selectedUser.userName} 에게</span>}
      </Chat>
    </section>
  );
};

export default RoomLoby;
