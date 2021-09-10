import styled from "styled-components";

export const Interface = styled.article`
  display: flex;
  height: 100%;
  .chat-area {
    height: calc(100% - 46.1px);
  }
`;

export const RoomLoby = styled.section`
  padding: 0.5rem;
  height: fit-content;
`;

export const Buttons = styled.section`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: flex-end;

  & button {
    width: fit-content;
    margin-left: 0.3rem;
  }
`;
