import { ReactElement } from "react";
import { User, Chat } from "components";
import * as Styled from "./index.style";

interface InterfaceProps<T> {
  joinedUser: T | null;
  toggleJoinedUser(T: string): void;
  sendMessage(T: string): void;
  chats: any[];
  users: T[];
  children: ReactElement;
}

function Interface<T extends { userID: string }>(props: InterfaceProps<T>) {
  return (
    <>
      <Styled.Users className="users">
        {props.users?.map(user => (
          <User
            key={user.userID}
            user={user}
            togglePrivateMessage={props.toggleJoinedUser}
            joinedUser={props.joinedUser}
          />
        ))}
      </Styled.Users>
      <Styled.ChatTools>
        {props.children}
        <Chat
          chats={props.chats}
          sendMessage={props.sendMessage}
          joinedUser={props.joinedUser}
          togglePrivateMessage={props.toggleJoinedUser}
        />
      </Styled.ChatTools>
    </>
  );
}

export default Interface;
