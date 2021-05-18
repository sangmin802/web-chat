import React from "react";
import { useLogin } from "hooks/use-login";
import { useSocket } from "hooks/use-socket";
import { useUsers } from "hooks/use-users";
import { useChat } from "hooks/use-chat";
import { useSelectUser } from "hooks/use-select-user";
import Login from "components/login/index";
import Loby from "components/loby";

function App() {
  const { isLogin, setLogin } = useLogin();
  const { users, setUsers, setUser, removeUser } = useUsers();
  const { chats, setChat, clearChat } = useChat();
  const { selectedUser, setSelectedUser } = useSelectUser();
  const { connectSocekt, sendPublicMessage, sendPrivateMessage } = useSocket({
    isLogin,
    setLogin,
    setUsers,
    setUser,
    removeUser,
    setChat,
    selectedUser,
    setSelectedUser,
  });
  return (
    <div className="app">
      <main>
        {!isLogin && <Login connectSocekt={connectSocekt} />}
        {isLogin && users && (
          <Loby
            users={users}
            chats={chats}
            sendPublicMessage={sendPublicMessage}
            sendPrivateMessage={sendPrivateMessage}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
        )}
      </main>
    </div>
  );
}

export default App;
