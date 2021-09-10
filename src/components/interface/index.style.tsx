import styled from "styled-components";

export const Users = styled.div`
  width: 20%;
  height: 100%;
  overflow-y: scroll;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  background: #222;
`;

export const ChatTools = styled.div`
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
