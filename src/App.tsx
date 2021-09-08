import { useCallback, useState, useMemo } from "react";
import "styles/global.css";
import styled from "styled-components";
import { Loby, Login, RoomLoby } from "pages";
import { useSocket } from "hooks/use-socket";

function App() {
  const [isLogin, setLogin] = useState(false);
  const SI = useSocket(setLogin);
  const { chats, users, rooms, joinedRoomID, joinedUser } = SI.state;

  const handleSendMessage = useCallback(
    content => {
      if (joinedUser)
        return SI.handleSendPrivateMessage({ content, to: joinedUser });
      if (joinedRoomID)
        return SI.handleSendRoomMessage({ content, roomID: joinedRoomID });
      return SI.handleSendPublicMessage(content);
    },
    [joinedUser, joinedRoomID]
  );

  return (
    <div className="app">
      <SMain>
        {!isLogin && <Login connectSocket={SI.handleConnectSocket} />}
        {isLogin && joinedRoomID && (
          <RoomLoby
            joinedRoom={rooms[joinedRoomID]}
            joinedUser={joinedUser}
            leaveRoom={SI.handleLeaveRoom}
            goLoby={SI.handleGoLoby}
            toggleJoinedUser={SI.handleToggleJoinedUser}
            sendMessage={handleSendMessage}
          />
        )}
        {isLogin && !joinedRoomID && (
          <Loby
            users={users}
            chats={chats}
            rooms={rooms}
            joinedUser={joinedUser}
            toggleJoinedUser={SI.handleToggleJoinedUser}
            joinRoom={SI.handleJoinRoom}
            enterRoom={SI.handleEnterRoom}
            createRoom={SI.handleCreateRoom}
            sendMessage={handleSendMessage}
          />
        )}
      </SMain>
    </div>
  );
}

const SMain = styled.main`
  width: 100%;
  height: 100%;
`;

export default App;
