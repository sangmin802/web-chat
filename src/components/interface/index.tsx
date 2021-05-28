import React from "react";
import styled from "styled-components";
import { IUser, IUsers } from "types/user";
import User from "components/user/index";
import { IChat } from "types/chat";
import { JsxChild } from "typescript";
import Chat from "components/chat/index";

interface Props {
  selectedUser: null | IUser;
  togglePrivateMessage(T: string): void;
  users: IUsers;
  setUsers(T: IUsers): void;
  setSelectedUser(T: IUser): void;
  chats?: IChat[];
  iterableUsers?: IUser[];
  emitMessageHandler?(T: string): void;
  children?: JsxChild;
}

const Interface = (p: Props) => {
  return (
    <>
      <SUsers className="users">
        {(p.iterableUsers as IUser[]).map((user: IUser) => (
          <User
            key={user.userID}
            user={user}
            togglePrivateMessage={p.togglePrivateMessage}
            selectedUser={p.selectedUser}
          />
        ))}
      </SUsers>
      <SChatAct>
        {p.children}
        <Chat
          chats={p.chats as IChat[]}
          emitMessage={p.emitMessageHandler as (T: string) => void}
          selectedUser={p.selectedUser}
          togglePrivateMessage={p.togglePrivateMessage}
        />
      </SChatAct>
    </>
  );
};

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
