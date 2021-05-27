import { useCallback, useMemo } from "react";
import { IRoom } from "types/room";
import { IUser } from "types/user";
import Chat from "components/chat";

type emitMessage = (T: string, U: string) => void;

interface Props {
  selectedRoom: IRoom;
  setRoom(T: null): void;
  leaveRoom(T: string): void;
  sendRoomMessage(T: string, U: string): void;
  selectedUser: null | IUser;
  emitMessage(T: emitMessage, U: { content: string; roomID: string }): void;
  goLoby(): void;
  togglePrivateMessage(T: string): void;
}

const RoomLoby = ({
  selectedRoom,
  setRoom,
  leaveRoom,
  sendRoomMessage,
  selectedUser,
  emitMessage,
  goLoby,
  togglePrivateMessage,
}: Props) => {
  const roomID = useMemo(() => selectedRoom.roomID, [selectedRoom.roomID]);
  const emitMessageHandler = useCallback(
    content => {
      emitMessage(sendRoomMessage, { content, roomID });
    },
    [emitMessage, sendRoomMessage, roomID]
  );

  const goLobbyHandler = useCallback(() => {
    setRoom(null);
    goLoby();
  }, [setRoom, goLoby]);

  const leaveRoomHandler = useCallback(() => {
    leaveRoom(roomID);
    goLoby();
  }, [leaveRoom, roomID, goLoby]);

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
      <Chat
        chats={selectedRoom.messages}
        emitMessage={emitMessageHandler}
        selectedUser={selectedUser}
        togglePrivateMessage={togglePrivateMessage}
      />
    </section>
  );
};

export default RoomLoby;
