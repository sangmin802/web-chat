import styled from "styled-components";

export const Text = styled.div<{ type?: string }>`
  width: 100%;
  height: 100%;
  ${({ theme, type = "default" }) => theme.font[type]}
`;
