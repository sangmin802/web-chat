import styled from "styled-components";

export const Interface = styled.article`
  display: flex;
  height: 100%;
  .chat-area {
    height: 40%;
  }
`;

export const Loby = styled.section`
  height: 60%;
  padding: 0.5rem;
`;

export const Buttons = styled.section`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: flex-end;

  & button {
    width: fit-content;
  }
`;

export const Rooms = styled.section`
  height: calc(99% - 30.1px);
  padding-top: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
