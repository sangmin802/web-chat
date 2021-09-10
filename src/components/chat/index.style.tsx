import styled from "styled-components";

export const ChatArea = styled.section`
  display: flex;
  flex-direction: column;
`;

export const Chats = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  padding: 0.4rem;
  height: calc(100% - 36.1px);
  overflow-y: scroll;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Dummy = styled.div`
  margin-top: auto;
`;

export const Form = styled.form`
  display: flex;
  position: relative;
  width: 100%;
  height: 36px;
  background: #222;
  align-items: center;
`;

export const Text = styled.div`
  width: 20%;
  background-color: #222;
  border-radius: 6px 0 0 6px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding-left: 0.3rem;
`;

export const Input = styled.div`
  width: 70%;
`;
export const Button = styled.div`
  width: 10%;
`;
