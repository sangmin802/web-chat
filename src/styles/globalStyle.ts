import { createGlobalStyle, css } from "styled-components";

export const THEME = {
  font: {
    white: css`
      color: #fff;
    `,
    "private-message": css`
      color: rgba(245, 81, 226, 1);
    `,
    "anounce-message": css`
      color: green;
    `,
  },
  button: {
    borderless: css`
      border: 0;
    `,
    border: css`
      border: 1px solid black;
      border-radius: 3px;
    `,
  },
};

export default createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;
