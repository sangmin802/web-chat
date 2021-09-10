import styled from "styled-components";

export const Button = styled.button<{ border: string }>`
  width: 100%;
  height: 100%;
  background: none;
  cursor: pointer;
  padding: 0.3rem 0.2rem;

  ${({ theme, border }) => theme.button[border]}
`;
