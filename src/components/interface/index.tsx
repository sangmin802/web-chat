import React from "react";
import styled from "styled-components";
import User from "components/user/index";
import { JsxChild } from "typescript";
import Chat from "components/chat/index";

interface userProps {
  userID: string;
}

interface Props<userType, usersType, chatType> {
  selectedUser: null | userType;
  togglePrivateMessage(T: string): void;
  users: usersType;
  setUsers(T: usersType): void;
  setSelectedUser(T: userType): void;
  chats?: chatType[];
  iterableUsers?: userType[];
  emitMessageHandler?(T: string): void;
  children?: JsxChild;
}

const Interface = <userType extends userProps, usersType, chatType>(
  p: Props<userType, usersType, chatType>
) => {
  return (
    <>
      <SUsers className="users">
        {(p.iterableUsers as userType[]).map((user: userType) => (
          <User<userType>
            key={user.userID}
            user={user}
            togglePrivateMessage={p.togglePrivateMessage}
            selectedUser={p.selectedUser}
          />
        ))}
      </SUsers>
      <SChatAct>
        {p.children}
        <Chat<userType, chatType>
          chats={p.chats as chatType[]}
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
