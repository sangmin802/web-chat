import { useCallback, useState } from "react";
import { Loby, Login, RoomLoby } from "pages";
import { useSocket } from "hooks/useSocket";
import * as Styled from "./app.style";

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
    <Styled.App>
      <Styled.Main>
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
      </Styled.Main>
    </Styled.App>
  );
}

export default App;
