import { useCallback, useMemo } from "react";
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
import { Debounce } from "util/debounce";

function App() {
  const { isLogin, setLogin } = useLogin();
  const { users, setUsers } = useUsers();
  const { room, setRoom } = useRoom();
  const { rooms, setRooms } = useRooms();
  const { chats, setChat } = useChat();
  const { selectedUser, setSelectedUser } = useSelectUser();
  const roomsDebounce = useMemo(
    () => new Debounce(rooms, setRooms, 0),
    [rooms, setRooms]
  );
  const toggleRoom = useCallback(
    roomID => {
      setRoom(roomID);
      setSelectedUser(null);
    },
    [setSelectedUser, setRoom]
  );
  const SE = useAppSocket({
    users,
    setUsers,
    rooms,
    setRooms,
    room,
    setRoom: toggleRoom,
    setChat,
    roomsDebounce,
    selectedUser,
  });

  const selectedRoom = useMemo(() => {
    if (!room) return;
    return rooms[room];
  }, [rooms, room]);

  const emitMessage = useCallback(
    (sendMessage, args) => {
      if (selectedUser)
        SE.sendPrivateMessage({ content: args.content, to: selectedUser });
      if (!selectedUser) sendMessage(args);
    },
    [selectedUser, SE]
  );

  const togglePrivateMessage = useCallback(
    userID => {
      const user = users[userID] ?? null;
      if (!user) return setSelectedUser(null);
      if (user.self) return;
      const toggle = selectedUser?.userID === user.userID ? null : { ...user };
      const newUsers = { ...users };
      newUsers[user.userID].messages.hasNewMessages = 0;
      setSelectedUser(toggle);
      setUsers(newUsers);
    },
    [setSelectedUser, selectedUser, users, setUsers]
  );

  return (
    <div className="app">
      <SMain>
        {!isLogin && <Login setLogin={setLogin} />}
        {isLogin && selectedRoom && (
          <RoomLoby
            selectedRoom={selectedRoom}
            setRoom={toggleRoom}
            leaveRoom={SE.leaveRoom}
            sendRoomMessage={SE.sendRoomMessage}
            selectedUser={selectedUser}
            emitMessage={emitMessage}
            goLoby={SE.goLoby}
            togglePrivateMessage={togglePrivateMessage}
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
            setRoom={toggleRoom}
            emitMessage={emitMessage}
            roomsDebounce={roomsDebounce}
            togglePrivateMessage={togglePrivateMessage}
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
