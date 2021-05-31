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
import { Debounce } from "util/debounce";
import Login from "pages/login/index";
import Loby from "pages/loby";
import RoomLoby from "pages/room-loby";
import Interface from "components/interface/index";
import LoadingSpinner from "components/loading-spinner";

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

  const InterfaceLayout = (
    <Interface
      selectedUser={selectedUser}
      togglePrivateMessage={togglePrivateMessage}
      users={users}
      setUsers={setUsers}
      setSelectedUser={setSelectedUser}
    />
  );

  const isUsers = useMemo(() => Object.values(users).length, [users]);

  return (
    <div className="app">
      <SMain>
        {!isLogin && <Login setLogin={setLogin} />}
        {isLogin && isUsers === 0 && <LoadingSpinner />}
        {isLogin && selectedRoom && (
          <RoomLoby
            setRoom={toggleRoom}
            interfaceLayout={InterfaceLayout}
            emitMessage={emitMessage}
            selectedRoom={selectedRoom}
            leaveRoom={SE.leaveRoom}
            sendRoomMessage={SE.sendRoomMessage}
            goLoby={SE.goLoby}
          />
        )}
        {isLogin && !selectedRoom && users && (
          <Loby
            interfaceLayout={InterfaceLayout}
            setRoom={toggleRoom}
            selectedUser={selectedUser}
            emitMessage={emitMessage}
            users={users}
            setUsers={setUsers}
            setSelectedUser={setSelectedUser}
            chats={chats}
            setChat={setChat}
            setRooms={setRooms}
            rooms={rooms}
            roomsDebounce={roomsDebounce}
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
