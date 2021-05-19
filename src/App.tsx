import React from "react";
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
  const { connectSocekt, sendPublicMessage, sendPrivateMessage } = useSocket({
    isLogin,
    setLogin,
    users,
    setUsers,
    setChat,
    selectedUser,
    setSelectedUser,
    rooms,
    setRooms,
  });

  return (
    <div className="app">
      <main>
        {!isLogin && <Login connectSocekt={connectSocekt} />}
        {isLogin && room && (
          <RoomLoby room={room} setRoom={setRoom} chats={chats} />
        )}
        {isLogin && users && (
          <Loby
            users={users}
            chats={chats}
            sendPublicMessage={sendPublicMessage}
            sendPrivateMessage={sendPrivateMessage}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            rooms={rooms}
          />
        )}
      </main>
    </div>
  );
}

export default App;
