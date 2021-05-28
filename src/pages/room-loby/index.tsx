import { useCallback, useMemo, cloneElement, ReactElement } from "react";
import styled from "styled-components";
import { IRoom } from "types/room";

type emitMessage = (T: string, U: string) => void;

interface Props {
  setRoom(T: null): void;
  interfaceLayout: ReactElement;
  emitMessage(T: emitMessage, U: { content: string; roomID: string }): void;
  selectedRoom: IRoom;
  leaveRoom(T: string): void;
  sendRoomMessage(T: string, U: string): void;
  goLoby(): void;
}

const RoomLoby = ({
  setRoom,
  interfaceLayout,
  emitMessage,
  selectedRoom,
  leaveRoom,
  sendRoomMessage,
  goLoby,
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
    <SInterface>
      {cloneElement(
        interfaceLayout,
        {
          chats: selectedRoom.messages,
          iterableUsers: selectedRoom.users,
          emitMessageHandler,
        },
        <SLobyChildren>
          <div className="button-container">
            <button onClick={leaveRoomHandler}>나가기</button>
            <button onClick={goLobbyHandler}>로비로 이동</button>
          </div>
        </SLobyChildren>
      )}
    </SInterface>
  );
};

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

export default RoomLoby;
