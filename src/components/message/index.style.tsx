import styled from "styled-components";

export const Message = styled.article<{ type: string }>`
  cursor: ${({ type }) => (type !== "ancounce" ? " pointer" : "normal")};
`;
