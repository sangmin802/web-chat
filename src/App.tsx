import React, { useCallback, useEffect, useMemo } from "react";
import "styles/global.css";
import styled from "styled-components";
import { useLogin } from "hooks/use-login";
import { useSocket } from "hooks/use-socket";
import { useUsers } from "hooks/use-users";
import { useChat } from "hooks/use-chat";
import { useRoom } from "hooks/use-room";
import { useRooms } from "hooks/use-rooms";
import { useSelectUser } from "hooks/use-select-user";
import Login from "components/login/index";
import Loby from "components/loby";
import RoomLoby from "components/room-loby";

function App() {
  const { isLogin, setLogin } = useLogin();
  const { users, setUsers } = useUsers();
  const { room, setRoom } = useRoom();
  const { rooms, setRooms } = useRooms();
  const { chats, setChat } = useChat(room);
  const { selectedUser, setSelectedUser } = useSelectUser();
  const socketEvent = useSocket({
    setLogin,
    users,
    setUsers,
    setChat,
    selectedUser,
    setSelectedUser,
    rooms,
    setRooms,
    room,
    setRoom,
  });

  const selectedRoom = useMemo(() => {
    if (!room) return;
    return rooms[room];
  }, [rooms, room]);

  return (
    <div className="app">
      <SMain>
        {!isLogin && <Login connectSocekt={socketEvent.connectSocekt} />}
        {isLogin && selectedRoom && (
          <RoomLoby
            selectedRoom={selectedRoom}
            setRoom={setRoom}
            leaveRoom={socketEvent.leaveRoom}
            sendRoomMessage={socketEvent.sendRoomMessage}
          />
        )}
        {isLogin && !selectedRoom && users && (
          <Loby
            users={users}
            chats={chats}
            sendPublicMessage={socketEvent.sendPublicMessage}
            sendPrivateMessage={socketEvent.sendPrivateMessage}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            rooms={rooms}
            setRoom={setRoom}
            setRooms={setRooms}
            joinRoom={socketEvent.joinRoom}
            createRoom={socketEvent.createRoom}
          />
        )}
      </SMain>
    </div>
  );
}

const SMain = styled.main`
  height: 100vh;
`;

export default App;
