import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "styled-components";
import GlobalStyle, { THEME } from "styles/globalStyle";

ReactDOM.render(
  // <React.StrictMode>
  <ThemeProvider theme={THEME}>
    <GlobalStyle />
    <App />
  </ThemeProvider>,
  // </React.StrictMode>,
  document.getElementById("root")
);
