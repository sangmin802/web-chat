import React, { useCallback } from "react";
import { Interface, Button } from "components";
import { IUser, IRoom } from "types/socket";
import * as Styled from "./index.style";

interface RoomLobyProps {
  joinedRoom: IRoom;
  joinedUser: IUser | null;
  leaveRoom(T: string): void;
  goLoby(): void;
  toggleJoinedUser(T: string): void;
  sendMessage(T: string): void;
}

function RoomLoby({
  joinedRoom,
  joinedUser,
  leaveRoom,
  goLoby,
  toggleJoinedUser,
  sendMessage,
}: RoomLobyProps) {
  const handleLeaveRoom = useCallback(() => {
    leaveRoom(joinedRoom.roomID);
  }, [leaveRoom, joinedRoom]);

  return (
    <Styled.Interface>
      <Interface
        joinedUser={joinedUser}
        toggleJoinedUser={toggleJoinedUser}
        sendMessage={sendMessage}
        chats={joinedRoom.messages}
        users={joinedRoom.users}
      >
        <Styled.RoomLoby>
          <Styled.Buttons>
            <Button border="border" onClick={handleLeaveRoom}>
              나가기
            </Button>
            <Button border="border" onClick={goLoby}>
              로비로 이동
            </Button>
          </Styled.Buttons>
        </Styled.RoomLoby>
      </Interface>
    </Styled.Interface>
  );
}

export default React.memo(RoomLoby);
