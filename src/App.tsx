import { useMemo } from "react";
import "styles/global.css";
import styled from "styled-components";
import { useLogin } from "hooks/use-login";
import { useAppSocket } from "hooks/use-app-socket";
import { useUsers } from "hooks/use-users";
import { useChat } from "hooks/use-chat";
import { useRoom } from "hooks/use-room";
import { useRooms } from "hooks/use-rooms";
import { useSelectUser } from "hooks/use-select-user";
import Login from "pages/login/index";
import Loby from "pages/loby";
import RoomLoby from "pages/room-loby";

function App() {
  const { isLogin, setLogin } = useLogin();
  const { users, setUsers } = useUsers();
  const { room, setRoom } = useRoom();
  const { rooms, setRooms } = useRooms();
  const { chats, setChat } = useChat(room);
  const { selectedUser, setSelectedUser } = useSelectUser();
  const SE = useAppSocket({
    users,
    setUsers,
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
        {!isLogin && <Login setLogin={setLogin} />}
        {isLogin && selectedRoom && (
          <RoomLoby
            selectedRoom={selectedRoom}
            setRoom={setRoom}
            leaveRoom={SE.leaveRoom}
            sendRoomMessage={SE.sendRoomMessage}
          />
        )}
        {isLogin && !selectedRoom && users && (
          <Loby
            users={users}
            setUsers={setUsers}
            chats={chats}
            setChat={setChat}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            setRooms={setRooms}
            rooms={rooms}
            setRoom={setRoom}
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
