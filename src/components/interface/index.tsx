import { ReactElement } from "react";
import styled from "styled-components";
import User from "components/user/index";
import Chat from "components/chat/index";

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
      <SUsers className="users">
        {props.users?.map(user => (
          <User
            key={user.userID}
            user={user}
            togglePrivateMessage={props.toggleJoinedUser}
            joinedUser={props.joinedUser}
          />
        ))}
      </SUsers>
      <SChatAct>
        {props.children}
        <Chat
          chats={props.chats}
          sendMessage={props.sendMessage}
          joinedUser={props.joinedUser}
          togglePrivateMessage={props.toggleJoinedUser}
        />
      </SChatAct>
    </>
  );
}

const SUsers = styled.section`
  width: 20%;
  height: 100%;
  overflow-y: scroll;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  background: #222;
`;

const SChatAct = styled.section`
  width: 80%;
  height : 100%;
  display: flex;
  flex-direction: column;
  .button-container {
    display : flex;
    justify-content : flex-end;
    height : 30px;
    button {
      display: inline-block;
      width: fit-content;
      background: transparent;
      border 1px solid #666;
      border-radius : 3px;
      padding : .1rem .3rem;
      cursor : pointer;
      margin-left : .3rem;
    }
  }
`;

export default Interface;
