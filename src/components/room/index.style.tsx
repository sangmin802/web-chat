import styled from "styled-components";

export const Room = styled.article<{ isJoined: boolean }>`
  width : calc(98% / 3);
  height : fit-content;
  border : 1px solid;
  border-color : ${({ isJoined }) => (isJoined ? "tomato" : "#444")}}
  border-radius : 3px;
  margin-right : 1%;
  padding : .2rem .4rem;
  cursor : pointer;

  @media screen and (max-width: 600px) {
    width: calc(98% / 2);
  }

  * {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;

export const RoomInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const HasNewMessagesages = styled.div`
  background-color: purple;
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  font-size: 0.85rem;
`;
