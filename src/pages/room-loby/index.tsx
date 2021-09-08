import React, { useCallback } from "react";
import { Interface } from "components";
import styled from "styled-components";
import { IUser, IRoom } from "types/socket";

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
    <SInterface>
      <Interface
        joinedUser={joinedUser}
        toggleJoinedUser={toggleJoinedUser}
        sendMessage={sendMessage}
        chats={joinedRoom.messages}
        users={joinedRoom.users}
      >
        <SLobyChildren>
          <div className="button-container">
            <button onClick={handleLeaveRoom}>나가기</button>
            <button onClick={goLoby}>로비로 이동</button>
          </div>
        </SLobyChildren>
      </Interface>
    </SInterface>
  );
}

const SInterface = styled.section`
  display: flex;
  height: 100%;
  .chat-area {
    height: calc(100% - 46.1px);
  }
`;

const SLobyChildren = styled.section`
  padding: 0.5rem;
  height: fit-content;
`;

export default React.memo(RoomLoby);
