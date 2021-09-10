import styled from "styled-components";

export const User = styled.article<{ isPrivate: boolean }>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-item: center;
  ${({ isPrivate }) =>
    isPrivate
      ? "background-color : #fff; color : black"
      : "background-color : transparent; color : #f2f2f2"};
  padding: 0.2rem 0.4rem;
`;

export const HasNewMessages = styled.div`
  background-color: purple;
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  font-size: 0.85rem;
`;
